'use server'

import { CategorySchema, RegisterCategorySchema, TRegisterCategorySchema } from "@/ZSchemas"
import { getCategory } from "@/lib/controllers/categoryController"

export const createCategory = async (values: TRegisterCategorySchema) => {
    console.log('values', values);

    const validatedFields = RegisterCategorySchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: true, msg: 'ارتباط با سرور برقرار نشد !' }
    }

    await createCategory({
        ...validatedFields.data
    })

    return { success: true, msg: 'حساب کاربری با موفقیت ایجاد شد' }

}


export const getCat = async (_id: string) => {

    const validatedField = CategorySchema.safeParse(_id)

    if (!validatedField.success) {
        return { error: true, msg: 'ارتباط با سرور برقرار نشد !' }
    }

    const cat = await getCategory(validatedField.data._id)

    return { success: true, cat }
}