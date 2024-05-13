import * as z from 'zod'
import slugify from 'slugify'
import { title } from 'process'

declare module 'next-auth' {
    interface Session {
        user: TUserSchema
    }
}

/* AuthSchema */

export interface Methods {
    comparePassword(password: string): Promise<boolean>
}

export const LoginMailSchema = z.object({
    email: z.string().email({
        message: 'ایمیل را به صورت صحیح وارد کنید'
    }),
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    })
})
export type TLoginMailSchema = z.infer<typeof LoginMailSchema>

const phoneRegExp = new RegExp(/^9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/)
const smsRegExp = new RegExp(/^\d{4}$/)
// const phoneRegExp = new RegExp(/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/)

export const LoginPhoneSchema = z.object({
    // phone: z.string().min(6, {
    //     message: 'حداقل ۶ حرف را وارد کنید'
    // }).max(15, {
    //     message: 'حداکثر ۱۵ حرف را وارد کنید'
    // }),
    phone: z.string().regex(phoneRegExp, 'یک شماره تلفن معتبر وارد کنید'),
    // phone: z.string().refine(validator.isMobilePhone, 'یک شماره تلفن معتبر وارد کنید'),
    // phone: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'از حروف غیر مجاز استفاده شده است')),

    // password: z.string().min(6, {
    //     message: 'حداقل ۶ حرف را وارد کنید'
    // }).max(15, {
    //     message: 'حداکثر ۱۵ حرف را وارد کنید'
    // })
})
export type TLoginPhoneSchema = z.infer<typeof LoginPhoneSchema>

export const LoginSmsSchema = z.object({
    // phone: z.string().min(6, {
    //     message: 'حداقل ۶ حرف را وارد کنید'
    // }).max(15, {
    //     message: 'حداکثر ۱۵ حرف را وارد کنید'
    // }),
    phone: z.string().regex(phoneRegExp, 'یک شماره تلفن معتبر وارد کنید'),
    // phone: z.string().refine(validator.isMobilePhone, 'یک شماره تلفن معتبر وارد کنید'),
    // phone: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'از حروف غیر مجاز استفاده شده است')),

    verifyPKey: z.string().regex(smsRegExp, 'یک شماره معتبر وارد کنید'),
})
export type TLoginSmsSchema = z.infer<typeof LoginSmsSchema>

export const LoginUsernameSchema = z.object({
    username: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    })
    // }).regex(new RegExp("^[a-zA-Z]+$", 'از حروف غیر مجاز استفاده شده است'))
    ,
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    })
})
export type TLoginUsernameSchema = z.infer<typeof LoginUsernameSchema>

export const RegisterUserSchema = z.object({
    email: z.string().email({
        message: 'ایمیل را به صورت صحیح وارد کنید'
    }),
    username: z.string().min(8, {
        message: 'نام کاربری باید بیشتر از ۸ حرف باشد'
    }).max(30, {
        message: 'نام کاربری باید کمتر از ۳۰ حرف باشد'
        // }),
    }).regex(new RegExp("^[a-zA-Z0-9]+$"), 'از حروف غیر مجاز استفاده شده است'),
    // }).regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'از حروف غیر مجاز استفاده شده است')),
    // }).regex(new RegExp(/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/, 'از حروف غیر مجاز استفاده شده است')),
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    }),
    phone: z.string().regex(phoneRegExp, 'یک شماره تلفن معتبر وارد کنید'),
    // phone: z.string().refine(validator.isMobilePhone, 'یک شماره تلفن معتبر وارد کنید'),
    //  phone: z.string().min(10, {
    //     message: 'حداقل ۱۰ رقم را وارد کنید'
    // }).max(10, {
    //     message: 'حداکثر ۱۰ رقم را وارد کنید'
    // }),
    verifyPhone: z.boolean().default(false),
    verifyMail: z.boolean().default(false),
    role: z.string().default('0'),
    payment: z.string().optional(),
    image: z.string().optional(),
})
export type TRegisterUserSchema = z.infer<typeof RegisterUserSchema>

export const RegisterUserFormSchema = z.object({
    email: z.string().email({
        message: 'ایمیل را به صورت صحیح وارد کنید'
    }),
    username: z.string().min(8, {
        message: 'نام کاربری باید بیشتر از ۸ حرف باشد'
    }).max(30, {
        message: 'نام کاربری باید کمتر از ۳۰ حرف باشد'
    }).regex(new RegExp("^[a-zA-Z0-9]+$"), 'از حروف غیر مجاز استفاده شده است'),
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    }),
    confirmPassword: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    }),
    phone: z.string().regex(phoneRegExp, 'یک شماره تلفن معتبر وارد کنید'),
    // phone: z.string().regex(new RegExp("/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/", 'از حروف غیر مجاز استفاده شده است')),
    // phone: z.string().refine(validator.isMobilePhone, 'یک شماره تلفن معتبر وارد کنید'),
    // phone: z.string().min(10, {
    //     message: 'حداقل ۱۰ رقم را وارد کنید'
    // }).max(10, {
    //     message: 'حداکثر ۱۰ رقم را وارد کنید'
    // }),
    verifyPhone: z.boolean().default(false),
    verifyMail: z.boolean().default(false),
    role: z.string().default('0'),
    payment: z.string().optional(),
    image: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "گذرواژه ها یکسان نیستند",
    path: ["confirmPassword"]
})
// }).refine(
//     (values) => {
//         return values.password === values.confirmPassword;
//     },
//     {
//         message: "گذرواژه ها یکسان نیستند",
//         path: ["confirmPassword"],
//     }
// )
export type TRegisterUserFormSchema = z.infer<typeof RegisterUserFormSchema>

