import Users from "@/lib/models/userModel"
import connectToMongodb from "../mongodb"
import { NextResponse } from "next/server"
import { MongooseQueryParser } from "mongoose-query-parser"
import { TRegisterUserFormSchema, TRegisterUserSchema } from "@/ZSchemas/UserSchema"

export const getAllUsers = async (req: any) => {
    try {
        connectToMongodb()

        const parser = new MongooseQueryParser()
        const qtt = await Users.find().countDocuments({})
        const parsed = parser.parse(req)
        const users = await Users
            .find(parsed.filter)
            .populate(parsed.populate)
            .sort(parsed.sort)
            .limit(parsed.limit || 10)
            .skip(parsed.skip || 0)
            .select(parsed.select)
            .exec()
        const updateUId = users.map(user => ({
            ...user?._doc, _id: user?._doc._id.toString()
        }))
        return {users:updateUId,qtt}
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

export const getUserBy = async (stringifyParams: string) => {
    try {
        connectToMongodb()
        const parser = new MongooseQueryParser()
        const parsed = parser.parse(stringifyParams)
        const user = await Users
            .findOne(parsed.filter)
            .populate(parsed.populate)
            .select(parsed.select)
            .exec()
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

export const getUserByUsernamePass = async (username: string) => {
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

export const updateU = async ({ _id, values }:{_id: string, values: TRegisterUserFormSchema}) => {
    try {
        connectToMongodb()
        const updatedUser = await Users.findByIdAndUpdate({ _id }, { ...values })
        return updatedUser
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
