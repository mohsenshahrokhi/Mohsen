import { TCategorySchema } from '@/ZSchemas'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllCategory } from '@/lib/controllers/categoryController'
import { verifyJwt } from '@/lib/jwt'
import Fab from '@mui/material/Fab'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box, Grid } from '@mui/material'
import { getAllCategoryOption } from '@/lib/controllers/categoryOptionController'
import CatList from '@/components/adminComponent/Categories/CatList'
import queryString from 'query-string'
import { getCategories } from '@/actions/category'

async function getData(accessToken: string) {

    const params = {
        parent: 'null'
    }

    const stringifyParams = queryString.stringify(params)

    const { categories, success } = await getCategories({ stringifyParams, accessToken })
    // const category = await getAllCategory(stringifyParams)

    return categories as TCategorySchema[]

}

const parsed = {
    parent: '',
    cat: ''
}

async function SiteSettings() {
    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null

    // console.log('verify', verify)

    let categories: TCategorySchema[] = []
    if (verify) categories = await getData(accessToken!)

    return (
        <Box
            component="div"
            sx={{ m: '2px', width: '100%', justifyContent: 'center' }}
        >
            <Fab
                size="medium"
                variant="extended"
                color="secondary"
                aria-label="add"
            >
                <Link
                    href={`/dashboard/siteSettings/addSetting`}
                >
                    اضافه کردن ویژگی جدید
                    <AddIcon sx={{ ml: 1 }} />
                </Link>
            </Fab>

            <Box
                component={'div'}
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gap: 2,
                    m: 2,
                }}
            >
                {
                    categories && categories.length > 0 && categories.map((cat: TCategorySchema) => (
                        <Link
                            key={cat._id}
                            className=' h-full w-full text-center border rounded-md p-3 border-gray-300'
                            href={`siteSettings/${encodeURIComponent(cat._id)}`}
                        >
                            {cat.name}
                        </Link>
                    ))
                }
            </Box>
        </Box>
    )
}

export default SiteSettings