import { TCategorySchema } from "@/ZSchemas"
import { Schema, model, models } from "mongoose"

export const CategorySchema = new Schema<TCategorySchema>({
    name: {
        type: String,
        required: [true, 'لطفا نام دسته بندی را وارد کنید'],
        unique: true,
        trim: true,
    },
    latinName: {
        type: String,
        required: [true, 'لطفا نام دسته بندی را وارد کنید'],
        unique: true,
        trim: true,
    },
    colorIcon: {
        type: String,
        trim: true,
        default: null
    },
    images: {
        type: [String]
    },
    icon: {
        type: String,
        trim: true,
        default: null
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: Boolean,
        default: false,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        default: null
    },
    propertys: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryOption',
        default: null
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

})

const Category = models.categories || model("categories", CategorySchema)

export default Category 