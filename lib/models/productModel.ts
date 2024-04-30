import { Schema, model, models } from "mongoose"

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
        required: [true, 'لطفا مشخصات محصول را وارد کنید'],
    },
    recipe: {
        type: String,
        required: [true, 'لطفا مشخصات محصول را وارد کنید'],
    },
    price: {
        type: Number,
        required: [true, 'لطفا قیمت محصول را وارد کنید'],
    },
    discount: {
        type: Number,
    },
    images: {
        type: [String],

    },
    propertys: {
        type: [Object]

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'لطفا دسته بندی محصول را وارد کنید']
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'لطفا نام خریدار محصول را وارد کنید'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'لطفا نام ثبت کننده محصول را وارد کنید'],
    },
    stock: {
        type: Number,
        required: [true, 'لطفا تعداد محصول را وارد کنید'],
    },
    ratings: {
        type: String,
        default: 0
    },
    reviews: [
        {
            rating: {
                type: Number,
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

const Product = models.product || model("product", ProductSchema)

export default Product