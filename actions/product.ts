'use server'

import { EditProductSchema, RegisterProductSchema, TEditProductSchema, TProductSchema, TRegisterProductSchema } from "@/ZSchemas/ProductSchema"
import { createNewProduct, deleteProduct, getAllProduct, getProductBy, updateP } from "@/lib/controllers/productController"
import { verifyJwt } from "@/lib/jwt"
import mongoose, { UpdateWriteOpResult } from "mongoose"
import queryString from "query-string"

type All = {
    products: TProductSchema[]
    qtt: number
}

export const getProducts = async (stringifyParams: string) => {
    // const verify = accessToken && verifyJwt(accessToken) || null
    // if (accessToken && verify?.role === '2') {
    const product = await getAllProduct(stringifyParams) as All
    return { success: product.qtt > 0, products: product.products, qtt: product.qtt }
    // } else {
    //     return { success: false }
    // }
}

export const createProduct = async (
    {
        values,
        accessToken
    }: {
        values: TRegisterProductSchema,
        accessToken: string
    }
) => {
    const validatedFields = RegisterProductSchema.safeParse(values)
    const verify = accessToken && verifyJwt(accessToken) || null
    if (accessToken && verify?.role === '2') {
        if (!validatedFields.success) {
            return {
                error: true,
                msg: 'ارتباط با سرور برقرار نشد !'
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

     /*    const { success, products } = await getProducts(stringifyParams)
        if (success === true&& products) {
            return {
                error: true,
                msg: 'این مورد وجود دارد !'
            }
        } */
        const newP =await createNewProduct({
            ...validatedFields.data
        }) as TProductSchema

        if (newP._id) {
            return {
                success: true,
              msg: 'حساب کاربری با موفقیت ایجاد شد'
            }
        }

        return {
            error: true,
            msg: 'سرور با مشکل مواجه شده دوباره سعی کنید'
        }
    } else {
        return {
            success: false,
            msg: 'شما دسترسی های لازم را ندارید !'
        }
    }
}

export const updateProduct = async (
    {
        _id,
        values,
        accessToken
    }: {
        _id: string | undefined
        values: TEditProductSchema,
        accessToken: string
    }
) => {
    const validatedFields = EditProductSchema.safeParse(values)
    const verify = accessToken && verifyJwt(accessToken) || null
    if (accessToken && verify?.role === '2') {

        const update = await updateP({
            _id,
            values
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

export const getPBy = async (stringifyParams: string) => {


    const product = await getProductBy(stringifyParams) as TEditProductSchema

    return { success: true, product }
}

export const deleteP = async ({ id, accessToken }: { id: string, accessToken: string | undefined }) => {
    const verify = accessToken && verifyJwt(accessToken) || null
    if (accessToken && (verify?.role) === '2') {
        const { acknowledged } = await deleteProduct(id) as mongoose.mongo.DeleteResult
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