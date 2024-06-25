import mongoose, { Schema, model, models } from "mongoose";
import { CategorySchema } from "./categoryModel";
const CategoryOptionSchema = new Schema({
    _id: {
        type: "string",
        unique: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: mongoose.model('categories', CategorySchema),
        required: true
    },
    propertys: [{
            type: [],
            required: true
        }]
});
const CategoryOption = models.categoryops || model('categoryops', CategoryOptionSchema);
export default CategoryOption;
//# sourceMappingURL=categoryOptionModel.js.map