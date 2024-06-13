
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


    // const router = useRouter()
    // const { data: session } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         router.push('/login')
    //     },
    // })

    // const accessToken = session?.user && session?.user?.accessToken || ''

    // const verify = accessToken && verifyJwt(accessToken!) || null
    // if (verify?.role !== "مدیر کل") {
    //     router.push('/login')
    // }
    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken

    const { editId } = params

    return (
        <div className='flex flex-col w-full border rounded-md shadow-md p-10 my-2'>
            {/* <ProductForm productInfo={product} /> */}
        </div>
    )
}

export default EditOnProduct