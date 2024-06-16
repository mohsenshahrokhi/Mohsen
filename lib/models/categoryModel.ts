import { TCategorySchema } from "@/ZSchemas/CategorySchema"
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
        default: ''
    },
    images: {
        type: [String],
        default: []
    },
    icon: {
        type: String,
        trim: true,
        default: ''
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
    propertys: [
        {
            name: String,
            values: [{ id: String, label: String }]
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Category = models.categories || model("categories", CategorySchema)

export default Category 