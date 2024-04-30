import { MongooseQueryParser } from "mongoose-query-parser";
import PublicGallery from "../models/galleryModel"
import connectToMongodb from "../mongodb"
import fs from "fs";

export const getAllGallery = async (req: any) => {
  try {
    connectToMongodb()
    let gallerys = []
    const url = new URL(req.url).search.split('?')[1]
    if (url) {
      const parser = new MongooseQueryParser()
      const parsed = parser.parse(url)
      gallerys = await PublicGallery
        .find(parsed.filter)
        .sort(parsed.sort).
        limit(parsed.limit || 10)
        .populate(parsed.populate)
        .select(parsed.select)
    } else {
      gallerys = await PublicGallery.find()
    }
    // const gallerys = await PublicGallery.find()
    const updateCId = gallerys.map(PublicGallery => ({
      ...PublicGallery._doc, _id: PublicGallery._doc._id.toString()
    }))
    return updateCId
  } catch (err) {
    return err
  } finally {
    // await prisma.$disconnect();
  }
}

export const getGallery = async (_id: string) => {
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


export const getGalleryBySlug = async (slug: string) => {

  try {
    connectToMongodb()
    const gallery = await PublicGallery.findOne({ slug })
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

export const uploadGalleryImages = async (params: any) => {
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

export const updateGallery = async (_id: string, params: any) => {
  try {
    connectToMongodb()
    const { data } = params
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
