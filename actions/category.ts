'use server'

import { CategorySchema, EditCategorySchema, RegisterCategorySchema, TCategorySchema, TEditCategorySchema, TRegisterCategorySchema } from "@/ZSchemas"
import { createNewCategory, deleteCategory, getAllCategory, getCategoryById, updateCat } from "@/lib/controllers/categoryController"
import { verifyJwt } from "@/lib/jwt"
import mongoose, { UpdateWriteOpResult } from "mongoose"
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
        values: TEditCategorySchema,
        accessToken: string
    }
) => {
    const validatedFields = EditCategorySchema.safeParse(values)
    const verify = accessToken && verifyJwt(accessToken) || null
    console.log('validatedFields', validatedFields.data);

    if (accessToken && verify?.role === '2' && validatedFields.success) {

        const update = await updateCat({
            _id,
            values: validatedFields.data
        }) as UpdateWriteOpResult

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

export const getCatById = async (_id: string) => {

    const category = await getCategoryById(_id) as TCategorySchema

    return { success: true, category }
}

export const deleteCat = async ({ id, accessToken }: { id: string, accessToken: string | undefined }) => {
    const verify = accessToken && verifyJwt(accessToken) || null
    if (accessToken && (verify?.role) === '2') {
        const { acknowledged } = await deleteCategory(id) as mongoose.mongo.DeleteResult
        return {
            success: acknowledged ? true : false,
            msg: acknowledged ? 'دسته بندی با موفقیت حذف شد !' : 'دسته بندی با موفقیت حذف نشد !'
        }
    } else {
        return {
            success: false,
            msg: 'شما دسترسی های لازم را ندارید !'
        }
    }

}