import { TCategorySchema } from '@/ZSchemas'
import { getCatById, getCategories } from '@/actions/category'
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
import PropertiesDetile from '@/components/adminComponent/Categories/PropertiesDetile'

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
    const category = await getCatById(catId)
    return category
}

async function CatProperties({ params, searchParams }: Props) {
    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null
    // const categories: TCategorySchema[] = []
    // const categories = await getData(params.id.slice(-1)[0], accessToken!)
    const stringifyParams = queryString.stringify(searchParams)

    // const { success } = await getData(params.id.slice(-1)[0], accessToken!)
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
                    <PropertiesDetile category={category} stringifyParams={stringifyParams} />
                </Box>
            </Box>
        </Box>
    )
}

export default CatProperties