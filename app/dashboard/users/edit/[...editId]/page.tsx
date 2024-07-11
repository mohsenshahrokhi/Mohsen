
import { TProductSchema } from '@/ZSchemas/ProductSchema'
import { getPBy } from '@/actions/product'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import queryString from 'query-string'

async function getData(pId: string, accessToken: string) {

    const params = {
        _id: pId,
        populate: 'parent.name,author'
    }
    const stringifyParams = queryString.stringify(params)

    const { product } = await getPBy(stringifyParams)

    return product as TProductSchema
}

type Props = {
    params: {
        editId: string[] | string
    }
}

async function EditOnProduct({ params }: Props) {

    return (
        <div className='flex flex-col w-full border rounded-md shadow-md p-10 my-2'>
            {/* <ProductForm productInfo={product} /> */}
        </div>
    )
}

export default EditOnProduct