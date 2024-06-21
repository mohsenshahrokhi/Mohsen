import * as z from 'zod'

import slugify from 'slugify'
import { CategorySchema } from './CategorySchema'
import { UserSchema } from './UserSchema'


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
    propertys: z.array(z.object({ title: z.string(), value: z.string(),type: z.boolean() ,options:z.array(z.string())})),
    // propertys: z.array(z.object({ title: z.string(), value: z.object({ id: z.string(), label: z.string() }) })),
    // propertys: z.array(z.string()).optional(),
    createdAt: z.date().optional()
})
export type TProductSchema = z.infer<typeof ProductSchema>

export const EditProductSchema = z.object({
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
    icon: z.string().optional(),
    images: z.array(z.string()).optional(),
    type: z.boolean().optional(),
    category: z.string(),
    // seller: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.object({ title: z.string(), value: z.string(),type: z.boolean(),options:z.array(z.string()) }))

})
export type TEditProductSchema = z.infer<typeof EditProductSchema>

export const RegisterProductSchema = z.object({
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
    category: z.string(),
    // seller: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.object({ title: z.string(), value: z.string(),type: z.boolean().optional(),options:z.array(z.string()) }))
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
})
export type TRegisterProductSchema = z.infer<typeof RegisterProductSchema>