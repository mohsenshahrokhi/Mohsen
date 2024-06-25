import { MongooseQueryParser } from "mongoose-query-parser";
import Category from "../models/categoryModel";
import connectToMongodb from "../mongodb";
import Users from "../models/userModel";
export const getAllCategory = async (req) => {
    connectToMongodb();
    try {
        const parser = new MongooseQueryParser();
        const parsed = parser.parse(req);
        const user = await Users.find({});
        const qtt = await Category.find().countDocuments({});
        const cats = await Category
            .find(parsed.filter)
            .populate(parsed.populate)
            .sort(parsed.sort)
            .limit(parsed.limit || 10)
            .skip(parsed.skip || 0)
            .select(parsed.select)
            .exec();
        const updateCId = cats.map(category => ({
            // ...category._doc, _id: category._doc._id.toString(), parent: category._doc.parent?.toString(), propertys: category._doc.propertys?.toString()
            ...category._doc, _id: category._doc._id.toString()
        }));
        return updateCId;
    }
    catch (err) {
        return err;
    }
};
export const getCategoryBy = async (stringifyParams) => {
    try {
        connectToMongodb();
        const parser = new MongooseQueryParser();
        const parsed = parser.parse(stringifyParams);
        const cat = await Category.find({});
        const user = await Users.find({});
        const category = await Category.findById(parsed.filter)
            .populate(parsed.populate)
            .select(parsed.select)
            .exec();
        const updateCId = {
            ...category._doc, _id: category._doc._id.toString()
        };
        return updateCId;
    }
    catch (err) {
        return err;
    }
};
export const getCategoryBySlug = async (slug) => {
    try {
        connectToMongodb();
        const category = await Category.findOne({ slug });
        const updateCId = {
            ...category._doc, _id: category._doc._id.toString()
        };
        return updateCId;
    }
    catch (err) {
        return err;
    }
};
export const createNewCategory = async (params) => {
    try {
        connectToMongodb();
        if (params.parent === '') {
            delete params.parent;
        }
        const category = await Category.create({ ...params });
        const updateCId = {
            ...category._doc, _id: category._doc._id.toString()
        };
        return updateCId;
    }
    catch (err) {
        return err;
    }
};
export const updateCat = async ({ _id, values }) => {
    try {
        if (values.parent === '') {
            delete values.parent;
        }
        connectToMongodb();
        const category = await Category.updateOne({ _id: _id }, { ...values });
        return category;
    }
    catch (err) {
        return err;
    }
};
export const deleteCategory = async (_id) => {
    try {
        connectToMongodb();
        const item = await Category.deleteOne({ _id });
        return item;
    }
    catch (err) {
        return err;
    }
};
//# sourceMappingURL=categoryController.js.map