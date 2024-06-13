import React from 'react'

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
import { TGallerySchema } from '@/ZSchemas/GallerySchema'

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
    // const verify = accessToken && verifyJwt(accessToken) || null
    // searchParams.delete('page')
    let page = parseInt(searchParams.page || '1', 10)
    delete searchParams.page
    const stringified = queryString.stringify(searchParams)
    page = !page || page < 1 ? 1 : page
    const perPage = 10

    const { gallerys, qtt } = await getData({ page: page, perPage: perPage, accessToken: accessToken! })
    const totalPage = Math.ceil(qtt / perPage)
    const outOfRange = page > totalPage

    // const router = useRouter()
    // console.log(imageType);

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
                    />

                    <Pagination
                        page={page}
                        stringified={stringified}
                        totalPage={totalPage}
                    />

                </Box>
            )
            }

        </Box >
    )
}

export default Gallery