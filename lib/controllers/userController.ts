import Users from "@/lib/models/userModel"
import connectToMongodb from "../mongodb"
import { NextResponse } from "next/server"
import { MongooseQueryParser } from "mongoose-query-parser"
import { TRegisterUserSchema, TUserSchema } from "@/ZSchemas"

export const getAllUsers = async (req: any) => {
    try {
        connectToMongodb()
        // let users = []
        // const url = new URL(req.url).search.split('?')[1]
        // if (url) {
        const parser = new MongooseQueryParser()
        const parsed = parser.parse(req)
        const users = await Users
            .find(parsed.filter)
            .sort(parsed.sort).
            limit(parsed.limit || 10)
            .populate(parsed.populate)
            .select(parsed.select)
        // } else {
        //     users = await Users.find()
        // }
        const updateUId = users.map(user => ({
            ...user?._doc, _id: user?._doc._id.toString()
        }))
        return updateUId
    } catch (error) {
        return error
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        connectToMongodb()
        const user = await Users.findOne({ email }).select('+password')
        const updateId = {
            ...user?._doc, _id: user?._doc._id.toString()
        }
        return updateId
    } catch (error) {
        return error
    }
}

export const getUser = async (user: any) => {
    try {
        connectToMongodb()
        const newUser = await Users.findOne(user).select('+password')
        const updateId = {
            ...newUser?._doc, _id: newUser?._doc._id.toString()
        }
        return updateId
    } catch (error) {
        return error
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        connectToMongodb()
        const newUser = await Users.findOne({ username }).select('+password')
        const updateId = {
            ...newUser?._doc, _id: newUser?._doc._id.toString()
        }
        return updateId
    } catch (error) {
        return error
    }
}

export const getUserById = async (_id: string) => {
    try {
        connectToMongodb()
        const user = await Users.findOne({ _id })
        const updateId = {
            ...user?._doc, _id: user?._doc._id.toString()
        }
        return updateId
    } catch (error) {
        return error
    }
}

export const getUserByPhone = async (phone: { phone: string }) => {
    try {
        connectToMongodb()
        const newUser = await Users.findOne(phone)
        const updateId = {
            ...newUser?._doc, _id: newUser?._doc._id.toString()
        }
        return updateId
    } catch (error) {
        return error
    }
}

export const registerUser = async (user: TRegisterUserSchema) => {
    try {
        connectToMongodb()
        const newUser = await Users.create({ ...user })
        const updateId = {
            ...newUser._doc, _id: newUser._doc._id.toString()
        }
        return updateId
    } catch (err) {
        return err
    }
}

export const updateUser = async (_id: string, params: any) => {
    try {
        connectToMongodb()
        const { data } = params
        const updatedUser = await Users.updateOne({ _id }, { ...data })
        const updateId = {
            ...updatedUser._doc, _id: updatedUser._doc._id.toString()
        }
        return updateId
    } catch (err) {
        return err
    }
}

export const deleteUser = async (_id: any) => {
    try {
        connectToMongodb()
        await Users.deleteOne({ _id })
        return NextResponse.json({ message: 'ok' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'faild to create a new product', error }, { status: 500 })
    }
}
