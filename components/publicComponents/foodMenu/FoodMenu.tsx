'use client'

import React from 'react'
import BodyFoodMenu from './BodyFoodMenu'
import NavigationFoodMenu from './NavigationFoodMenu'
import { CAT, PRODUCT } from '@/type'

type Props = {
    data: any
}

function FoodMenu({ data }: Props) {

    function setActive(e: string) {

        console.log('setActive', e);

    }
    const categorys = data.categorys.filter(((c: CAT) => c.type === '1'))

    const products = data.products.filter((p: PRODUCT) => p.category === categorys[0]._id)

    console.log('products', products);


    return (
        <div className='flex flex-col w-full bg-slate-50 h-screen justify-between'>

            {/* <div className=' flex w-full'>
                <BodyFoodMenu products={products} />
            </div>

            <ul className=' overflow-x-auto py-2 h-20 px-2 flex justify-center items-center relative bg-slate-300 dark:bg-slate-800'>
                <NavigationFoodMenu
                    items={categorys}
                    activeItem={`${categorys[0]._id}`}
                    setActiveItem={setActive}
                />
            </ul> */}

        </div>
    )
}

export default FoodMenu