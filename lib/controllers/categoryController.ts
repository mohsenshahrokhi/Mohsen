import { MongooseQueryParser } from "mongoose-query-parser"
import Category from "../models/categoryModel"
import connectToMongodb from "../mongodb"
import { TCategorySchema, TRegisterCategorySchema } from "@/ZSchemas"
import CategoryOption from "../models/categoryOptionModel"
import mongoose from "mongoose"

export const getAllCategory = async (req: any) => {
  connectToMongodb()
  try {
    const parser = new MongooseQueryParser()
    const parsed = parser.parse(req)
    let cats: TCategorySchema[]
    console.log('parsed', parsed.filter);

    cats = await Category
      .find(parsed.filter)
      .populate(parsed.populate)
      .sort(parsed.sort)
      .limit(parsed.limit || 10)
      .select(parsed.select)
      .exec()
    const updateCId = cats.map(category => ({
      // ...category._doc, _id: category._doc._id.toString(), parent: category._doc.parent?.toString(), propertys: category._doc.propertys?.toString()
      // // ...category._doc, _id: category._doc._id.toString()
    }))
    return cats
  } catch (err) {
    return err
  }
}

export const getCategory = async (_id: string) => {

  try {
    connectToMongodb()
    const category = await Category.findById({ _id })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  }
}


export const getCategoryBySlug = async (slug: string) => {

  try {
    connectToMongodb()
    const category = await Category.findOne({ slug })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  }
}

export const createNewCategory = async (params: TRegisterCategorySchema) => {
  try {
    connectToMongodb()
    if (params.parent === '') {
      delete params.parent
    }
    const category = await Category.create({ ...params })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  }
}

export const updateCategory = async (_id: string, params: any) => {
  try {
    connectToMongodb()
    const { data } = params
    const category = await Category.updateOne({ _id }, { ...data })
    return category
  } catch (err) {
    return err
  }
}

export const deleteCategory = async (_id: string) => {

  try {
    connectToMongodb()

    await Category.deleteOne({ _id })

    return true

  } catch (err) {
    return err
  }
}
