import { Methods, TCategoryOptionSchema } from "@/ZSchemas"
import { Model, Schema, model, models } from "mongoose"
import Category from "./categoryModel"

const CategoryOptionSchema = new Schema<TCategoryOptionSchema>({
    _id: {
        type: "string",
        unique: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        // ref: 'categories',
        required: true
    },
    propertys: [{
        type: [],
        required: true
    }]
})

const CategoryOption = models.categoryops || model('categoryops', CategoryOptionSchema)

export default CategoryOption