/* AuthSchema */

/* UserSchema */

export const UserSchema = z.object({
    _id: z.string().uuid(),
    email: z.string().email({
        message: 'ایمیل را به صورت صحیح وارد کنید'
    }),
    username: z.string().min(8, {
        message: 'نام کاربری باید بیشتر از ۸ حرف باشد'
    }).max(30, {
        message: 'نام کاربری باید کمتر از ۳۰ حرف باشد'
    }),
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    }),
    phone: z.string().regex(phoneRegExp, 'یک شماره تلفن معتبر وارد کنید'),
    displayName: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    verifyPhone: z.boolean().default(false),
    verifyPKey: z.string(),
    verifyMail: z.boolean().default(false),
    verifyMKey: z.date(),
    role: z.string().default('0'),
    payment: z.string().optional(),
    image: z.string().optional(),
    basketId: z.string().cuid().optional(),
    accessToken: z.string()
})
export type TUserSchema = z.infer<typeof UserSchema>

export interface Methods {
    comparePassword(password: string): Promise<boolean>
}

const SessionExp = z.object({
    iat: z.number(),
    exp: z.number()
})

export const SessionType = UserSchema.merge(SessionExp)
export type TSessionType = z.infer<typeof SessionType>

/* UserSchema */

export const SettingSchema = z.object({
    salary: z.string(),
    time: z.string()
})
export type TSettingSchema = z.infer<typeof SettingSchema>

export const updateSettingSchema = z.object({
    _id: z.string(),
    name: z.string(),
    propertys: z.array(z.object({ name: z.string(), values: z.array(z.string()) }))
})
export type TUpdateSettingSchema = z.infer<typeof updateSettingSchema>

export const activeUser = z.object({
    jwtUserId: z.enum(['userNotExist', 'alreadyActivated', 'success']),
})
export type TActiveUserSchema = z.infer<typeof activeUser>

/* email */

export const sendMail = z.object({
    to: z.string(),
    subject: z.string(),
    body: z.string()
})
export type TSendMailSchema = z.infer<typeof sendMail>

export const ForgetPass = z.object({
    email: z.string().email({
        message: 'ایمیل را به صورت صحیح وارد کنید'
    })
})
export type TForgetPassSchema = z.infer<typeof ForgetPass>

export const ResetPass = z.object({
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    }),
    confirmPassword: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "گذرواژه ها یکسان نیستند",
    path: ["confirmPassword"]
})
export type TResetPassSchema = z.infer<typeof ResetPass>

/* category */

export const CategorySchema = z.object({
    _id: z.string().uuid(),
    name: z.string(),
    latinName: z.string(),
    slug: z.string(),
    colorIcon: z.string().optional(),
    icon: z.string().optional(),
    images: z.string().optional(),
    type: z.boolean().optional().default(false),
    parent: z.string().uuid().optional(),
    author: z.string().uuid().optional(),
    propertys: z.array(z.string()).optional()
    // propertys: z.array(z.object({ name: z.string(), values: z.string() })).optional()

})
export type TCategorySchema = z.infer<typeof CategorySchema>

export const RegisterCategorySchema = z.object({
    name: z.string().min(4, {
        message: 'حداقل ۴ حرف را وارد کنید'
    }),
    latinName: z.string().min(4, {
        message: 'حداقل ۴ حرف را وارد کنید'
    }),
    slug: z.string().optional(),
    colorIcon: z.string().optional(),
    icon: z.string().optional(),
    images: z.string().optional(),
    type: z.boolean().optional(),
    parent: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.string()).optional()
}).superRefine((data, ctx) => {
    if (data.latinName) {
        data.slug = slugify(data.latinName, {
            replacement: '_',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'fa',      // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
        })
        // data.slug = data.latinName.replace(/\ /g, '_')
    }
})
export type TRegisterCategorySchema = z.infer<typeof RegisterCategorySchema>

export const CategoryOptionSchema = z.object({
    _id: z.string().uuid(),
    parent: z.string().uuid(),
    propertys: z.array(z.string())
})
export type TCategoryOptionSchema = z.infer<typeof CategoryOptionSchema>

export const GallerySchema = z.object({
    _id: z.string().uuid(),
    type: z.string(),
    author: z.string().uuid().optional(),
    url: z.string()
})
export type TGallerySchema = z.infer<typeof GallerySchema>

export const RegisterGallerySchema = z.object({
    type: z.string(),
    author: z.string(),
    url: z.string()
})
export type TRegisterGallerySchema = z.infer<typeof RegisterGallerySchema>

