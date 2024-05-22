'use client'

import ProductForm from '@/components/adminComponent/products/ProductFormcopy'
import { verifyJwt } from '@/lib/jwt'
import { EditProduct } from '@/type'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function AddProduct() {

    const productInfo = {}
    return (
        <div className='flex relative flex-col w-full'>
            <ProductForm productInfo={productInfo} />
        </div>
    )
}

export default AddProduct