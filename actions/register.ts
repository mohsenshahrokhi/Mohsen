'use server'

import {
    LoginPhoneSchema,
    RegisterUserSchema,
    TForgetPassSchema,
    TLoginPhoneSchema,
    TRegisterUserFormSchema,
    TRegisterUserSchema,
    TUserSchema
} from "@/ZSchemas/UserSchema"
import {
    getUserByEmail,
    getUserById,
    getUserByPhone,
    getUserByUsernamePass,
    registerUser,
    getAllUsers,
    getUserBy,
    updateU
} from "@/lib/controllers/userController"
import { signJwtAccessToken, verifyJwt } from "@/lib/jwt"
import { compileActivaionThemplate, compileResetPasswordThemplate, sendMail } from "@/lib/mail"
import * as bcrypt from "bcrypt"

export const register = async (values: TRegisterUserSchema) => {

    // console.log(values);
    // const validatedFields = { data: values, success: true }
    const validatedFields = RegisterUserSchema.safeParse(values)
    // console.log(validatedFields.error)

    if (!validatedFields.success) {
        return { error: true, msg: 'ارتباط با سرور برقرار نشد !' }
    }

    const existUserByPhone = await getUserByPhone(validatedFields.data)

    if (existUserByPhone._id) {
        return { error: true, msg: 'این شماره تلفن قبلا ثبت شده است' }
    }

    const existUserByEmail = await getUserByEmail(validatedFields.data.email)

    if (existUserByEmail._id) {
        return { error: true, msg: 'این ایمیل قبلا ثبت شده است' }
    }

    const existUserByUsername = await getUserByUsernamePass(validatedFields.data.username)

    if (existUserByUsername._id) {
        return { error: true, msg: 'این نام کاربری قبلا ثبت شده است' }
    }

    const newUser = await registerUser(validatedFields.data)

    if (!newUser._id) {
        return { error: true, msg: 'خطای سیستمی!' }
    }

    const { NEXTAUTH_URL, BASE_URL } = process.env

    const jwtUserId = signJwtAccessToken({ id: newUser._id })

    const activateUrl = `${NEXTAUTH_URL}/mailActivaion/${jwtUserId}`

    const body = compileActivaionThemplate(newUser.username, BASE_URL!, activateUrl)

    await sendMail({
        to: newUser.email,
        subject: 'Activate Your Account',
        body
    })

    return { success: true, msg: 'حساب کاربری با موفقیت ایجاد شد' }

}

type ActiveUserSchema = (
    jwtUserId: string
) => Promise<'userNotExist' | 'alreadyActivated' | 'success'>

export const activateUser: ActiveUserSchema = async (jwtUserId) => {

    const payload = verifyJwt(jwtUserId)

    const userId = payload?.id

    if (!userId) return 'userNotExist'

    const user: TUserSchema = await getUserById(userId)

    if (!user) return 'userNotExist'

    if (user.verifyMail === true) return 'alreadyActivated'
console.log('activateUser');

    await updateU({userId, values:{
            verifyMKey: new Date(),
            verifyMail: true,
            role: '1'
    }})

    return 'success'

}

type All = {
    users: TUserSchema[]
    qtt: number
}

export const getAllU = async (
    {
        stringifyParams
    }
        :
        {
            stringifyParams: string
        }
) => {

    const {users,qtt} = await getAllUsers(stringifyParams) as All

    return { success: users.length > 0, users,qtt }

}

export const getUBy = async (stringifyParams: string) => {


    const user = await getUserBy(stringifyParams) as TUserSchema

    return { success: true, user }
}

export const updateUser = async (
    {
        _id,
        values,
        accessToken
    }: {
        _id: string 
        values: TRegisterUserFormSchema,
        accessToken: string
    }
) => {
    // const validatedFields = EditProductSchema.safeParse(values)
    const verify = accessToken && verifyJwt(accessToken) || null
    if (accessToken && verify?.role === '11') {

        const update = await updateU({
            _id,
            values
        }) as TUserSchema

        if (!update?._id) {
            return {
                error: true,
                msg: 'به روز رسانی انجام نشد !'
            }
        }

        return {
            success: true,
            msg: 'حساب کاربری با موفقیت ایجاد شد'
        }
    } else {
        return {
            success: false,
            msg: 'شما دسترسی های لازم را ندارید !'
        }
    }
}

export async function forgetPassword({ email }: TForgetPassSchema) {

    const existUserByEmail = await getUserByEmail(email)

    if (!existUserByEmail) {
        return { error: true, msg: 'این ایمیل قبلا ثبت نشده است' }
    }
    const { NEXTAUTH_URL, BASE_URL } = process.env

    const jwtUserId = signJwtAccessToken({ id: existUserByEmail._id })

    const activateUrl = `${NEXTAUTH_URL}/forgetPassword/${jwtUserId}`

    const body = compileResetPasswordThemplate(existUserByEmail.username, BASE_URL!, activateUrl)

    const result = await sendMail({
        to: existUserByEmail.email,
        subject: 'Reset Your Password',
        body
    })

    return result

}

type ResetPasswordSchema = (
    jwtUserId: string,
    password: string
) => Promise<'userNotExist' | 'success'>

export const resetPassword: ResetPasswordSchema = async (jwtUserId, password) => {

    const payload = verifyJwt(jwtUserId)

    const userId = payload?.id

    if (!userId) return 'userNotExist'

    const user: TUserSchema = await getUserById(userId)

    if (!user) return 'userNotExist'

    const salt = await bcrypt.genSalt(10)
    const updatedUser = await updateU({_id:userId, values:{
            password: await bcrypt.hash(password, salt)
    }})

    if (updatedUser) return 'success'
    else throw new Error('سرور مشکل دارد')

}

export const sendSms = async (values: TLoginPhoneSchema) => {

    const validatedFields = LoginPhoneSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: true, msg: 'Invalid fields!' }
    }

    const user: TUserSchema = await getUserByPhone(validatedFields.data)

    if (!user._id) {
        return { error: true, msg: 'این شماره تلفن قبلا ثبت نشده است' }
    }

    var key = Math.floor(1000 + Math.random() * 9000)

    const salt = await bcrypt.genSalt(10)
 
    const updatedUser = await updateU({_id:user._id,values: {
            verifyPKey: `${await bcrypt.hash(JSON.stringify(key), salt)}`,
            role: user.role
    }})

    if (!updatedUser) {
        return { error: true, msg: 'این شماره تلفن قبلا ثبت شده است' }
    }

    const userUp: TUserSchema = await getUserById(user._id)

    console.log('key', key);

    return { success: true, msg: 'کد ورود برای شما ارسال شد !', key, userUp }

}