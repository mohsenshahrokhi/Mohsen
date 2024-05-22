import { HiMiniPlus, HiOutlinePencilSquare, HiOutlinePhoto, HiOutlineTrash } from "react-icons/hi2"
import Link from "next/link"
import queryString from "query-string"
import { Box, Button } from "@mui/material"
import { TProductSchema } from "@/ZSchemas"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { verifyJwt } from "@/lib/jwt"
import { getProducts } from "@/actions/product"
import ProductList from "@/components/adminComponent/products/ProductList"
import Pagination from "@/components/adminComponent/Pagination"

type Data = {
    products: TProductSchema[]
    success: boolean
    qtt: number
}

async function getData({ page, perPage, accessToken }: { page: number, perPage: number, accessToken: string }) {

    const params = {
        limit: perPage,
        skip: perPage * (page - 1),
        populate: 'category.name,category.images,category.latinName,author.displayName'
    }

    const stringifyParams = queryString.stringify(params)

    const products = await getProducts({ stringifyParams, accessToken })

    return products as Data

}

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Product({ searchParams }: Props) {

    const session = await getServerSession(authOptions)
    const accessToken = session?.user.accessToken
    const verify = accessToken && verifyJwt(accessToken) || null
    // delete searchParams.page
    // const stringifyParams = queryString.stringify(searchParams)

    let page = parseInt(searchParams.page || '1', 10)
    delete searchParams.page
    const stringified = queryString.stringify(searchParams)
    page = !page || page < 1 ? 1 : page
    const perPage = 1

    const { products, qtt } = await getData({ page: page, perPage: perPage, accessToken: accessToken! })
    // const products = await getData(accessToken!) as TProductSchema[]
    const totalPage = Math.ceil(qtt / perPage)
    const outOfRange = page > totalPage


    // const productsProducts = await getData()
    // const product = {
    //     category: 0,
    //     description: '',
    //     images: [],
    //     price: 0,
    //     discount: 0,
    //     propertys: [{ title: '', value: { value: '', name: '' } }],
    //     ratings: '',
    //     recipe: '',
    //     reviews: [],
    //     seller: { _id: '' },
    //     author: { _id: '' },
    //     slug: '',
    //     title: '',
    //     stock: 0,
    // }

    // const query = queryString.stringify(product)

    // const accessToken = session?.user && session?.user?.accessToken || ''




    // function deleteP(id: string | undefined) {
    //     setIsLoading(true)
    //     axios.delete('/api/product/' + id, {
    //         headers: {
    //             Authorization: `${accessToken}`
    //         }
    //     }).then(() => {
    //         setDeleteProduct(undefined)
    //         getAllProducts()
    //         setIsOpen(false)
    //         setIsLoading(false)
    //     })

    // }

    // function handleDelete(product: TProductSchema) {
    //     setDeleteProduct(product)
    //     setIsOpen(true)
    // }
    // function closeModal() {
    //     setIsOpen(false)
    // }

    // console.log(products);
    return (

        <Box
            component={'section'}
            className="flex relative flex-col w-full p-2 my-2"
        >
            <Box
                component={'div'}
                className="flex w-full flex-col items-center justify-between"
            >
                <Box
                    component={'h4'}
                    className="text-lg "
                >
                    محصولات ثبت شده
                </Box>

                {/* <HModal
                    open={isOpen}
                    close={closeModal}
                    title={`حذف محصول ${deleteProduct?.title}`}
                    body={`آیا از حذف محصول ${deleteProduct?.title} مطمئن هستید ؟`}
                >
                    <div
                        className=" flex w-full justify-around items-center">
                        <TERipple rippleColor="white">

                            <button
                                onClick={closeModal}
                                className=" bg-slate-300 text-center justify-center items-center text-slate-600 py-1 px-4 rounded shadow-sm">خیر</button>
                        </TERipple>

                        <button
                            onClick={() => deleteP(deleteProduct?._id)}
                            className="  text-slate-100 py-1 px-4 rounded shadow-sm bg-red-600 text-center justify-center items-center">
                            {!isLoading ? <span>بله حذف شود</span> : <span>Deleting...</span>}
                        </button>

                    </div>
                </HModal> */}

                <Box
                    component={'div'}
                    className="flex flex-col items-center gap-3 w-full mt-4 gap-x-3"
                >
                    <Link
                        href={`product/addProduct/add?${stringified}`}
                        className=" flex items-center justify-center gap-3"
                    // href={`product/addProduct/add?sidebarControl=false&sidebarVisible=false&theme=light&${query}`}
                    >
                        <Box
                            component={'p'}
                        >
                            اضافه کردن محصول جدید
                        </Box>
                        <HiMiniPlus />

                    </Link>

                </Box>
            </Box>

            <Box
                component={'div'}
                className="flex flex-col no-scrollbar mt-6"
            >
                <Box
                    component={'div'}
                    className="-mx-4 -my-2 overflow-x-auto no-scrollbar sm:-mx-6 lg:-mx-8"
                >
                    <Box
                        component={'div'}
                        className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                    >
                        <Box
                            component={'div'}
                            className="overflow-hidden no-scrollbar border md:rounded-lg"
                        >{outOfRange ? (
                            <Box
                                component={'div'}
                            >
                                این صفحه وجود ندارد
                            </Box>
                        ) : (
                            <Box
                                component={'div'}
                            >
                                <ProductList products={products} />
                                <Pagination
                                    page={page}
                                    stringified={stringified}
                                    totalPage={totalPage}
                                />
                            </Box>
                        )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
Product.auth = true