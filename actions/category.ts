'use server'

import { CategorySchema, RegisterCategorySchema, TRegisterCategorySchema } from "@/ZSchemas"
import { createNewCategory, getAllCategory, getCategory } from "@/lib/controllers/categoryController"
import { verifyJwt } from "@/lib/jwt"

export const getCategories = async (
    {
        stringifyParams,
        accessToken
    }: {
        stringifyParams: any,
        accessToken: string
    }
) => {
    const verify = accessToken && verifyJwt(accessToken) || null
    if (accessToken && verify?.role === '2') {
        const categories = await getAllCategory(stringifyParams)
        return { success: true, categories }
    } else {
        return { success: false }
    }
}

export const createCategory = async (
    {
        values,
        accessToken
    }: {
        values: TRegisterCategorySchema,
        accessToken: string
    }
) => {
    const validatedFields = RegisterCategorySchema.safeParse(values)
    const verify = accessToken && verifyJwt(accessToken) || null
    if (accessToken && verify?.role === '2') {
        if (!validatedFields.success) {
            return {
                error: true,
                msg: 'ارتباط با سرور برقرار نشد !'
                // msg: validatedFields.error
            }
        }
        await createNewCategory({
            ...validatedFields.data
        })
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

export const getCat = async (_id: string) => {

    const validatedField = CategorySchema.safeParse(_id)

    if (!validatedField.success) {
        return { error: true, msg: 'ارتباط با سرور برقرار نشد !' }
    }

    const cat = await getCategory(validatedField.data._id)

    return { success: true, cat }
}