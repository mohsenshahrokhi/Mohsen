'use server';
import { LoginPhoneSchema, RegisterUserSchema } from "@/ZSchemas/UserSchema";
import { getUserByEmail, getUserById, getUserByPhone, getUserByUsernamePass, registerUser, updateUser, getAllUsers } from "@/lib/controllers/userController";
import { signJwtAccessToken, verifyJwt } from "@/lib/jwt";
import { compileActivaionThemplate, compileResetPasswordThemplate, sendMail } from "@/lib/mail";
import * as bcrypt from "bcrypt";
export const register = async (values) => {
    // console.log(values);
    // const validatedFields = { data: values, success: true }
    const validatedFields = RegisterUserSchema.safeParse(values);
    // console.log(validatedFields.error)
    if (!validatedFields.success) {
        return { error: true, msg: 'ارتباط با سرور برقرار نشد !' };
    }
    const existUserByPhone = await getUserByPhone(validatedFields.data);
    if (existUserByPhone._id) {
        return { error: true, msg: 'این شماره تلفن قبلا ثبت شده است' };
    }
    const existUserByEmail = await getUserByEmail(validatedFields.data.email);
    if (existUserByEmail._id) {
        return { error: true, msg: 'این ایمیل قبلا ثبت شده است' };
    }
    const existUserByUsername = await getUserByUsernamePass(validatedFields.data.username);
    if (existUserByUsername._id) {
        return { error: true, msg: 'این نام کاربری قبلا ثبت شده است' };
    }
    const newUser = await registerUser(validatedFields.data);
    if (!newUser._id) {
        return { error: true, msg: 'خطای سیستمی!' };
    }
    const { NEXTAUTH_URL, BASE_URL } = process.env;
    const jwtUserId = signJwtAccessToken({ id: newUser._id });
    const activateUrl = `${NEXTAUTH_URL}/mailActivaion/${jwtUserId}`;
    const body = compileActivaionThemplate(newUser.username, BASE_URL, activateUrl);
    await sendMail({
        to: newUser.email,
        subject: 'Activate Your Account',
        body
    });
    return { success: true, msg: 'حساب کاربری با موفقیت ایجاد شد' };
};
export const activateUser = async (jwtUserId) => {
    const payload = verifyJwt(jwtUserId);
    const userId = payload === null || payload === void 0 ? void 0 : payload.id;
    if (!userId)
        return 'userNotExist';
    const user = await getUserById(userId);
    if (!user)
        return 'userNotExist';
    if (user.verifyMail === true)
        return 'alreadyActivated';
    await updateUser(userId, {
        data: {
            verifyMKey: new Date(),
            verifyMail: true,
            role: '2'
        }
    });
    return 'success';
};
export const getAllU = async ({ stringifyParams }) => {
    const users = await getAllUsers(stringifyParams);
    return { success: users.length > 0, users };
};
export async function forgetPassword({ email }) {
    const existUserByEmail = await getUserByEmail(email);
    if (!existUserByEmail) {
        return { error: true, msg: 'این ایمیل قبلا ثبت نشده است' };
    }
    const { NEXTAUTH_URL, BASE_URL } = process.env;
    const jwtUserId = signJwtAccessToken({ id: existUserByEmail._id });
    const activateUrl = `${NEXTAUTH_URL}/forgetPassword/${jwtUserId}`;
    const body = compileResetPasswordThemplate(existUserByEmail.username, BASE_URL, activateUrl);
    const result = await sendMail({
        to: existUserByEmail.email,
        subject: 'Reset Your Password',
        body
    });
    return result;
}
export const resetPassword = async (jwtUserId, password) => {
    const payload = verifyJwt(jwtUserId);
    const userId = payload === null || payload === void 0 ? void 0 : payload.id;
    if (!userId)
        return 'userNotExist';
    const user = await getUserById(userId);
    if (!user)
        return 'userNotExist';
    const salt = await bcrypt.genSalt(10);
    const updatedUser = await updateUser(userId, {
        data: {
            password: await bcrypt.hash(password, salt)
        }
    });
    if (updatedUser)
        return 'success';
    else
        throw new Error('سرور مشکل دارد');
};
export const sendSms = async (values) => {
    const validatedFields = LoginPhoneSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: true, msg: 'Invalid fields!' };
    }
    const user = await getUserByPhone(validatedFields.data);
    if (!user._id) {
        return { error: true, msg: 'این شماره تلفن قبلا ثبت نشده است' };
    }
    var key = Math.floor(1000 + Math.random() * 9000);
    const salt = await bcrypt.genSalt(10);
    const updatedUser = await updateUser(user._id, {
        data: {
            verifyPKey: await bcrypt.hash(JSON.stringify(key), salt),
            role: '2'
        }
    });
    if (!updatedUser) {
        return { error: true, msg: 'این شماره تلفن قبلا ثبت شده است' };
    }
    const userUp = await getUserById(user._id);
    console.log('key', key);
    return { success: true, msg: 'کد ورود برای شما ارسال شد !', key, userUp };
};
//# sourceMappingURL=register.js.map