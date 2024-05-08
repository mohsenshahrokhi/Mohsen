'use server'

import { CategorySchema, RegisterCategorySchema, TCategorySchema, TRegisterCategorySchema } from "@/ZSchemas"
import { createNewCategory, getAllCategory, getCategory, updateCat } from "@/lib/controllers/categoryController"
import { verifyJwt } from "@/lib/jwt"
import { UpdateWriteOpResult } from "mongoose"
import queryString from "query-string"

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
        let categories: TCategorySchema[] = []
        categories = await getAllCategory(stringifyParams) as TCategorySchema[]
        return { success: categories.length > 0, categories }
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

        const existParams = {
            // "$or": [
            //     'slug=validatedFields.data.slug',
            //     'name=validatedFields.data.name'
            // ],

            // latinName: validatedFields.data.latinName,
            slug: validatedFields.data.slug,
            // name: validatedFields.data.name,

        }

        const stringifyParams = queryString.stringify(existParams)

        const { success, categories } = await getCategories({ stringifyParams, accessToken })

        // console.log('stringifyParams', stringifyParams, categories, success)

        if (success === true) {
            return {
                error: true,
                msg: 'این مورد وجود دارد !'
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

export const updateCategory = async (
    {
        _id,
        values,
        accessToken
    }: {
        _id: string | undefined
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

        const existParams = {
            slug: validatedFields.data.slug,
        }

        const stringifyParams = queryString.stringify(existParams)

        const { success } = await getCategories({ stringifyParams, accessToken })

        // console.log('stringifyParams', stringifyParams, categories, success)

        if (success === true) {
            return {
                error: true,
                msg: 'این مورد وجود دارد !'
            }
        }

        const update = await updateCat({
            _id: _id,
            data: validatedFields.data
        }) as UpdateWriteOpResult

        console.log('update', update)

        if (!update?.acknowledged) {
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

export const getCat = async (_id: string) => {

    const category = await getCategory(_id) as TCategorySchema

    return { success: true, category }
}