
import { useSession } from "next-auth/react"
import Image from "next/image"
import queryString from 'query-string'
import { TGallerySchema } from '@/ZSchemas'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { verifyJwt } from '@/lib/jwt'
import { getAllGallerys } from '@/actions/gallery'
import { HiOutlineArrowUpTray } from "react-icons/hi2"
import GalleryForm from "@/components/adminComponent/Gallery/GalleryForm"
import { Box } from "@mui/material"

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

async function Gallery({ searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null
    const stringified = queryString.stringify(searchParams)
    // const [galleryInfo, setGalleryInfo] = useState<GalleryInfoProps>()

    // const [images, setImages] = useState<File[]>([])
    // const [uploading, setUploading] = useState(false)



    function onChange(e: React.ChangeEvent<HTMLInputElement>) {

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
    }

    return (
        <Box>

            <GalleryForm add={false} />

        </Box>
    )
}

export default Gallery