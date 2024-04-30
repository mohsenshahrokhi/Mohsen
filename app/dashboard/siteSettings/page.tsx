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

async function getData() {
    const category = await getAllCategory('parent=null')
    return category as TCategorySchema[]
}



async function SiteSettings() {
    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null

    const categories = await getData()

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
                    categories.length > 0 && categories.map((cat: TCategorySchema) => (
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