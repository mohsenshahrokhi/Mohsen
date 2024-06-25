import { MongooseQueryParser } from "mongoose-query-parser";
import connectToMongodb from "../mongodb";
import fs from "fs";
import PublicGallery from "../models/galleryModel";
export const getAllGallery = async (req) => {
    connectToMongodb();
    try {
        const parser = new MongooseQueryParser();
        const parsed = parser.parse(req);
        const qtt = await PublicGallery.find().countDocuments({});
        // let gallerys: TGallerySchema[]
        const gallerys = await PublicGallery
            .find(parsed.filter)
            .populate(parsed.populate)
            .sort(parsed.sort)
            .limit(parsed.limit || 10)
            .skip(parsed.skip || 0)
            .select(parsed.select)
            .exec();
        const updateCId = gallerys.map(gallery => {
            var _a, _b, _c;
            return ({
                ...gallery._doc, _id: gallery._doc._id.toString(), parent: (_a = gallery._doc.parent) === null || _a === void 0 ? void 0 : _a.toString(), propertys: (_b = gallery._doc.propertys) === null || _b === void 0 ? void 0 : _b.toString(), author: (_c = gallery._doc.author) === null || _c === void 0 ? void 0 : _c.toString()
            });
        });
        return { gallery: updateCId, qtt };
    }
    catch (err) {
        return err;
    }
};
export const getGalleryById = async (_id) => {
    try {
        connectToMongodb();
        const gallery = await PublicGallery.findById({ _id });
        const updateCId = {
            ...gallery._doc, _id: gallery._doc._id.toString()
        };
        return updateCId;
    }
    catch (err) {
        return err;
    }
    finally {
        // await prisma.$disconnect();
    }
};
export const getGalleryByTitle = async (title) => {
    try {
        connectToMongodb();
        const gallery = await PublicGallery.findOne({ title });
        const updateCId = {
            ...gallery._doc, _id: gallery._doc._id.toString()
        };
        return updateCId;
    }
    catch (err) {
        return err;
    }
    finally {
        // await prisma.$disconnect();
    }
};
export const createGalleryImages = async (params) => {
    try {
        connectToMongodb();
        console.log(params);
        const gallery = await PublicGallery.create({ ...params });
        const updateCId = {
            ...gallery._doc, _id: gallery._doc._id.toString()
        };
        return updateCId;
    }
    catch (err) {
        return err;
    }
    finally {
        // await prisma.$disconnect()
    }
};
export const updateGallery = async ({ _id, data }) => {
    try {
        connectToMongodb();
        const gallery = await PublicGallery.updateOne({ _id }, { ...data });
        return gallery;
    }
    catch (err) {
        return err;
    }
    finally {
        // await prisma.$disconnect()
    }
};
export const deleteGallery = async (urls) => {
    try {
        connectToMongodb();
        for (let index = 0; index < urls.length; index++) {
            console.log(urls[index]);
            fs.unlinkSync('public/uploads/' + urls[index]);
            await PublicGallery.deleteOne({ url: urls[index] });
        }
        return true;
    }
    catch (err) {
        return err;
    }
    finally {
        // await prisma.$disconnect()
    }
};
//# sourceMappingURL=galleryController.js.map