// 'use client'

import ProductForm from '@/components/adminComponent/products/ProductFormcopy'
import { EditProduct } from '@/type'
import axios from 'axios'
import { useParams } from 'next/navigation'

async function getProduct(editId: string) {
    const { data } = await axios.get(`${process.env.BASE_URL}/api/product/${editId}`)
    return data

}

async function EditOnProduct({ params: { editId } }) {

    // const { editId } = useParams()
    const { product } = await getProduct(editId[0])
    console.log(product);
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


    return (
        <div className='flex flex-col w-full border rounded-md shadow-md p-10 my-2'>
            <ProductForm productInfo={product} />
        </div>
    )
}

export default EditOnProduct