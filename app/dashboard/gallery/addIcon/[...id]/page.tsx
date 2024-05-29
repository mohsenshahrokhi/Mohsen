import React from 'react'
import CategoryForm from "@/components/adminComponent/Categories/CategoryForm"

import Link from 'next/link'
import { HiMiniPlus, HiOutlinePencilSquare, HiOutlinePhoto, HiOutlineTrash } from 'react-icons/hi2'
// import { Tooltip } from 'react-tooltip'
// import TERipple from '@/components/ui/components/Ripple/Ripple'
// import TEMModal from '@/components/ui/components/Modal/TEMModal'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import { CAT, GalleryInfoProps } from '@/type'
// import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
// import HModal from "@/components/ui/components/Modal2/confirmModal";
// import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
// import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import Image from 'next/image'
import queryString from 'query-string'
import { TGallerySchema } from '@/ZSchemas'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { verifyJwt } from '@/lib/jwt'
import { getAllGallerys } from '@/actions/gallery'
import { Box, Button, Checkbox } from '@mui/material'
import Lootti from '@/components/publicComponents/Lootti'
import dynamic from 'next/dynamic'
import AddIcon from '@mui/icons-material/Add'
import { skip } from 'node:test'
import GalleryBase from '@/components/adminComponent/Gallery/GalleryBase'
import Pagination from '@/components/adminComponent/Pagination'

type Props = {
    params: {
        id: string
    }
    searchParams: { [key: string]: string | string[] | undefined }
}
type Data = {
    gallerys: TGallerySchema[]
    success: boolean
    qtt: number
}
async function getData({ page, perPage, accessToken }: { page: number, perPage: number, accessToken: string }) {

    const params = {
        // parent: 'null'
        limit: perPage,
        skip: perPage * (page - 1)
    }

    const stringifyParams = queryString.stringify(params)

    const gallerys = await getAllGallerys({ stringifyParams, accessToken })

    return gallerys as Data

}

async function Gallery({ params, searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    let page = parseInt(searchParams.page as string || '1', 10)
    delete searchParams.page
    const stringified = queryString.stringify(searchParams)
    page = !page || page < 1 ? 1 : page
    const perPage = 10

    const { gallerys, success, qtt } = await getData({ page: page, perPage: perPage, accessToken: accessToken! })
    const totalPage = Math.ceil(qtt / perPage)
    const outOfRange = page > totalPage

    const pageNumber = []
    const offsetPage = 3

    for (let i = page - offsetPage; i <= page + offsetPage; i++) {
        if (i >= 1 && i <= totalPage) pageNumber.push(i)
    }

    const catId = params.id[0]
    const catProperty = searchParams.catProperty as 'colorIcon' | 'icon' | 'images' | undefined
    // const router = useRouter()
    // console.log(catProperty);

    // const [gallery, setGallery] = useState<TGallerySchema[]>([])
    // const [isOpen, setIsOpen] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    // const [selected, setSelected] = useState<string[]>([])

    // const { data: session } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         router.push('/login')
    //     },
    // })

    // const accessToken = session?.user && session?.user?.accessToken || ''

    // const getAllGallery = useCallback(async () => {
    //     const parsed = {

    //     }
    //     const stringified = queryString.stringify(parsed);
    //     accessToken && await axios.get(`/api/gallery?${stringified}`, {
    //         headers: {
    //             Authorization: `${accessToken}`
    //         }
    //     }).then(response => {
    //         const cats = response.data.gallerys
    //         setGallery(cats)
    //     })
    // }, [accessToken])

    // useEffect(() => {
    //     getAllGallery()
    // }, [getAllGallery])

    // function handleSelected(image: string) {
    //     let newForm = [...selected]
    //     if (newForm.includes(image)) {
    //         const oldImg = newForm.filter(old => old !== image)
    //         newForm = oldImg
    //     } else {
    //         newForm.push(image)
    //     }
    //     setSelected(newForm)
    // }

    // function closeModal() {
    //     setIsOpen(false)
    //     setSelected([])
    // }

    // async function deleteP() {
    //     // selected.map((id) => {

    //     await axios.get('/api/gallery/', {
    //         params: {
    //             IDs: selected
    //         }
    //     })
    //     // })
    //     setIsOpen(false)
    // }

    // console.log(gallerys);

    const imageSvgContainer = (image: TGallerySchema) => {
        return (
            <Box
                component={'div'}
                className=" flex text-center justify-center"
            >
                <Box
                    component={'div'}
                    className="flex flex-col border"
                >
                    <Box
                        component={'div'}
                        className="p-2 md:flex-shrink-0"
                    >

                        <Box
                            component={'div'}
                            className="relative overflow-hidden bg-cover bg-no-repeat"
                        >
                            < Image
                                src={`/uploads/${image.type}/${image.url}`}
                                width="148"
                                height="199"
                                priority={true}
                                alt={'galler'}
                                className="rounded-lg"
                            />
                            <Box
                                component={'div'}
                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></Box>
                            <Box
                                component={'div'}
                                className=' absolute right-1 top-1'
                            >
                                <Checkbox
                                    id={image._id}
                                    checked={false}
                                // setCheck={() => handleSelected(galler.url)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }

    const videoContainer = (image: TGallerySchema, key: string) => {


        return (
            <Box
                key={key}
                component={'div'}
                className=" flex text-center justify-center"
            >
                <Box
                    component={'div'}
                    className="flex flex-col border"
                >
                    <Box
                        component={'div'}
                        className="p-2 md:flex-shrink-0"
                    >

                        <Box
                            component={'div'}
                            className="relative overflow-hidden bg-cover bg-no-repeat"
                        >

                            <video autoPlay muted loop className=" flex h-20 w-20 object-cover fixed">
                                <source type={image.type} src={`./uploads/${image.type}/${image.url}`} />
                            </video>
                            <Box
                                component={'div'}
                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></Box>
                            <Box
                                component={'div'}
                                className=' absolute right-1 top-1'
                            >
                                {/* <Checkbox
                                                                    id={galler._id}
                                                                    checked={false}
                                                                    setCheck={() => handleSelected(galler.url)}
                                                                />  */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }

    const svgContainer = async (image: TGallerySchema) => {
        console.log('path:', `./public/uploads/${image.type}/${image.url}`);
        // const DynamicComponent = dynamic(() => import(`@/public/uploads/${image.type}/${image.url}`));

        // const { default: data } = await import(`@/public/uploads/${image.type}/${image.url}`, { assert: { type: "json" } });
        return (
            <Box
                component={'div'}
                className=" flex text-center justify-center"
            >
                {/* {<DynamicComponent />} */}
                <Box
                    component={'div'}
                    className="flex flex-col border"
                >
                    <Box
                        component={'div'}
                        className="p-2 md:flex-shrink-0"
                    >

                        <Box
                            component={'div'}
                            className="relative overflow-hidden bg-cover bg-no-repeat"
                        >
                            <Lootti
                                animationData={`./public/uploads/${image.type}/${image.url}`}
                                loop={true}
                            />
                            <Box
                                component={'div'}
                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></Box>
                            <Box
                                component={'div'}
                                className=' absolute right-1 top-1'
                            >
                                {/* <Checkbox
                                                                    id={galler._id}
                                                                    checked={false}
                                                                    setCheck={() => handleSelected(galler.url)}
                                                                />  */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }


    return (
        <Box
            component={'div'}
            className="flex flex-col w-full">
            {outOfRange ? (
                <Box
                    component={'div'}
                >
                    این صفحه وجود ندارد
                </Box>
            ) : (
                <Box
                    component={'section'}
                    className="flex relative overflow-y-auto flex-col w-full p-1 my-2">
                    <Box
                        component={'div'}
                        className="flex items-center justify-between">
                        <Box
                            component={'h2'}
                            className="text-lg font-medium ">
                            فایل های بارگذاری شده
                        </Box>
                        {/* <HModal
                        open={isOpen}
                        close={closeModal}
                        title='حذف عکس'
                        body='آیا از حذف موارد انتخاب شده اطمینان دارید'
                    >
                        <div
                            className=" flex w-full justify-around items-center">
                       
                                <button
                                    onClick={closeModal}
                                    className=" bg-slate-300 text-center justify-center items-center text-slate-600 py-1 px-4 rounded shadow-sm">خیر</button>
                       
                            <button
                                onClick={deleteP}
                                className="text-slate-100 py-1 px-4 rounded shadow-sm bg-red-600 text-center justify-center items-center">
                                {!isLoading ? <span>بله حذف شود</span> : <span>Deleting...</span>}
                            </button>

                        </div>
                    </HModal> */}
                        {/* {selected.length > 0 && <button
                        name='colorIcon'
                        onClick={() => setIsOpen(true)}
                    >
                        انتخاب عکس
                    </button>} */}
                        <Box component={'div'} className="flex items-center">
                            <Button
                                size="medium"
                                variant="contained"
                                color="info"
                                aria-label="add"
                            >
                                <Link
                                    href={`/dashboard/gallery/addFile?${stringified}`}
                                >
                                    <Box component={'span'}>بارگذاری فایل جدید</Box>
                                    <AddIcon sx={{ ml: 1 }} />
                                </Link>
                            </Button>

                        </Box>
                    </Box>

                    <GalleryBase
                        gallery={gallerys}
                        searchParams={stringified}
                        catId={catId}
                        catProperty={catProperty}
                    />

                    <Pagination
                        page={page}
                        stringified={stringified}
                        totalPage={totalPage}
                    />
                </Box>
            )}

        </Box >
    )
}

export default Gallery