import { TCategorySchema, TProductSchema } from '@/ZSchemas'
import { getCategories } from '@/actions/category'
import { getPById, getProducts } from '@/actions/product'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProductForm from '@/components/adminComponent/products/ProductForm'
import { verifyJwt } from '@/lib/jwt'
import { getServerSession } from 'next-auth'
import queryString from 'query-string'
import React from 'react'

type Props = {
    params: {
        id: string[] | string
    },
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getData(pId: string) {

    // const params = {
    //     _id: pId,
    //     populate: 'parent.name,author.username'
    // }
    // const stringifyParams = queryString.stringify(params)

    const { product, success } = await getPById(pId)
    return product as TProductSchema

}

async function AddProduct({ params, searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken as string
    const verify = accessToken && verifyJwt(accessToken) || null
    // const categories = await getData(params.id.slice(-1)[0], accessToken!)
    const stringifyParams = queryString.stringify(searchParams)
    const pId = searchParams.id as string
    const { id } = params

    const add = id[0] === 'add' ? true : false
    let product: TProductSchema = {
        _id: '',
        title: ''
    }

    if (!add && pId) product = await getData(pId)

    const productInfo = {}
    return (
        <div className='flex relative flex-col w-full'>
            <ProductForm
                add={add}
                searchParams={stringifyParams}
                productInfo={product}
            />
        </div>
    )
}

export default AddProduct