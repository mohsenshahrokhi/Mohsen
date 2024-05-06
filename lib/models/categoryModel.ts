import { TCategorySchema } from "@/ZSchemas"
import { Schema, model, models } from "mongoose"

const CategorySchema = new Schema<TCategorySchema>({
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
    },
    images: {
        type: Array,
    },
    icon: {
        type: String,
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
        ref: 'Category'
    },
    propertys: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryOption'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

})

const Category = models.Category || model("Category", CategorySchema)

export default Category 