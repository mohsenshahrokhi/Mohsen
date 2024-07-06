import * as z from 'zod'

import slugify from 'slugify'
import { CategorySchema } from './CategorySchema'
import { UserSchema } from './UserSchema'
import { digitsFaToEn } from '@persian-tools/persian-tools'


export const ProductSchema = z.object({
    _id: z.string(),
    title: z.string().min(4, {
        message: 'حداقل ۴ حرف را وارد کنید'
    }),
    price: z.string(),
    discount: z.string(),
    description: z.string(),
    ratings: z.string().optional(),
    recipe: z.string(),
    reviews: z.string().optional(),
    stock: z.string(),
    slug: z.string().optional(),
    colorIcon: z.string().optional(),
    icon: z.string().uuid().optional(),
    images: z.array(z.string()).optional(),
    type: z.boolean().optional(),
    // category: z.string().optional(),
    category: CategorySchema,
    // category: z.string().uuid().optional(),
    // seller: UserSchema.optional(),
    // seller: z.string().uuid().optional(),
    author: UserSchema.optional(),
    // author: z.string().optional(),
    propertys: z.array(z.object({ title: z.string(), value: z.string(),type: z.boolean()})),
    // propertys: z.array(z.object({ title: z.string(), value: z.object({ id: z.string(), label: z.string() }) })),
    // propertys: z.array(z.string()).optional(),
    createdAt: z.date().optional()
}).superRefine((data, ctx) => {
 if (data.price) data.price = digitsFaToEn(data.price)
 if (data.stock) data.stock = digitsFaToEn(data.stock)
 if (data.discount) data.discount = digitsFaToEn(data.discount)
})
export type TProductSchema = z.infer<typeof ProductSchema>

export const EditProductSchema = z.object({
_id: z.string(),
    title: z.string(),
    price: z.string(),
    discount: z.string(),
    description: z.string().optional(),
    ratings: z.string().optional(),
    recipe: z.string(),
    reviews: z.string().optional(),
    stock: z.string(),
    slug: z.string().optional(),
    colorIcon: z.string().optional(),
    icon: z.string().optional(),
    images: z.array(z.string()).optional(),
    type: z.boolean().optional(),
    category: z.string(),
    // seller: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.object({ title: z.string(), value: z.string(), type: z.boolean() })),
    createdAt:z.date()

}).superRefine((data, ctx) => {
    if (data.price) data.price = digitsFaToEn(data.price)
    if (data.stock) data.stock = digitsFaToEn(data.stock)
    if (data.discount) data.discount = digitsFaToEn(data.discount)
})
export type TEditProductSchema = z.infer<typeof EditProductSchema>

export const RegisterProductSchema = z.object({
    title: z.string().min(4, {
        message: 'حداقل ۴ حرف را وارد کنید'
    }),
    price: z.string(),
    discount: z.string(),
    description: z.string().optional(),
    ratings: z.string().optional(),
    recipe: z.string().optional(),
    reviews: z.string().optional(),
    // reviews: z.array(z.object({rating:z.string(),comment:z.string(),createdAt:z.date()})).optional(),
    stock: z.string(),
    slug: z.string().optional(),
    colorIcon: z.string().optional(),
    icon: z.string().uuid().optional(),
    images: z.array(z.string()).optional(),
    type: z.boolean().optional(),
    category: z.string().optional(),
    // seller: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.object({ title: z.string(), value: z.string(),type: z.boolean().optional() }))
}).superRefine((data, ctx) => {
    if (data.title) {
        data.slug = slugify(data.title, {
            replacement: '_',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'fa',      // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
        })
    }
    if (data.price) data.price = digitsFaToEn(data.price)
    if (data.stock) data.stock = digitsFaToEn(data.stock)
    if (data.discount) data.discount = digitsFaToEn(data.discount)
})
export type TRegisterProductSchema = z.infer<typeof RegisterProductSchema>