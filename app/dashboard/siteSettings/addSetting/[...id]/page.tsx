
import {
    Box
} from '@mui/material'
import Fab from '@mui/material/Fab'
import Link from 'next/link'
import queryString from 'query-string'
import React from 'react'
import { getCBy } from '@/actions/category'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { verifyJwt } from '@/lib/jwt'
import AddCategoryForm from '@/components/adminComponent/Categories/AddCategoryForm'
import EditCategoryForm from '@/components/adminComponent/Categories/EditCategoryForm'
import HandleURL from '@/utils/HandleURL'
import { TCategorySchema } from '@/ZSchemas/CategorySchema'

type Props = {
    params: {
        id: string | string[]
    }
    searchParams: {
        parentCat: string
        callbackUrl: string
    }
    // searchParams: { [parentCat: string]: [string] | undefined }
}

async function getData(cId: string) {
    const params = {
        _id: cId,
        // populate: 'parent.name,author'
    }
    const stringifyParams = queryString.stringify(params)
    const { category, success } = await getCBy(stringifyParams)
    return category
}


async function AddSetting({ params, searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const { parentCat } = searchParams
    const stringifyParams = queryString.stringify(searchParams)
    const callbackUrl = searchParams.callbackUrl
    const { id } = params

    const add = id[0] === 'add' ? true : false

    let category: TCategorySchema = {
        _id: '',
        name: '',
        latinName: '',
        slug: '',
        type: false,
        parent: '',
        images: [],
        propertys: []
    }
    add ? category = await getData(parentCat) : category = await getData(id[0])
    const catString = JSON.stringify(category)

    console.log(category);
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
                    href={`/dashboard/siteSettings/${callbackUrl}`}
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
                {add && <AddCategoryForm
                    cat={category}
                    callbackUrl={callbackUrl}
                    parentId={parentCat}
                    searchParams={stringifyParams}
                />}
                {!add && <EditCategoryForm
                    catString={catString}
                    callbackUrl={callbackUrl}
                    parentId={parentCat}
                    searchParams={stringifyParams}
                />}
            </Box>
        </Box>
    )
}

export default AddSetting