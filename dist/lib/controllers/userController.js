import Users from "@/lib/models/userModel";
import connectToMongodb from "../mongodb";
import { NextResponse } from "next/server";
import { MongooseQueryParser } from "mongoose-query-parser";
export const getAllUsers = async (req) => {
    try {
        connectToMongodb();
        const parser = new MongooseQueryParser();
        const parsed = parser.parse(req);
        const users = await Users
            .find(parsed.filter)
            .sort(parsed.sort).
            limit(parsed.limit || 10)
            .populate(parsed.populate)
            .select(parsed.select);
        const updateUId = users.map(user => ({
            ...user === null || user === void 0 ? void 0 : user._doc, _id: user === null || user === void 0 ? void 0 : user._doc._id.toString()
        }));
        return updateUId;
    }
    catch (error) {
        return error;
    }
};
export const getUserByEmail = async (email) => {
    try {
        connectToMongodb();
        const user = await Users.findOne({ email }).select('+password');
        const updateId = {
            ...user === null || user === void 0 ? void 0 : user._doc, _id: user === null || user === void 0 ? void 0 : user._doc._id.toString()
        };
        return updateId;
    }
    catch (error) {
        return error;
    }
};
export const getUser = async (user) => {
    try {
        connectToMongodb();
        const newUser = await Users.findOne(user).select('+password');
        const updateId = {
            ...newUser === null || newUser === void 0 ? void 0 : newUser._doc, _id: newUser === null || newUser === void 0 ? void 0 : newUser._doc._id.toString()
        };
        return updateId;
    }
    catch (error) {
        return error;
    }
};
export const getUserByUsernamePass = async (username) => {
    try {
        connectToMongodb();
        const newUser = await Users.findOne({ username }).select('+password');
        const updateId = {
            ...newUser === null || newUser === void 0 ? void 0 : newUser._doc, _id: newUser === null || newUser === void 0 ? void 0 : newUser._doc._id.toString()
        };
        return updateId;
    }
    catch (error) {
        return error;
    }
};
export const getUserById = async (_id) => {
    try {
        connectToMongodb();
        const user = await Users.findOne({ _id });
        const updateId = {
            ...user === null || user === void 0 ? void 0 : user._doc, _id: user === null || user === void 0 ? void 0 : user._doc._id.toString()
        };
        return updateId;
    }
    catch (error) {
        return error;
    }
};
export const getUserByPhone = async (phone) => {
    try {
        connectToMongodb();
        const newUser = await Users.findOne(phone);
        const updateId = {
            ...newUser === null || newUser === void 0 ? void 0 : newUser._doc, _id: newUser === null || newUser === void 0 ? void 0 : newUser._doc._id.toString()
        };
        return updateId;
    }
    catch (error) {
        return error;
    }
};
export const registerUser = async (user) => {
    try {
        connectToMongodb();
        const newUser = await Users.create({ ...user });
        const updateId = {
            ...newUser._doc, _id: newUser._doc._id.toString()
        };
        return updateId;
    }
    catch (err) {
        return err;
    }
};
export const updateUser = async (_id, params) => {
    try {
        connectToMongodb();
        const { data } = params;
        const updatedUser = await Users.updateOne({ _id }, { ...data });
        return updatedUser;
    }
    catch (err) {
        return err;
    }
};
export const deleteUser = async (_id) => {
    try {
        connectToMongodb();
        await Users.deleteOne({ _id });
        return NextResponse.json({ message: 'ok' }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: 'faild to create a new product', error }, { status: 500 });
    }
};
//# sourceMappingURL=userController.js.map