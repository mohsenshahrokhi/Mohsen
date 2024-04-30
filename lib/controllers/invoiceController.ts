import { PRODUCT } from "@/type"
import Product from "../models/productModel"
import connectToMongodb from "../mongodb"
import { NextResponse } from "next/server"
import { MongooseQueryParser } from "mongoose-query-parser"

export const getProductById = async (_id: string) => {
    try {
        connectToMongodb()
        // const product = await Product.findById(_id).populate('category')
        const product = await Product.findById(_id).populate('category').populate('author').populate('seller').exec()
        const updatePId: PRODUCT = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updatePId
    } catch (error) {
        return NextResponse.json({ message: 'faild to create a new product', error }, { status: 500 })
    }
}

export const getAllProducts = async (req: any) => {
    try {
        connectToMongodb()
        let products = []
        const url = new URL(req.url).search.split('?')[1]
        if (url) {
            const parser = new MongooseQueryParser()
            const parsed = parser.parse(url)
            products = await Product
                .find(parsed.filter)
                .sort(parsed.sort).
                limit(parsed.limit || 10)
                .populate(parsed.populate)
                .select(parsed.select)
        } else {
            products = await Product.find()
        }
        const updatePId: PRODUCT[] = products.map((product) => ({
            ...product._doc, _id: product._doc._id.toString()
        }))
        return updatePId
    } catch (error) {
        return NextResponse.json({ message: 'faild to create a new product', error }, { status: 500 })
    }
}

export const getAllProductsByCategory = async (query: string[]) => {
    try {
        connectToMongodb()
        const products = await Product.find({ $and: [{ category: query[0] }, { stoch: { $gt: 0 } }] })
        const updatePId: PRODUCT[] = products.map(product => ({
            ...product._doc, _id: product._doc._id.toString()
        }))
        return updatePId
    } catch (error) {
        return NextResponse.json({ message: 'faild to create a new product', error }, { status: 500 })
    }
}

export const createProduct = async (params: PRODUCT) => {
    try {
        connectToMongodb()
        const product = await Product.create({ ...params })
        const updateCId = {
            ...product._doc, _id: product._doc._id.toString()
        }
        return updateCId
    } catch (err) {
        return err
    } finally {
        // await prisma.$disconnect()
    }
}

export const updateProduct = async (_id: string, params: any) => {

    try {
        connectToMongodb()
        const { data } = params
        const product = await Product.updateOne({ _id }, {
            category: data.category._id,
            images: data.images,
            description: data.description,
            price: data.price,
            discount: data.discount,
            propertys: data.propertys,
            ratings: data.ratings,
            recipe: data.recipe,
            reviews: data.reviews,
            seller: data.seller,
            author: data.author._id,
            slug: data.slug,
            title: data.title,
            stock: data.stock
        })
        // const product = await Product.updateOne({ _id }, { ...data })
        return product
    } catch (err) {
        return err
    } finally {
        // await prisma.$disconnect()
    }
}

export const deleteProduct = async (_id: any) => {
    try {
        connectToMongodb()
        await Product.deleteOne({ _id })
        return NextResponse.json({ message: 'ok' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'faild to create a new product', error }, { status: 500 })
    }
}
