import { TCategorySchema } from '@/ZSchemas'
import {
    Box
} from '@mui/material'
import Fab from '@mui/material/Fab'
import Link from 'next/link'
import queryString from 'query-string'
import React from 'react'
import { getCatById, getCategories } from '@/actions/category'
import CategoryForm from '@/components/adminComponent/Categories/CategoryForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { verifyJwt } from '@/lib/jwt'

type Props = {
    params: {
        id: string
    }
    searchParams: {
        parentCat: string
    }
    // searchParams: { [parentCat: string]: [string] | undefined }
}

async function getData(cId: string) {
    const { category, success } = await getCatById(cId)
    return category
}

async function AddSetting({ params, searchParams }: Props) {
    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const { parentCat } = searchParams
    const stringifyParams = queryString.stringify(searchParams)

    const { id } = params

    const add = id[0] === 'add_new_cat' ? true : false
    let category: TCategorySchema = {
        _id: '',
        name: '',
        latinName: '',
        slug: '',
        type: false,
        parent: ''
    }
    add ? category = await getData(parentCat) : category = await getData(id[0])

    return (
        <Box
            component="div"
            sx={{ m: '2px', width: '100%', justifyContent: 'center' }}
        >
            <p className=' flex p-3'>{
                add ? `اضافه کردن دسته بندی جدید به دسته بندی ( ${category.name} )` : `ویرایش دسته بندی ( ${category.name} )`
            }</p>
            <Fab
                size="medium"
                variant="extended"
                color="secondary"
                aria-label="add"
            >
                <Link
                    href={`/dashboard/siteSettings/`}
                >
                    انصراف
                </Link>
            </Fab>

            <Box
                component={'div'}
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gap: 2,
                    width: '100%'
                }}
            >
                <CategoryForm
                    cat={category}
                    add={add}
                    parentId={parentCat}
                    searchParams={stringifyParams}
                />
            </Box>
        </Box>
    )
}

export default AddSetting