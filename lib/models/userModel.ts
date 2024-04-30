import { Model, Schema, model, models } from "mongoose"
import bcrypt from 'bcrypt'
import { Methods, TUserSchema } from "@/ZSchemas"

const UserSchema = new Schema<TUserSchema, {}, Methods>({
    // _id: {
    //     type: "string",
    //     unique: true,
    // },
    email: {
        type: "string",
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email address']
    },
    username: {
        type: "string",
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [8, 'name  >=  8'],
        maxLength: [30, 'name < 30']
    },
    displayName: {
        type: "string",
    },
    password: {
        type: "string",
        require: [true, 'password is required'],
        minLength: [6, 'password  >=  6'],
        maxLength: [62, 'password < 62'],
        select: false
    },
    role: {
        type: 'string',
        default: 'کاربر'
    },
    description: {
        type: 'string'
    },
    address: {
        type: 'string'
    },
    phone: {
        type: 'string',
        require: true,
        trim: true,
        unique: true,
        minLength: [10, 'password  =  10'],
        maxLength: [10, 'password = 10'],
    },
    verifyPKey: {
        type: 'string'
    },
    verifyPhone: {
        type: 'boolean',
        default: false
    },
    verifyMKey: {
        type: 'date'
    },
    verifyMail: {
        type: 'boolean',
        default: false
    },
    basketId: {
        type: 'string'
    },
    accessToken: {
        type: 'String'
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        throw error
    }
})

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const Users = models.user || model("user", UserSchema)

export default Users as Model<TUserSchema, {}, Methods>