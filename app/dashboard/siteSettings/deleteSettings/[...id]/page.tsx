import { TCategorySchema } from '@/ZSchemas'
import { getCategories } from '@/actions/category'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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

async function getData(catId: string, accessToken: string) {

    const params = {
        parent: catId
    }
    const stringifyParams = queryString.stringify(params)
    const exist = await getCategories({ stringifyParams, accessToken })
    return exist

}

async function DeleteCat({ params, searchParams }: Props) {
    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null
    // const categories: TCategorySchema[] = []
    // const categories = await getData(params.id.slice(-1)[0], accessToken!)
    const parseSearchParams = queryString.stringify(searchParams)


    const { categories, success } = await getData(params.id.slice(-1)[0], accessToken!)

    console.log('exist', params.id, categories, success);


    return (
        <div>
            {success ?
                'این دسته بندی دارای زیر دسته است قابل پاک کردن نیست ابتدا باید تمام زیر دسته ها پاک شوند !' :
                'آیا مطمن هستید ؟'
            }
        </div>
    )
}

export default DeleteCat