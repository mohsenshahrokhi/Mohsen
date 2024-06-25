'use server';
import { deleteCategory } from "@/lib/controllers/categoryController";
import { createGalleryImages, getAllGallery, getGalleryById } from "@/lib/controllers/galleryController";
import { verifyJwt } from "@/lib/jwt";
import { existsSync, mkdirSync, writeFileSync } from "fs";
export const getAllGallerys = async ({ stringifyParams, accessToken }) => {
    const verify = accessToken && verifyJwt(accessToken) || null;
    if (accessToken && (verify === null || verify === void 0 ? void 0 : verify.role) === '2') {
        let gallerys;
        gallerys = await getAllGallery(stringifyParams);
        return { success: gallerys.qtt > 0, gallerys: gallerys.gallery, qtt: gallerys.qtt };
    }
    else {
        return { success: false };
    }
};
export const createGallery = async ({ image, accessToken }) => {
    const verify = accessToken && verifyJwt(accessToken) || null;
    if (accessToken && (verify === null || verify === void 0 ? void 0 : verify.role) === '2') {
        const entryValues = Array.from(image);
        for (const formDataEntryValue of entryValues) {
            const file = formDataEntryValue[1];
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const newUrl = `${Date.now()}@${formDataEntryValue[0].trim().replace(/[&\// /\\#,+()$~%@'":*?<>{}]/g, '')}`;
            if (!existsSync(`public/uploads/${file.type}`)) {
                console.log('path:', `public/uploads/${file.type}`);
                mkdirSync(`public/uploads/${file.type}`, { recursive: true });
            }
            writeFileSync(`public/uploads/${file.type}/${newUrl}`, buffer);
            await createGalleryImages({ url: newUrl, author: verify._id, type: file.type });
        }
        return {
            success: true,
            msg: 'بارگذاری با موفقیت انجام شد !'
        };
    }
    else {
        return {
            success: false,
            msg: 'بارگذاری انجام نشد !'
        };
    }
};
export const updateImgGallery = async ({ image, accessToken }) => {
    // const validatedFields = RegisterGallerySchema.safeParse(values)
    const verify = accessToken && verifyJwt(accessToken) || null;
    if (accessToken && (verify === null || verify === void 0 ? void 0 : verify.role) === '2') {
        const entryValues = Array.from(image);
        for (const formDataEntryValue of entryValues) {
            const file = formDataEntryValue[1];
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const newUrl = `${Date.now()}@${formDataEntryValue[0].trim().replace(/[&\// /\\#,+()$~%@'":*?<>{}]/g, '')}`;
            await writeFileSync(`public/uploads/images/${newUrl}`, buffer);
            await createGalleryImages({ url: newUrl, author: verify._id });
            return {
                success: true,
                msg: 'حساب کاربری با موفقیت ایجاد شد'
            };
        }
        return {
            success: false,
            msg: 'حساب کاربری با موفقیت ایجاد نشد'
        };
    }
    else {
        return {
            success: false,
            msg: 'شما دسترسی های لازم را ندارید !'
        };
    }
};
export const getImage = async (_id) => {
    const category = await getGalleryById(_id);
    return { success: true, category };
};
export const deleteCat = async ({ id, accessToken }) => {
    const verify = accessToken && verifyJwt(accessToken) || null;
    if (accessToken && (verify === null || verify === void 0 ? void 0 : verify.role) === '2') {
        const { acknowledged } = await deleteCategory(id);
        return {
            success: acknowledged ? true : false,
            msg: acknowledged ? 'دسته بندی با موفقیت حذف شد !' : 'دسته بندی با موفقیت حذف نشد !'
        };
    }
    else {
        return {
            success: false,
            msg: 'شما دسترسی های لازم را ندارید !'
        };
    }
};
//# sourceMappingURL=gallery.js.map