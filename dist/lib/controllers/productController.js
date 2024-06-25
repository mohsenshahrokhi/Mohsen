import { MongooseQueryParser } from "mongoose-query-parser";
import Product from "../models/productModel";
import connectToMongodb from "../mongodb";
import Category from "../models/categoryModel";
import Users from "../models/userModel";
export const getAllProduct = async (req) => {
    connectToMongodb();
    try {
        const parser = new MongooseQueryParser();
        const parsed = parser.parse(req);
        const qtt = await Product.find().countDocuments({});
        const cat = await Category.find({});
        const user = await Users.find({});
        const products = await Product
            .find(parsed.filter)
            .populate(parsed.populate)
            .sort(parsed.sort)
            .limit(parsed.limit || 10)
            .skip(parsed.skip || 0)
            .select(parsed.select)
            .exec();
        const updatePId = products.map(product => {
            var _a;
            return ({
                ...product._doc, _id: product._doc._id.toString(), parent: (_a = product._doc.parent) === null || _a === void 0 ? void 0 : _a.toString()
            });
        });
        return { products: updatePId, qtt };
    }
    catch (err) {
        return err;
    }
};
export const getProductBy = async (stringifyParams) => {
    try {
        connectToMongodb();
        const parser = new MongooseQueryParser();
        const parsed = parser.parse(stringifyParams);
        const cat = await Category.find({});
        const user = await Users.find({});
        const product = await Product
            .findOne(parsed.filter)
            .populate(parsed.populate)
            .select(parsed.select)
            .exec();
        const updatePId = {
            ...product._doc, _id: product._doc._id.toString()
        };
        return updatePId;
    }
    catch (err) {
        return err;
    }
};
export const getProductBySlug = async (slug) => {
    try {
        connectToMongodb();
        const product = await Product.findOne({ slug });
        const updatePId = {
            ...product._doc, _id: product._doc._id.toString()
        };
        return updatePId;
    }
    catch (err) {
        return err;
    }
};
export const createNewProduct = async (params) => {
    try {
        connectToMongodb();
        const product = await Product.create({ ...params });
        console.log('product', product);
        const updatePId = {
            ...product._doc, _id: product._doc._id.toString()
        };
        return updatePId;
    }
    catch (err) {
        return err;
    }
};
export const updateP = async ({ _id, values }) => {
    try {
        connectToMongodb();
        const product = await Product.updateOne({ _id }, { ...values });
        return product;
    }
    catch (err) {
        return err;
    }
};
export const deleteProduct = async (_id) => {
    try {
        connectToMongodb();
        const item = await Product.deleteOne({ _id });
        return item;
    }
    catch (err) {
        return err;
    }
};
//# sourceMappingURL=productController.js.map