import { MongooseQueryParser } from "mongoose-query-parser"
import Product from "../models/productModel"
import connectToMongodb from "../mongodb"
import { TRegisterProductSchema } from "@/ZSchemas"
import Category from "../models/categoryModel"
import Users from "../models/userModel"

export const getAllProduct = async (req: any) => {
    connectToMongodb()
    try {
        const parser = new MongooseQueryParser()
        const parsed = parser.parse(req)
        const qtt = await Product.find().countDocuments({})
        const cat = await Category.find({})
        const user = await Users.find({})
        const cats = await Product
            .find(parsed.filter)
            .populate(parsed.populate)
            .sort(parsed.sort)
            .limit(parsed.limit || 10)
            .skip(parsed.skip || 0)
            .select(parsed.select)
            .exec()
        const updateCId = cats.map(product => ({
            ...product._doc, _id: product._doc._id.toString(), parent: product._doc.parent?.toString(), propertys: product._doc.propertys?.toString()
        }))
        return { products: updateCId, qtt }
    } catch (err) {
        return err
    }
}

export const getProductById = async (_id: string) => {
    try {
        connectToMongodb()
        const product = await Product.findById({ _id })
        const updateCId = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updateCId
    } catch (err) {
        return err
    }
}

export const getProductBySlug = async (slug: string) => {
    try {
        connectToMongodb()
        const product = await Product.findOne({ slug })
        const updateCId = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updateCId
    } catch (err) {
        return err
    }
}

export const createNewProduct = async (params: TRegisterProductSchema) => {
    try {
        connectToMongodb()
        const product = await Product.create({ ...params })
        const updateCId = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updateCId
    } catch (err) {
        return err
    }
}

export const updateCat = async ({ _id, values }: { _id: string | undefined, values: TRegisterProductSchema }) => {
    try {
        connectToMongodb()
        const product = await Product.updateOne({ _id }, { ...values })
        return product
    } catch (err) {
        return err
    }
}

export const deleteProduct = async (_id: string) => {
    try {
        connectToMongodb()
        const item = await Product.deleteOne({ _id })
        return item
    } catch (err) {
        return err
    }
}
