import { MongooseQueryParser } from "mongoose-query-parser"
import CategoryOption from "../models/categoryOptionModel"
import connectToMongodb from "../mongodb"
import { TCategoryOptionSchema } from "@/ZSchemas"

export const getAllCategoryOption = async (req: any) => {
  try {
    connectToMongodb()
    const parser = new MongooseQueryParser()
    const parsed = parser.parse(req)
    const categories = await CategoryOption
      .find(parsed.filter)
      .sort(parsed.sort)
      .limit(parsed.limit || 10)
      .populate(parsed.populate)
      .select(parsed.select)
    return categories
  } catch (err) {
    return err
  }
}

export const getCategoryOption = async (_id: string) => {
  try {
    connectToMongodb()
    const category = await CategoryOption.findById({ _id })
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
    const category = await CategoryOption.findOne({ slug })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  }
}

export const createCategory = async (params: TCategoryOptionSchema) => {
  try {
    connectToMongodb()
    const category = await CategoryOption.create({ ...params })
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
    const category = await CategoryOption.updateOne({ _id }, { ...data })
    return category
  } catch (err) {
    return err
  }
}

export const deleteCategory = async (_id: string) => {
  try {
    connectToMongodb()
    await CategoryOption.deleteOne({ _id })
    return true
  } catch (err) {
    return err
  }
}
