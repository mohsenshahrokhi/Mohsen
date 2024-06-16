import { MongooseQueryParser } from "mongoose-query-parser"
import Product from "../models/productModel"
import connectToMongodb from "../mongodb"
import Category from "../models/categoryModel"
import Users from "../models/userModel"
import { TRegisterProductSchema } from "@/ZSchemas/ProductSchema"

export const getAllProduct = async (req: any) => {
    connectToMongodb()
    try {
        const parser = new MongooseQueryParser()
        const parsed = parser.parse(req)
        const qtt = await Product.find().countDocuments({})
        const cat = await Category.find({})
        const user = await Users.find({})
        const products = await Product
            .find(parsed.filter)
            .populate(parsed.populate)
            .sort(parsed.sort)
            .limit(parsed.limit || 10)
            .skip(parsed.skip || 0)
            .select(parsed.select)
            .exec()
        const updatePId = products.map(product => ({
            ...product._doc, _id: product._doc._id.toString(), parent: product._doc.parent?.toString()
        }))

        return { products: updatePId, qtt }
    } catch (err) {
        return err
    }
}

export const getProductBy = async (stringifyParams: string) => {
    try {
        connectToMongodb()
        const parser = new MongooseQueryParser()
        const parsed = parser.parse(stringifyParams)
        console.log('req', parsed);
        const cat = await Category.find({})
        const user = await Users.find({})
        const product = await Product
            .findById(parsed.filter)
            .populate(parsed.populate)
            .select(parsed.select)
            .exec()
        const updatePId = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updatePId
    } catch (err) {
        return err
    }
}

export const getProductBySlug = async (slug: string) => {
    try {
        connectToMongodb()
        const product = await Product.findOne({ slug })
        const updatePId = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updatePId
    } catch (err) {
        return err
    }
}

export const createNewProduct = async (params: TRegisterProductSchema) => {
    try {
        connectToMongodb()
        const product = await Product.create({ ...params })
        const updatePId = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updatePId
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
