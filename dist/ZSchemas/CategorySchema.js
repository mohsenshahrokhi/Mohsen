import slugify from 'slugify';
import * as z from 'zod';
export const CategorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    latinName: z.string(),
    slug: z.string(),
    colorIcon: z.string().uuid().optional(),
    icon: z.string().uuid().optional(),
    images: z.array(z.string()).default([]),
    type: z.boolean().optional().default(false),
    parent: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.object({ name: z.string(), values: z.string() })).default([]).optional(),
    createdAt: z.date().optional()
});
export const EditCategorySchema = z.object({
    // _id: z.string(),
    name: z.string(),
    latinName: z.string(),
    slug: z.string(),
    colorIcon: z.string().optional(),
    icon: z.string().optional(),
    images: z.array(z.string()).default([]),
    type: z.boolean().optional().default(false),
    parent: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.object({ name: z.string(), values: z.string() })).default([]).optional()
});
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
    images: z.array(z.string()).optional(),
    type: z.boolean().default(false).optional(),
    parent: z.string().optional(),
    author: z.string().optional(),
    propertys: z.array(z.object({ name: z.string(), values: z.string() })).default([]).optional()
}).superRefine((data, ctx) => {
    if (data.latinName) {
        data.slug = slugify(data.latinName, {
            replacement: '_', // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true, // convert to lower case, defaults to `false`
            strict: false, // strip special characters except replacement, defaults to `false`
            locale: 'fa', // language code of the locale to use
            trim: true // trim leading and trailing replacement chars, defaults to `true`
        });
    }
});
//# sourceMappingURL=CategorySchema.js.map