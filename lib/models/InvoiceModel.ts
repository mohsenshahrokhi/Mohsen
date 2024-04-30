import { InvoiceDocument, Methods } from "@/type"
import { Schema, model, models } from "mongoose"

const InvoiceSchema = new Schema<InvoiceDocument, {}, Methods>({
    title: {
        type: String,
        required: [true, 'لطفا نام محصول را وارد کنید'],
    },
    slug: {
        type: String,
        required: true,
    },
    measure: {
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
    freight: {
        type: String
    },
    price: {
        type: String,
        required: [true, 'لطفا قیمت محصول را وارد کنید'],
    },
    images: {
        public_id: String,
        url: String,

    },
    propertys: {
        type: []

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'لطفا نام خریدار محصول را وارد کنید'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    stock: {
        type: String,
        required: [true, 'لطفا تعداد محصول را وارد کنید'],
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Invoice = models.invoice || model("invoice", InvoiceSchema)

export default Invoice