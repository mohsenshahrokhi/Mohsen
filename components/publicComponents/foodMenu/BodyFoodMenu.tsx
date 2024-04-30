import { PRODUCT } from '@/type'

import Banner from './Banner'
import AnimateCharacter from './AnimateCharacter'
import AnimateWord from './AnimateWord'

const BodyFoodMenu = ({ products }: { products: PRODUCT[] }) => {

    if (products?.length === 0) {
        return (<h3>loading...</h3>)
    }
    // console.log(products);

    return (

        <div className="md:flex-shrink-0">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
                {products?.length > 0 && products[0]?.category && products[0]?.category.images && products[0]?.category.images.length > 0 &&
                    <Banner
                        banner={products[0]?.category?.images[0]}
                        item={products[0]?.category?.eName!}
                    />
                }
                {/* <div className=' flex w-full h-screen'>
                    slide down
                </div> */}

                <div className=' grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2'>{products?.length > 0 && products.map((product: PRODUCT) => (
                    <div
                        className=''
                        key={product._id}
                    >
                        <div className=' flex justify-between items-center px-3'>
                            <AnimateWord
                                text={product.title}
                                textClassName=' inline-flex text-zinc-200 '
                                className=' text-zinc-700'
                                el='span'
                            />
                            <span
                                className=" flex flex-col whitespace-nowrap rounded-full bg-success-100 px-[1em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[1.2em] font-bold leading-none text-success-700">
                                <AnimateCharacter
                                    text={
                                        new Intl.NumberFormat('en').format(product.price).toString()
                                    }
                                    el='span'
                                    textClassName=' inline-flex float-left'
                                    className=' text-lg flex flex-col'
                                />
                            </span>
                        </div>

                        <hr className="my-1 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100" />
                        <div className=' flex w-full'>
                            <AnimateWord
                                text={product.recipe || ''}
                                textClassName=' text-sm text-zinc-400 font-Yekan'
                                className=' text-zinc-700'
                                el='p'
                            // once
                            />
                        </div>
                        <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-90 dark:opacity-100" />
                    </div>
                ))}</div>

            </div>
        </div>

    )
}

export default BodyFoodMenu