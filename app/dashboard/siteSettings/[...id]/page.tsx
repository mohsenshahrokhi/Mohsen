import { TCategorySchema } from '@/ZSchemas'
import { getAllCategory } from '@/lib/controllers/categoryController'
import Fab from '@mui/material/Fab'
import Link from 'next/link'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import queryString from 'query-string'
import EditNoteIcon from '@mui/icons-material/EditNote'
import CatList from '@/components/adminComponent/Categories/CatList'
import { getAllCategoryOption } from '@/lib/controllers/categoryOptionController'
import UndoIcon from '@mui/icons-material/Undo';

type Props = {
    params: {
        id: string[]
    }
}

async function getData(cId: string) {
    console.log('cId', cId)
    const categoryChild = await getAllCategory(`parent=${cId}`)
    // const categoryChild = await getAllCategory(`parent=${cId}&populate=categories.name,categories.slug`)
    // console.log('categoryChild', categoryChild)

    return categoryChild as TCategorySchema[]

}

async function Category({ params }: Props) {

    // const categories: TCategorySchema[] = []
    const categories = await getData(params.id.slice(-1)[0])
    const {
        id
    } = params
    let url = ''
    let parent = ''

    if (Array.isArray(id)) {
        parent = id.pop() || ''
        url = id.join('/')
    }

    const stringified = queryString.stringify(params)

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
                    href={`/dashboard/siteSettings/addSetting?${stringified}`}
                >
                    اضافه کردن ویژگی جدید
                    <AddIcon sx={{ ml: 1 }} />
                </Link>
            </Fab>
            <Fab
                size="medium"
                variant="extended"
                color="secondary"
                aria-label="add"
            >
                <Link
                    href={`/dashboard/siteSettings/${url}`}
                >
                    برگشت
                    <UndoIcon sx={{ ml: 1 }} />
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
                    categories && <CatList
                        parsed={encodeURIComponent(parent)}
                        categories={categories}
                    />
                }
            </Box>
        </Box>
    )
}

export default Category