import queryString from 'query-string';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { verifyJwt } from '@/lib/jwt';
import GalleryForm from "@/components/adminComponent/Gallery/GalleryForm";
import { Box } from "@mui/material";
async function Gallery({ searchParams }) {
    const session = await getServerSession(authOptions);
    const accessToken = session === null || session === void 0 ? void 0 : session.user.accessToken;
    const verify = accessToken && verifyJwt(accessToken) || null;
    const stringified = queryString.stringify(searchParams);
    // const [galleryInfo, setGalleryInfo] = useState<GalleryInfoProps>()
    // const [images, setImages] = useState<File[]>([])
    // const [uploading, setUploading] = useState(false)
    function onChange(e) {
        //     if (e.target.files) {
        //         // convert `FileList` to `File[]`
        //         const _files = Array.from(e.target.files);
        //         setImages(_files);
        //     }
    }
    // useEffect(() => {
    //     axios.get(`/api/product/`).then((response) => {
    //         setGalleryInfo(response.data.product)
    //     })
    // }, [])
    const handleSubmit = async () => {
        //     e.preventDefault()
        //     const formData = new FormData()
        //     images.forEach((image, i) => {
        //         formData.append(image.name, image)
        //     });
        //     // console.log(formData);
        //     setUploading(true)
        //     await axios.post("/api/gallery/", formData,
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //                 Authorization: `${accessToken}`
        //             }
        //         }
        //     )
        //     setUploading(false)
        //     router.push('/dashboard/gallery')
    };
    return (<Box>

            <GalleryForm add={false}/>

        </Box>);
}
export default Gallery;
//# sourceMappingURL=page.js.map