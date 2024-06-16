import { getCategories } from '@/actions/category'
import { getPBy } from '@/actions/product'
import { getAllU } from '@/actions/register'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import EditProductForm from '@/components/adminComponent/Products/EditProductForm'
import Ppppp from '@/components/adminComponent/Products/Ppppp'
import { Box } from '@mui/material'
import { getServerSession } from 'next-auth'
import queryString from 'query-string'
import React from 'react'

type Props = {
    params: {
        id: string[] | string
    },
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getData(pId: string, accessToken: string) {
    const PParams = {
        _id: pId,
        populate: 'category.name,category.images,category.latinName,category.propertys,author.displayName,seller.displayName'
    }
    const CParams = {
        // _id: pId,
        // populate: 'category.name,category.images,category.-_id,category.latinName,author.displayName,author.-_id,seller.displayName,seller.-_id'
        limit: 2000
    }
    const UParams = {
        // _id: pId,
        // populate: 'category.name,category.images,category.-_id,category.latinName,author.displayName,author.-_id,seller.displayName,seller.-_id'
        limit: 2000
    }
    const stringifyPParams = queryString.stringify(PParams)
    const stringifyCParams = queryString.stringify(CParams)
    const stringifyUParams = queryString.stringify(UParams)

    const [{ product }, { categories }, { users }] = await Promise.all([
        getPBy(stringifyPParams),
        getCategories({ stringifyParams: stringifyCParams, accessToken }),
        getAllU({ stringifyParams: stringifyUParams, accessToken })
    ])

    return { product, categories, users }
}

async function AddProduct({ params, searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken as string
    const stringifyParams = queryString.stringify(searchParams)
    const pId = searchParams.id as string
    const { id } = params

    const edit = id[0] === 'edit' ? true : false

    const { product, categories, users } = await getData(pId, accessToken)
    console.log(categories);

    return (
        <Box
            className='flex relative flex-col w-full'>
            {/* {edit && <Ppppp
                searchParams={stringifyParams}
                product={[]}
            />} */}
            {edit && <EditProductForm
                searchParams={stringifyParams}
                productInfo={JSON.stringify(product)}
                stringCats={JSON.stringify(categories)}
                users={users}
            />}
            {/* {!add && <Ppppp
                searchParams={stringifyParams}
                product={product}
            // callbackUrl={callbackUrl}
            />} */}
        </Box>
    )
}

export default AddProduct