'use client';
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { createGallery } from "@/actions/gallery";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
function GalleryForm({ img, add }) {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    });
    const user = session === null || session === void 0 ? void 0 : session.user;
    const accessToken = (user === null || user === void 0 ? void 0 : user.accessToken) || '';
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    async function handleSubmit(image) {
        image.preventDefault();
        const formData = new FormData();
        images.forEach((image) => {
            formData.append(image.name, image);
        });
        setUploading(true);
        const upload = await createGallery({ image: formData, accessToken });
        if (upload.success === true) {
            HandleEnqueueSnackbar({ variant: 'success', msg: upload.msg });
            router.push('/dashboard/gallery');
        }
        else {
            HandleEnqueueSnackbar({ variant: 'error', msg: upload.msg });
        }
        setUploading(false);
    }
    function onChange(e) {
        if (e.target.files) {
            // convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }
    }
    return (<Box component="div" sx={{ m: '2px', width: '100%', justifyContent: 'center' }}>
            <Box component={'div'} sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gap: 2,
            width: '100%'
        }}>
                <form onSubmit={handleSubmit}>

                    <div className=' flex flex-col'>
                        <label className=" flex mb-2 text-sm font-medium text-gray-900 dark:text-white">آلبوم عکس محصول</label>
                        <label className=" cursor-pointer w-24 h-24 flex flex-col p-1 border-2 justify-center items-center text-sm text-center border-sky-300 bg-sky-600 rounded-lg text-white">
                            <HiOutlineArrowUpTray size={24}/>
                            بارگذاری
                            <input accept="image/*,application/*,video/*" onChange={onChange} type="file" multiple required name="image" className=" hidden"/>
                        </label>
                        <div className=" flex gap-2 justify-between items-center w-full h-full my-2">
                            <div className=" flex gap-2 my-2">
                                {images.map((image) => {
            const src = URL.createObjectURL(image);
            return (<div className="relative aspect-video col-span-4" key={image.name}>
                                            <Image src={src} alt={image.name} width={220} height={150} priority={true}/>
                                        </div>);
        })}
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" color="info" type="submit" className=" flex px-2 py-3 rounded-md bg-sky-700 text-white">
                        {uploading ? <span>در حال بارگذاری ...</span> : <span>بارگذاری</span>}
                    </Button>
                </form>
            </Box>
        </Box>);
}
export default GalleryForm;
//# sourceMappingURL=GalleryForm.js.map