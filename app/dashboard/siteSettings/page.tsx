import { TCategorySchema } from '@/ZSchemas'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAllCategory } from '@/lib/controllers/categoryController'
import { verifyJwt } from '@/lib/jwt'
import Fab from '@mui/material/Fab'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box, Grid, Tooltip } from '@mui/material'
import { getAllCategoryOption } from '@/lib/controllers/categoryOptionController'
import CatList from '@/components/adminComponent/Categories/CatList'
import queryString from 'query-string'
import { getCategories } from '@/actions/category'
import CloseIcon from '@mui/icons-material/Close'
import EditNoteIcon from '@mui/icons-material/EditNote'
import PreviewIcon from '@mui/icons-material/Preview'

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
                        <Box
                            key={cat._id}
                            className=' flex gap-3 h-full w-full justify-between border rounded-md p-3 border-gray-300'>
                            {cat.name}

                            <Box className='flex gap-3'>

                                <Tooltip title={`ویرایش ${cat.name}`} placement="top">
                                    <Link
                                        href={``}
                                    >
                                        {/* <Fab color="error" size="small" aria-label="add"> */}
                                        <EditNoteIcon color="info" />
                                        {/* </Fab> */}
                                    </Link>
                                </Tooltip>
                                <Tooltip title={`حذف ${cat.name}`} placement="top">
                                    <Link
                                        href={``}
                                    >
                                        {/* <Fab color="error" size="small" aria-label="add"> */}
                                        <CloseIcon color="error" />
                                        {/* </Fab> */}
                                    </Link>
                                </Tooltip>

                                <Tooltip title={`زیر شاخه های ${cat.name}`} placement="top">
                                    <Link
                                        href={`siteSettings/${encodeURIComponent(cat._id)}`}
                                    >
                                        {/* <Fab color="info" size="small" aria-label="add"> */}
                                        <PreviewIcon color='info' />
                                        {/* </Fab> */}
                                    </Link>
                                </Tooltip>
                            </Box>


                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default SiteSettings