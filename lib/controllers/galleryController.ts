import { MongooseQueryParser } from "mongoose-query-parser";
import connectToMongodb from "../mongodb"
import fs from "fs";
import { TGallerySchema, TRegisterGallerySchema } from "@/ZSchemas";
import PublicGallery from "../models/galleryModel";

export const getAllGallery = async (req: any) => {
  connectToMongodb()
  try {
    const parser = new MongooseQueryParser()
    const parsed = parser.parse(req)
    const qtt = await PublicGallery.find().countDocuments({})
    let gallery: TGallerySchema[]
    gallery = await PublicGallery
      .find(parsed.filter)
      .populate(parsed.populate)
      .sort(parsed.sort)
      .limit(parsed.limit || 10)
      .skip(parsed.skip || 0)
      .select(parsed.select)
      .exec()
    const updateCId = gallery.map(category => ({
      // ...category._doc, _id: category._doc._id.toString(), parent: category._doc.parent?.toString(), propertys: category._doc.propertys?.toString()
      // // ...category._doc, _id: category._doc._id.toString()
    }))
    return { gallery, qtt }
    // return { gallery, qtt }
  } catch (err) {
    return err
  }
}

export const getGalleryById = async (_id: string) => {
  try {
    connectToMongodb()
    const gallery = await PublicGallery.findById({ _id })
    const updateCId = {
      ...gallery._doc, _id: gallery._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect();
  }
}


export const getGalleryByTitle = async (title: string) => {

  try {
    connectToMongodb()
    const gallery = await PublicGallery.findOne({ title })
    const updateCId = {
      ...gallery._doc, _id: gallery._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect();
  }
}

export const createGalleryImages = async (params: any) => {
  try {
    connectToMongodb()
    console.log(params)
    const gallery = await PublicGallery.create({ ...params })
    const updateCId = {
      ...gallery._doc, _id: gallery._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect()
  }
}

export const updateGallery = async ({ _id, data }: { _id: string, data: TRegisterGallerySchema }) => {
  try {
    connectToMongodb()
    const gallery = await PublicGallery.updateOne({ _id }, { ...data })
    return gallery
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect()
  }
}

export const deleteGallery = async (urls: string[]) => {
  try {
    connectToMongodb()
    for (let index = 0; index < urls.length; index++) {
      console.log(urls[index]);

      fs.unlinkSync('public/uploads/' + urls[index])
      await PublicGallery.deleteOne({ url: urls[index] })
    }
    return true
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect()
  }
}
