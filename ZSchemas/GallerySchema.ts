import * as z from 'zod'

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