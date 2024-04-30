import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if (!MONGODB_URI) {
    throw new Error('invalid MONGODB URI')
}

const connectToMongodb = async () => {
    try {
        mongoose.set("strictQuery", false)
        const { connection } = await mongoose.connect(MONGODB_URI)
        // console.log('connected!')
        if (connection.readyState === 1) {
            // console.log('connected!')
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectToMongodb