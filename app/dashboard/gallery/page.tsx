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
import Image from 'next/image'
// import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
// import HModal from "@/components/ui/components/Modal2/confirmModal";
// import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
// import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
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

type Props = {
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

async function Gallery({ searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null
    const newSerchParams = ''
    // searchParams.delete('page')
    let page = parseInt(searchParams.page || '1', 10)
    delete searchParams.page
    const stringified = queryString.stringify(searchParams)
    page = !page || page < 1 ? 1 : page
    const perPage = 10

    const prevPage = `?page=${page - 1 > 0 ? page - 1 : 1}&${stringified}`
    const nextPage = `?page=${page + 1}&${stringified}`

    const { gallerys, success, qtt } = await getData({ page: page, perPage: perPage, accessToken: accessToken! })
    const totalPage = Math.ceil(qtt / perPage)
    const outOfRange = page > totalPage

    const pageNumber = []
    const offsetPage = 3

    for (let i = page - offsetPage; i <= page + offsetPage; i++) {
        if (i >= 1 && i <= totalPage) pageNumber.push(i)
    }

    // const router = useRouter()
    console.log(searchParams);

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

                    <Box component={'div'} className="flex flex-col mt-2">
                        <Box component={'div'} className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <Box component={'div'} className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <Box component={'div'} className=" grid grid-cols-4 md:grid-cols-12 p-5 gap-2 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    {gallerys.length > 0 && gallerys.map((galler) => (
                                        <>
                                            {galler.type === 'image/svg+xml' &&
                                                imageSvgContainer(galler)
                                            }
                                        </>
                                    ))}

                                    {gallerys.length > 0 && gallerys.map((galler) => (
                                        <>
                                            {(galler.type === 'image/jpeg' || galler.type === 'image/png') &&
                                                imageSvgContainer(galler)
                                            }
                                        </>
                                    ))}

                                    {/* {gallerys.length > 0 && gallerys.map((galler) => (
                                    <>
                                        {galler.type === 'video/mp4' &&
                                            videoContainer(galler, galler._id)
                                        }
                                    </>
                                ))} */}

                                    {/* {gallerys.length > 0 && gallerys.map((galler) => (
                                    <div key={galler._id}>
                                        {galler.type === 'application/json' &&
                                            svgContainer(galler)
                                        }
                                    </div>
                                ))} */}

                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box component={'div'} className="flex items-center justify-between mt-6">
                        {page === 1 ? (
                            <Box
                                component={'div'}
                                aria-disabled={true}
                                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>

                                <Box component={'span'}>
                                    قبلی
                                </Box>
                            </Box>
                        ) : (
                            <Link
                                href={`${prevPage}`}
                                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>

                                <Box component={'span'}>
                                    قبلی
                                </Box>
                            </Link>)}


                        <Box component={'div'} className="items-center hidden md:flex gap-x-3">
                            {pageNumber.map((p, index) => (

                                <Link
                                    key={index}
                                    href={`?page=${p}&${stringified}`}
                                    className={`px-2 py-1 text-sm  rounded-md ${page === p ? 'bg-blue-500 text-white' : 'bg-blue-100/60 text-blue-500'} `}
                                >{p}</Link>
                            ))}
                            {/* <Link href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</Link>
                            <Link href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</Link>
                            <Link href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</Link>
                            <Link href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</Link>
                            <Link href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</Link>
                            <Link href="#" className="px-2 py-1 text-sm  dark:hover:bg-gray-800  hover:bg-gray-100">14</Link> */}
                        </Box>
                        {page === totalPage ? (
                            <Box
                                component={'div'}
                                aria-disabled={true}
                                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                <Box component={'span'}>
                                    بعدی
                                </Box>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </Box>
                        ) : (
                            <Link
                                href={`${nextPage}`}
                                className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                <Box component={'span'}>
                                    بعدی
                                </Box>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </Link>)}
                    </Box>
                </Box>
            )}

        </Box >
    )
}

export default Gallery