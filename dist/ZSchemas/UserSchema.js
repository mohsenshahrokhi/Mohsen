import { z } from "zod";
const phoneRegExp = new RegExp(/^9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/);
const smsRegExp = new RegExp(/^\d{4}$/);
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
});
const SessionExp = z.object({
    id: z.string(),
    iat: z.number(),
    exp: z.number()
});
export const SessionType = UserSchema.merge(SessionExp);
export const SettingSchema = z.object({
    salary: z.string(),
    time: z.string()
});
export const updateSettingSchema = z.object({
    _id: z.string(),
    name: z.string(),
    propertys: z.array(z.object({ name: z.string(), values: z.array(z.string()) }))
});
export const activeUser = z.object({
    jwtUserId: z.enum(['userNotExist', 'alreadyActivated', 'success']),
});
/* email */
export const sendMail = z.object({
    to: z.string(),
    subject: z.string(),
    body: z.string()
});
export const ForgetPass = z.object({
    email: z.string().email({
        message: 'ایمیل را به صورت صحیح وارد کنید'
    })
});
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
});
export const LoginMailSchema = z.object({
    email: z.string().email({
        message: 'ایمیل را به صورت صحیح وارد کنید'
    }),
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    })
});
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
});
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
});
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
});
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
    password: z.string().min(6, {
        message: 'حداقل ۶ حرف را وارد کنید'
    }).max(15, {
        message: 'حداکثر ۱۵ حرف را وارد کنید'
    }),
    phone: z.string().regex(phoneRegExp, 'یک شماره تلفن معتبر وارد کنید'),
    verifyPhone: z.boolean().default(false),
    verifyMail: z.boolean().default(false),
    role: z.string().default('0'),
    payment: z.string().optional(),
    image: z.string().optional(),
});
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
    verifyPhone: z.boolean().default(false),
    verifyMail: z.boolean().default(false),
    role: z.string().default('0'),
    payment: z.string().optional(),
    image: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "گذرواژه ها یکسان نیستند",
    path: ["confirmPassword"]
});
//# sourceMappingURL=UserSchema.js.map