
'use client'

import axios from 'axios'
import React, { useState, useEffect, useCallback, Fragment } from 'react'
import TEInput from "@/components/ui/components/Input/Input"
import TERipple from '@/components/ui/components/Ripple/Ripple'
import { useRouter } from 'next/navigation'
import TETextarea from '@/components/ui/components/Textarea/TETextarea'
import { useSession } from 'next-auth/react'
import Image from "next/image"
import { CAT, GalleryInfoProps, EditProduct, User } from '@/type'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'
// import HSelect from '@/components/ui/components/HSelect/HSelect'
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
// import { Dialog, Transition } from '@headlessui/react'
import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import SubmitButton from '@/components/ui/components/Button/SubmitButton'
import { useForm } from 'react-hook-form'


function ProductForm({ productInfo }: { productInfo: EditProduct }) {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
    } = useForm()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const userId = session?.user.id
    // console.log(userId);

    const accessToken = session?.user && session?.user?.accessToken || ''

    const [isLoading, setIsLoading] = useState(false)

    const [allCategories, setAllCategorys] = useState<CAT[]>()

    // const [user, setUser] = useState<User>()

    const [propertySelectData, setPropertySelectData] = useState<any[]>([])
    const [gallerys, setGallerys] = useState<GalleryInfoProps[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [categorySelectOptions, setCategorySelectOptions] = useState<string[]>()
    const [categorySelectedDefault, setCategorySelectedDefault] = useState<string>()

    const {
        category: editCategory,
        description: editDescription,
        images: editImage,
        price: editPrice,
        discount: editDiscount,
        propertys: editPropertys,
        ratings: editRatings,
        recipe: editRecipe,
        reviews: editReviews,
        seller: editSeller,
        author: editAuthor,
        slug: editSlug,
        title: editTitle,
        stock: editStock,
        _id,
    } = productInfo

    //     const [form, setForm] = useState<EditProduct>(
    //  )

    const [form, setForm] = useState<EditProduct>(
        {
            category: editCategory || '',
            description: editDescription || '',
            images: editImage || [],
            price: editPrice || 0,
            discount: editDiscount || '',
            propertys: editPropertys || [{ title: '', value: { id: '', name: '' } }],
            ratings: editRatings || '',
            recipe: editRecipe || '',
            reviews: editReviews || [],
            seller: editSeller,
            author: editAuthor,
            slug: editSlug || '',
            title: editTitle || '',
            stock: editStock || '',
            _id: _id
        }
    )

    const getAllGallery = useCallback(async () => {
        accessToken && await axios.get('/api/gallery', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {
            const gallery = response.data.gallerys
            setGallerys(gallery)
        })
    }, [accessToken])

    useEffect(() => {
        getAllGallery()
        accessToken && axios.get('/api/category', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {

            const options: string[] = []

            const allCategorie = response.data.categorys

            allCategorie.forEach((element: CAT) => {

                options.push(element.name!)

            })
            setCategorySelectOptions(options)
            setAllCategorys(allCategorie)

        })

    }, [accessToken, getAllGallery])

    // useEffect(() => {
    //     accessToken && axios.get(`/api/user${userId}`, {
    //         headers: {
    //             Authorization: `${accessToken}`
    //         }
    //     }).then(response => {
    //         setUser(response.data)

    //     })

    // }, [accessToken, userId])

    useEffect(() => {

        // if (form.category.name !== '') {
        const property = allCategories?.filter(e => e._id === form.category._id)[0]?.propertys

        const selects: any[] = []

        property?.map((prop: any) => {

            const optionVal: string[] = []

            const name = prop.name

            const values = prop?.values?.split(',')

            values.map((pro: string) => {
                optionVal.push(pro)
            })

            selects.push([name, optionVal])

        })

        console.log(property);

        setPropertySelectData(selects)
        // }

    }, [form.category, allCategories])

    function handleInputStateChange(fieldName: string, value: string) {

        setForm((prevState) => ({ ...prevState, [fieldName]: value }))

    }

    function handleSelectStateChange(fieldName: string, value: string) {
        const findCat = allCategories?.filter(cat => cat._id === value)[0]
        setForm((prevState) => ({ ...prevState, [fieldName]: findCat }))

        setCategorySelectedDefault(value)

    }

    async function saveProduct(e: any) {

        e.preventDefault()

        setIsLoading(true)

        const data = { ...form }
        const label = data.title!.trim().replace(/[&\// /\\#,+()$~%@'":*?<>{}]/g, '')
        data.category = form.category._id as CAT
        data.slug = label
        console.log(userId)

        data.author = userId
        data.seller = userId

        if (_id) {

            console.log('data', data)
            await axios.patch('/api/product/' + _id, { data }, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })

        } else {
            console.log('data', data)
            await axios.post('/api/product', { data }, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })

        }

        setIsLoading(false)

        router.push('/dashboard/product')

    }

    function handleSelectpropertyChange(name: string, e: string | number, index: number): void {

        const oldForm = { ...form }
        const newP: { title: string; value: string | number; }[] = oldForm.propertys?.filter(p => p.title !== '') || []
        const newPp = newP?.filter(p => p.title !== name)
        newPp?.push({ title: name, value: e })
        oldForm.propertys = newPp
        setForm(oldForm)

    }

    function setIcon(e: string) {

        const oldForm = { ...form }
        if (oldForm.images?.includes(e)) {
            const has = oldForm.images?.filter(i => i !== e)
            oldForm.images = []
            has.length > 0 && has.map((i) => {
                oldForm.images?.push(i)
            })
        } else oldForm.images?.push(e)
        setForm(oldForm)

    }

    function handleDeleteImage(image: string) {
        const oldForm = { ...form }
        const images = oldForm.images?.filter(e => e !== image)
        oldForm.images = images

        setForm(oldForm)
    }

    if (form === undefined) {
        return <h3>loading...</h3>
    }

    console.log('form', form)
    console.log('propertySelectData', propertySelectData)

    return (
        <>
            {/*  <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-right divide-x-2 font-medium leading-6 text-gray-900"
                                    >
                                        گالری
                                    </Dialog.Title>
                                    <div className=" grid grid-cols-2 gap-1 h-40 overflow-y-auto mt-2">
                                        {gallerys?.length > 0 && gallerys.map((galler) => (
                                            <div
                                                className='flex'
                                                key={galler._id}>
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
                                                                            checked={form.images?.includes(galler.url) || false}
                                                                            setCheck={() => setIcon(galler.url)}
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

                                    <div className=" flex mt-4 gap-3">
                                        <ButtonWithRipple
                                            name='cancel'
                                            onClick={() => setIsOpen(false)}
                                        >
                                            انتخاب
                                        </ButtonWithRipple>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
            <form
                onSubmit={saveProduct}
                className="space-y-6 flex gap-y-2 flex-col" >
                {form?.title ? <h3>
                    {`ویرایش محصول ( ${form?.title} )`}
                </h3> : <h3>
                    اضافه کردن محصول جدید

                </h3>}
                <div className='grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-1 gap-x-4'>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TEInput
                            type="text"
                            value={form?.title}
                            size='lg'
                            id="title"
                            name="title"
                            label="نام محصول"
                            onChange={(value) => handleInputStateChange('title', value.target.value)}
                            required
                        ></TEInput>
                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TETextarea
                            type="text"
                            value={form?.description}
                            size='lg'
                            id="description"
                            name="description"
                            label="مشخصات محصول"
                            onChange={(value) => handleInputStateChange('description', value.target.value)}
                            required
                        ></TETextarea>
                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TETextarea
                            type="text"
                            value={form?.recipe}
                            size='lg'
                            id="recipe"
                            name="recipe"
                            label="محتویات محصول"
                            onChange={(value) => handleInputStateChange('recipe', value.target.value)}
                            required
                        ></TETextarea>
                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TEInput
                            type="number"
                            value={form?.price}
                            size='lg'
                            id="price"
                            name="price"
                            label="قیمت محصول"
                            onChange={(value) => handleInputStateChange('price', value.target.value)}
                            required
                        ></TEInput>
                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TEInput
                            type="number"
                            value={form?.stock}
                            size='lg'
                            id="stock"
                            name="stock"
                            label="تعداد محصول"
                            onChange={(value) => handleInputStateChange('stock', value.target.value)}
                            required
                        ></TEInput>
                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">

                        {/* <HSelect
                            value={{ id: form.category?.name!, name: form.category?.name! }}
                            options={categorySelectOptions!}
                            handleStateChange={e => handleSelectStateChange('category', e)}
                        /> */}
                    </div>

                    {propertySelectData.length > 0 && propertySelectData.map((property: any, index: number) => (
                        <div key={index} className="relative mb-3 xl:w-96 pt-5">
                            <span>{property[0]}</span>
                            {/* <HSelect
                                value={form.propertys?.[index]?.value!}
                                options={property[1]}
                                handleStateChange={e => handleSelectpropertyChange(property[0], e, index)}
                            /> */}
                        </div>
                    ))}

                </div>

                <div className="flex flex-col w-full">
                    <section className="flex relative flex-col w-full">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                عکس های محصول
                            </h2>

                            <div className="flex items-center mt-4 gap-x-3">
                                <LinkWithRipple
                                    name='addPhoto'
                                    href={`/dashboard/product/addPhoto/${_id}`}
                                >
                                    <span>انتخاب کردن عکس جدید</span>
                                    <Tooltip anchorSelect="#addPhoto" clickable>
                                        <button>انتخاب کردن عکس جدید</button>
                                    </Tooltip>
                                </LinkWithRipple>

                            </div>
                        </div>

                        <div className="flex flex-col mt-2">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className=" grid grid-cols-1 md:grid-cols-6 p-5 gap-2 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        {form.images && form.images?.length > 0 ? form.images.map((gallery) => (
                                            <div
                                                className='flex'
                                                key={gallery}>
                                                <div className=" flex text-center justify-center">
                                                    <div className="flex flex-col border">
                                                        <div className="p-2 md:flex-shrink-0 group">

                                                            <TERipple>

                                                                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                                                                    <Image
                                                                        src={`/uploads/images/${gallery}`}
                                                                        width="100"
                                                                        height="130"
                                                                        priority={true}
                                                                        alt="Woman paying for a purchase"
                                                                        className="rounded-lg "
                                                                    />
                                                                    <div
                                                                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                                                    <div
                                                                        className=' absolute group-hover:right-1 cursor-pointer transition-all  -right-10 top-1 bg-zinc-100 p-1 rounded-full '
                                                                        onClick={() => handleDeleteImage(gallery)}
                                                                    >

                                                                        <HiOutlineTrash color='red' />
                                                                    </div>
                                                                </div>
                                                            </TERipple>
                                                        </div>
                                                        {/* <div className="p-2 md:flex-shrink-0">
                                                            <Image
                                                                src={`/uploads/images/${gallery}`}
                                                                width="90"
                                                                height="60"
                                                                priority={true}
                                                                alt="Woman paying for a purchase"
                                                                className="rounded-lg"
                                                            />
                                                        </div> */}

                                                    </div>
                                                </div>

                                            </div>
                                        )) : (<div className=' flex w-full'>
                                            <p className=' flex w-full'>هیچ عکسی انتخاب نشده</p>
                                        </div>)}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </div >
                <div className=' flex w-full'>

                    <SubmitButton
                        name='submit'
                    >
                        {
                            !_id ? !isLoading ? <span>ثبت محصول جدید </span> : <span> در حال اضافه کردن محصول جدید... </span> : !isLoading ? <span>ویرایش</span> : <span>در حال ویرایش...</span>
                        }
                    </SubmitButton>
                </div>

            </form>
        </>

    )
}

export default ProductForm

