'use client'

import TERipple from "@/components/ui/components/Ripple/Ripple"
import { GalleryInfoProps, PRODUCT } from "@/type"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { HiMiniPlus, HiOutlineArrowUpTray } from "react-icons/hi2"
import { Tooltip } from "react-tooltip"

function ProductGallery({ }: string) {

    const router = useRouter()

    const { pId } = useParams()

    const [productInfo, setProductInfo] = useState<PRODUCT>()
    const [gallerys, setGallerys] = useState<GalleryInfoProps[]>([])

    const [images, setImages] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)

    useEffect(() => {

        axios.get(`/api/product/${pId}`).then((response) => {
            setProductInfo(response.data.product)
        })

    }, [pId])

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {
            //convert `FileList` to `File[]`
            const _files = Array.from(e.target.files);
            setImages(_files);
        }

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        images.forEach((image, i) => {
            formData.append(image.name, image)
        });
        setUploading(true)
        await axios.patch("/api/product/uploadImages/" + pId, formData)
        // await axios.post("/api/product/uploadImages", formData)
        setUploading(false)
        router.push('/dashboard/product')
    };

    console.log(productInfo);


    return (
        <div className="flex flex-col w-full">
            <section className="flex relative overflow-y-auto flex-col w-full p-10 my-2">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        عکس های محصول
                    </h2>

                    <div className="flex items-center mt-4 gap-x-3">

                        <TERipple rippleColor="white">
                            <Link
                                id="addProduct"
                                href={'/dashboard/gallery/addFile'}
                                type="button"
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <span>انتخاب کردن عکس جدید</span>
                                <HiMiniPlus />
                                <Tooltip anchorSelect="#addProduct" clickable>
                                    <button>انتخاب کردن عکس جدید</button>
                                </Tooltip>
                            </Link>
                        </TERipple>

                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className=" grid grid-cols-1 md:grid-cols-12 p-5 gap-2 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                {gallerys.length > 0 && gallerys.map((gallery) => (
                                    <div
                                        className='flex'
                                        key={gallery._id}>
                                        <div className=" flex text-center justify-center">
                                            <div className="flex flex-col border">
                                                <div className="p-2 md:flex-shrink-0">
                                                    <Image
                                                        src={`/uploads/${gallery.url}`}
                                                        width="148"
                                                        height="199"
                                                        priority={true}
                                                        alt="Woman paying for a purchase"
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="uppercase text-sm text-indigo-500 font-bold">
                                                        {gallery.title}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex items-center justify-between mt-6">
                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                            قبلی
                        </span>
                    </a>

                    <div className="items-center hidden md:flex gap-x-3">
                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                    </div>

                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>
                            بعدی
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </a>
                </div>
            </section>

        </div >
    )
}

export default ProductGallery