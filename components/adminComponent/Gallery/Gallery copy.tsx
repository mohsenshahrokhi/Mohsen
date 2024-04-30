'use client'

import { GalleryInfoProps } from '@/type'
import axios from 'axios'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import TERipple from '@/components/ui/components/Ripple/Ripple'
import Link from 'next/link'
import { HiMiniPlus } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'
import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'

function Gallery({ itemId, updateImage }: { itemId: string, updateImage: (e: string) => void }) {

    const router = useRouter()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const userId = session?.user?.id

    const accessToken = session?.user && session?.user?.accessToken || ''

    const [form, setForm] = useState<string>(itemId)

    const [gallerys, setGallerys] = useState<GalleryInfoProps[]>([])

    const getAllGallery = useCallback(async () => {
        accessToken && await axios.get('/api/gallery', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {
            const cats = response.data.gallerys
            setGallerys(cats)
        })


    }, [accessToken])

    useEffect(() => {

        getAllGallery()

    }, [getAllGallery])

    // console.log('form', form);

    return (
        <div className="flex flex-col w-full">
            <section className="flex relative overflow-y-auto flex-col w-full p-10 my-2">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        فایل های بارگذاری شده
                    </h2>

                    <div className="flex items-center mt-4 gap-x-3">

                        <TERipple rippleColor="white">
                            <Link
                                id="addProduct"
                                href={'/dashboard/gallery/addFile'}
                                type="button"
                                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                <span>بارگذاری کردن فایل جدید</span>
                                <HiMiniPlus />
                                <Tooltip anchorSelect="#addProduct" clickable>
                                    <button>بارگذاری کردن فایل جدید</button>
                                </Tooltip>
                            </Link>
                        </TERipple>

                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className=" grid grid-cols-1 md:grid-cols-12 p-5 gap-2 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                {gallerys?.length > 0 && gallerys.map((galler) => (
                                    <div
                                        className='flex'
                                        key={galler._id}>
                                        <div className=" flex text-center justify-center">
                                            <div className="flex flex-col border">
                                                <div className="p-2 md:flex-shrink-0">

                                                    <TERipple onClick={() => { setForm(galler._id) }}>

                                                        <div className="relative overflow-hidden bg-cover bg-no-repeat">
                                                            <Image
                                                                src={`/uploads/${galler.url}`}
                                                                width="148"
                                                                height="199"
                                                                priority={true}
                                                                alt="Woman paying for a purchase"
                                                                className="rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                                            <div className=' absolute right-1 top-1'>
                                                                <Checkbox
                                                                    checked={form.includes(galler._id) ? true : false}
                                                                    setCheck={() => setForm(galler._id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </TERipple>
                                                </div>

                                                <div className="mt-4">
                                                    <div className="uppercase text-sm text-indigo-500 font-bold">
                                                        {galler.title}
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
                <div className="flex items-center mt-4 gap-x-3">

                    <TERipple rippleColor="white">
                        <ButtonWithRipple
                            name='add'
                            onClick={updateImage(form)}
                        >
                            ثبت
                        </ButtonWithRipple>
                    </TERipple>

                </div>
            </section>
        </div >
    )
}

export default Gallery