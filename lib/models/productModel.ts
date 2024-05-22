import mongoose, { Schema, model, models } from "mongoose"
import { CategorySchema } from "./categoryModel"
import { UserSchema } from "./userModel"

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'لطفا نام محصول را وارد کنید'],
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: [true, 'لطفا مشخصات محصول را وارد کنید'],
    },
    recipe: {
        type: String,
        // required: [true, 'لطفا مشخصات محصول را وارد کنید'],
    },
    price: {
        type: Number,
        // required: [true, 'لطفا قیمت محصول را وارد کنید'],
    },
    discount: {
        type: String,
    },
    images: {
        type: [String],

    },
    propertys: {
        type: [Object]

    },
    category: {
        type: Schema.Types.ObjectId,
        // ref: model('categories', CategorySchema),
        ref: 'categories',
        required: [true, 'لطفا دسته بندی محصول را وارد کنید']
    },
    seller: {
        type: Schema.Types.ObjectId,
        // ref: mongoose.model('users', UserSchema),
        ref: 'users',
        required: [true, 'لطفا نام خریدار محصول را وارد کنید'],
    },
    author: {
        type: Schema.Types.ObjectId,
        // ref: mongoose.model('users', UserSchema),
        ref: 'users',
        required: [true, 'لطفا نام ثبت کننده محصول را وارد کنید'],
    },
    stock: {
        type: String,
        required: [true, 'لطفا تعداد محصول را وارد کنید'],
    },
    ratings: {
        type: String,
        default: 0
    },
    reviews: [
        {
            rating: {
                type: String,
                // required: [true, 'لطفا تعداد محصول را وارد کنید']
            },
            comment: {
                type: String,
                // required: [true, 'لطفا تعداد محصول را وارد کنید']
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
    ], createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = models.Products || model("Products", ProductSchema)

export default Product