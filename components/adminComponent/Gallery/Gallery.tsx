'use client'

import { GalleryInfoProps, PRODUCT } from '@/type'
import axios from 'axios'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import TERipple from '@/components/ui/components/Ripple/Ripple'
// import Link from 'next/link'
// import { HiMiniPlus } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'
import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import queryString from 'query-string'

function Gallery({
    apiToo,
    searchParams,
    itemId = 'add'
}: {
    apiToo: string,
    searchParams: string,
    itemId: string | string[]
}) {

    const router = useRouter()

    const params = queryString.parse(searchParams)

    const paramssss = new URLSearchParams(searchParams)
    // const params = new URLSearchParams(searchParams)
    // params.delete('time')
    // console.log('params', params.get('images'));
    console.log('searchParams', paramssss.get('propertys'));


    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    // const userId = session?.user?.id

    const accessToken = session?.user && session?.user?.accessToken || ''

    const [form, setForm] = useState<PRODUCT>()

    const [gallerys, setGallerys] = useState<string[]>([])
    const [gallery, setGallery] = useState<string[]>([])

    const getAllGallery = useCallback(async () => {
        accessToken && await axios.get('/api/gallery', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {
            const cats = response.data.gallerys
            setGallerys(cats)
        })

        await axios.get(`/api/${apiToo}/${itemId}`).then(response => {
            const product = response.data.product
            console.log('product', product);

            setForm(product)
            // setGallery(product.images)
        })
    }, [accessToken, itemId, apiToo])

    useEffect(() => {

        getAllGallery()

    }, [getAllGallery])

    function handlePhoto(e: string) {
        console.log(e);
        // const img = searchParams.get('Images')
        let oldImg = [...gallery]
        if (gallery.includes(e)) {
            console.log('includes')
            oldImg = gallery.filter(old => old !== e)
        } else {
            console.log('includesoo')
            oldImg.push(e)
        }

        setGallery(oldImg)

        // params.delete('images')
        // params.set('images', gallery.toString())
        // const newForm = { ...form }
        // if (newForm.images?.includes(e)) {
        //     const oldImg = newForm.images.filter(old => old !== e)
        //     newForm.images = oldImg
        // } else {
        //     newForm.images?.push(e)
        // }

        // setForm(newForm)

    }

    useEffect(() => {
        // delete params.images
        // params.images = gallery
    }, [gallery, params])

    async function updateProduct() {
        delete params.images
        params.images = gallery.join(',')
        const query = queryString.stringify(params)
        router.push(`/dashboard/${apiToo}/addProduct/${itemId[0]}?${query}`)
        // await axios.patch(`/api/${apiToo}/${itemId}`, { data: form }, {
        //     headers: {
        //         Authorization: `${accessToken}`
        //     }
        // })
        // router.push(`/dashboard/${apiToo}?${searchParams}`)
    }

    console.log('params', params);
    console.log('itemId', itemId[0]);


    return (
        <div className="flex flex-col w-full">
            <section className="flex relative overflow-y-auto flex-col w-full p-10 my-2">
                <div className="sm:flex items-center justify-between">
                    <h2 className="text-lg w-full justify-center text-center font-medium text-gray-800 dark:text-white">
                        فایل های بارگذاری شده
                    </h2>

                    <div className="flex items-center mt-4 gap-x-3">

                        <LinkWithRipple
                            name="addProduct"
                            href={'/dashboard/gallery/addFile'}
                        >
                            <span>بارگذاری کردن فایل جدید</span>
                            {/* <HiMiniPlus /> */}
                            <Tooltip anchorSelect="#addProduct" clickable>
                                <button>بارگذاری کردن فایل جدید</button>
                            </Tooltip>
                        </LinkWithRipple>

                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className=" grid grid-cols-4 gap-1 h-full overflow-y-auto mt-2">
                                {gallerys?.length > 0 && gallerys.map((galler) => (
                                    <div
                                        className='flex'
                                        key={galler._id}
                                    >
                                        {/* {console.log(form?.images?.includes(galler.url) || false)} */}
                                        <div className=" flex text-center justify-center">
                                            <div className="flex flex-col border">
                                                <div className="p-2 md:flex-shrink-0">

                                                    <TERipple>

                                                        <div className="relative overflow-hidden bg-cover bg-no-repeat">
                                                            <Image
                                                                src={`/uploads/images/${galler.url}`}
                                                                width="100"
                                                                height="130"
                                                                priority={true}
                                                                alt="Woman paying for a purchase"
                                                                className="rounded-lg"
                                                            />
                                                            <div
                                                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                                            <div className=' absolute right-1 top-1'>

                                                                <Checkbox
                                                                    id={galler._id}
                                                                    checked={form?.images?.includes(galler.url) || false}
                                                                    setCheck={() => handlePhoto(galler.url)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </TERipple>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-3 items-center mt-4">

                    <ButtonWithRipple
                        name='add'
                        onClick={updateProduct}
                    >
                        ثبت
                    </ButtonWithRipple>

                    <LinkWithRipple
                        name='cancel'
                        href={`/dashboard/${apiToo}/?${searchParams}`}
                    // href={`/dashboard/${apiToo}/edit/${itemId}?${searchParams}`}
                    >
                        انصراف
                    </LinkWithRipple>


                </div>
            </section>
        </div >
    )
}

export default Gallery