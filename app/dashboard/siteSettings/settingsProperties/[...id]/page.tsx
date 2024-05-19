import { TCategorySchema } from '@/ZSchemas'
import { getCat, getCategories } from '@/actions/category'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import BasicModal from '@/components/ui/BasicModal'
import { verifyJwt } from '@/lib/jwt'
import { Box, Button } from '@mui/material'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import queryString from 'query-string'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import Image from "next/image"

type Props = {
    params: {
        id: string[] | string
    },
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getData(catId: string, accessToken: string) {

    const params = {
        parent: catId,
        // populate: 'icon.url,colorIcon.url'
    }
    const stringifyParams = queryString.stringify(params)
    const exist = await getCategories({ stringifyParams, accessToken })
    return exist
}

async function getCatData(catId: string) {
    const category = await getCat(catId)
    return category
}

async function DeleteCat({ params, searchParams }: Props) {
    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null
    // const categories: TCategorySchema[] = []
    // const categories = await getData(params.id.slice(-1)[0], accessToken!)
    const stringifyParams = queryString.stringify(searchParams)

    const { success } = await getData(params.id.slice(-1)[0], accessToken!)
    const { category } = await getCatData(params.id.slice(-1)[0])


    return (
        <Box className='w-full items-center justify-between'>
            <Box
                className=' flex flex-col w-full items-center justify-center'
            >
                <Box
                    component={'div'}
                    className=' flex flex-col w-full justify-start items-center p-2 mb-4'
                >
                    <Box
                        component={'span'}
                        className=' flex w-full items-center justify-center my-4'
                    >
                        {category.name}
                    </Box>
                    <Box
                        component={'div'}
                        className=' flex flex-col w-full justify-between items-center py-3'
                    >
                        <Box
                            component={'div'}
                            className=' flex w-full justify-around mb-5 items-center py-3'
                        >
                            {!category.icon ? (<Button
                                id='icon'
                                size="medium"
                                variant="outlined"
                                color="secondary"
                                aria-label="add"
                            >
                                <Link
                                    href={`/dashboard/gallery/addIcon/${category?._id}?catProperty=icon&${stringifyParams}`}
                                >
                                    اضافه کردن ایکون سیاه و سفید
                                    <AddIcon sx={{ ml: 1 }} />
                                </Link>
                            </Button>) : (
                                <Box
                                    component={'div'}
                                    className="relative overflow-hidden bg-cover bg-no-repeat"
                                >
                                    <Box
                                        component={'p'}
                                        className=' flex mb-3 p-2'
                                    >
                                        ایکون سیاه و سفید
                                    </Box>
                                    < Image
                                        src={`/uploads/${category.icon}`}
                                        width="100"
                                        height="100"
                                        priority={true}
                                        alt={category.name}
                                        className="rounded-lg"
                                    />
                                </Box>
                            )}
                            {!category.colorIcon ? (<Button
                                id='colorIcon'
                                size="medium"
                                variant="outlined"
                                color="secondary"
                                aria-label="add"
                            >
                                <Link
                                    href={`/dashboard/gallery/addIcon/${category?._id}?catProperty=colorIcon&${stringifyParams}`}
                                >
                                    اضافه کردن آیکون رنگی
                                    <AddIcon sx={{ ml: 1 }} />
                                </Link>
                            </Button>) : (
                                <Box
                                    component={'div'}
                                    className="relative overflow-hidden bg-cover bg-no-repeat"
                                >
                                    <Box
                                        component={'p'}
                                        className=' flex mb-3 p-2'
                                    >
                                        آیکون رنگی
                                    </Box>
                                    < Image
                                        src={`/uploads/${category.colorIcon}`}
                                        width="100"
                                        height="100"
                                        priority={true}
                                        alt={category.name}
                                        className="rounded-lg"
                                    />
                                </Box>
                            )}
                        </Box>

                        {!category.images ? <Button
                            id='images'
                            size="medium"
                            variant="outlined"
                            color="secondary"
                            aria-label="add"
                        >
                            <Link
                                href={`/dashboard/gallery/addIcon/${category?._id}?catProperty=images&${stringifyParams}`}
                            >
                                اضافه کردن آلبوم عکس
                                <AddIcon sx={{ ml: 1 }} />
                            </Link>
                        </Button> : (
                            <Box
                                className=' flex flex-col w-full justify-between items-center h-1/3'
                            >
                                <Box
                                    className='flex flex-col w-full h-20 justify-center items-center'
                                    component={'p'}
                                >
                                    آلبوم عکس این زیر دسته
                                </Box>
                                <Box
                                    component={'div'}
                                    className=' flex w-full justify-start gap-3 p-3 items-center'
                                >
                                    {
                                        category.images.map((img) => (
                                            <Box
                                                key={img}
                                                className=' flex w-32 h-32 border-gray-400 shadow-lg items-center justify-center'
                                                component={'div'}
                                            >
                                                < Image
                                                    src={`/uploads/${img}`}
                                                    width="100"
                                                    height="100"
                                                    priority={true}
                                                    alt={category.name}
                                                    className="rounded-lg w-32 h-32 flex"
                                                />
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DeleteCat