'use client'

import axios from 'axios'
import React, { useState, useEffect, useCallback, Fragment } from 'react'
// import TEInput from "@/components/ui/components/Input/Input"
import TERipple from '@/components/ui/components/Ripple/Ripple'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import TETextarea from '@/components/ui/components/Textarea/TETextarea'
import { useSession } from 'next-auth/react'
import Image from "next/image"
import { CAT, GalleryInfoProps, EditProduct, User } from '@/type'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'
// import HSelect from '@/components/ui/components/HSelect/HSelect'
// import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
// import { Dialog, Transition } from '@headlessui/react'
// import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import SubmitButton from '@/components/ui/components/Button/SubmitButton'
import { Box, Checkbox, InputLabel, MenuItem, Modal, Select, TextField, TextareaAutosize, Typography } from '@mui/material'

import { FormControl } from '@mui/material';
import { title } from 'process'
import queryString from 'query-string'
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'

function ProductForm({ productInfo }: { productInfo: EditProduct }) {

    const router = useRouter()
    const pathName = usePathname()
    const search = useSearchParams()
    const params = new URLSearchParams(search)
    const stringified = search.toString()

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
    const [gallery, setGallery] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [categorySelectOptions, setCategorySelectOptions] = useState<{ value: string, name: string }[]>()
    const [categorySelectedDefault, setCategorySelectedDefault] = useState<string | number>()

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

    const [form, setForm] = useState(
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
            // category: search.get('category'),
            // description: search.get('description') || '',
            // images: search.get('images')?.split(',') || [],
            // price: Number(search.get('price')) || 0,
            // discount: search.get('discount') || '',
            // // propertys: search.get('propertys') || [{ title: '', value: { value: '', name: '' } }],
            // ratings: search.get('ratings') || '',
            // recipe: search.get('recipe') || '',
            // // reviews: search.get('reviews') || [],
            // // seller: search.get('seller'),
            // // author: search.get('author'),
            // slug: search.get('slug') || '',
            // title: search.get('title') || '',
            // stock: search.get('stock') || '',
            // _id: _id
        }
    )
    const openM = search.get('openM') === 'true' ? true : false
    console.log('psearch', search.toString());


    // const query = queryString.stringify(form)
    const query = search.toString()

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

            const options: { value: string, name: string }[] = []

            const allCategorie = response.data.categorys

            allCategorie.forEach((element: CAT) => {

                options.push({ value: element._id!, name: element.name! })

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

            const optionVal: { value: string | number, name: string }[] = []

            const name = prop.name
            console.log('prop', prop);


            const values = prop?.values?.split(',')

            values.map((pro: string) => {
                optionVal.push({ value: pro, name: pro })
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

    function handleSelectStateChange(fieldName: string, value: string | number) {
        console.log(value);
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

        router.push('/dashboard/product?sidebarControl=false&sidebarVisible=false&theme=light')

    }

    function handleSelectpropertyChange(name: string, e: string | number, index: number): void {
        const oldForm = { ...form }
        console.log('name', name, 'e', e, 'index', index);

        const newP: { title: string; value: string | number }[] = oldForm.propertys?.filter(p => p.title !== '' && p.title !== name)
        let updateP = []
        if (e === 0 || e === '0') {
            updateP = newP.filter(p => p.title !== title)
        } else {
            updateP = newP
        }
        newP.push({ title: name, value: e })
        oldForm.propertys = updateP
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
        handlePhoto(image)
        router.push(`${pathName}?${params}`)
        // const oldForm = { ...form }
        // const images = oldForm.images?.filter(e => e !== image)
        // oldForm.images = images

        // setForm(oldForm)
    }


    function handleClose() {
        params.delete('openM')
        router.push(`${pathName}?${params}`)
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '40rem',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
    }

    function handlePhoto(e: string) {

        let images: string[] = params.get('images')?.split(',') || []
        let nImg: string[] = []
        if (images.includes(e)) {
            nImg = images.filter(i => i !== e)
        } else {
            if (images.length > 0) nImg = images
            nImg.push(e)
        }
        images = nImg
        const newImage = images?.join(',')
        params.delete('images')
        images.length > 0 && params.set('images', newImage)
        router.push(`${pathName}?${params}`)
        console.log('images', images, params.toString())

    }

    if (form === undefined) {
        return <h3>loading...</h3>
    }

    // console.log('images', params.toString());
    // console.log('form', form)
    // console.log('propertySelectData', propertySelectData)

    return (
        <>
            <Modal
                sx={{ overflowY: 'scroll' }}
                disableScrollLock={false}
                open={openM}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h5 className="text-md font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                            ویرایش دستمزد و ساعت شروع کار
                        </h5>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 20 }}>
                        <section className="flex relative flex-col w-full p-10 my-2">
                            <div className="sm:flex items-center justify-between">
                                <h2 className="text-lg w-full justify-center text-center font-medium text-gray-800 dark:text-white">
                                    فایل های بارگذاری شده
                                </h2>

                            </div>

                            <div className="flex flex-col mt-2">
                                <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                        <div className=" grid grid-cols-4 gap-1 h-full overflow-auto mt-2">
                                            {gallerys?.length > 0 && gallerys.map((galler) => (
                                                <div
                                                    className='flex'
                                                    key={galler._id}
                                                >
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
                                                                                defaultChecked={params.get('images')?.includes(galler.url) ? true : false}
                                                                                onChange={() => handlePhoto(galler.url)}
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
                                    onClick={handleClose}
                                >
                                    برگشت
                                </ButtonWithRipple>

                            </div>
                        </section>
                    </Typography>
                </Box>
            </Modal>

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
                        <TextField
                            type="text"
                            fullWidth
                            size="small"
                            value={form?.title}
                            id="title"
                            name="title"
                            label="نام محصول"
                            onChange={(value) => handleInputStateChange('title', value.target.value)}
                            required
                        />

                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TextField
                            type="text"
                            fullWidth
                            size="small"
                            value={form?.description}
                            id="description"
                            name="description"
                            label="مشخصات محصول"
                            onChange={(value) => handleInputStateChange('description', value.target.value)}
                            required
                        />
                        {/* <TETextarea
                            type="text"
                            value={form?.description}
                            size='lg'
                            id="description"
                            name="description"
                            label="مشخصات محصول"
                            onChange={(value) => handleInputStateChange('description', value.target.value)}
                            required
                        ></TETextarea> */}
                    </div>

                    {/* <div className="relative mb-3 xl:w-96 pt-5">
                        <TextField
                            type="text"
                            size="small"
                            fullWidth
                            value={form?.recipe}
                            id="recipe"
                            name="recipe"
                            label="محتویات محصول"
                            onChange={(value) => handleInputStateChange('recipe', value.target.value)}
                            required
                        />

                    </div> */}

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TextField
                            type="text"
                            fullWidth
                            size="small"
                            value={form?.recipe}
                            id="recipe"
                            name="recipe"
                            label="قیمت محصول"
                            onChange={(value) => handleInputStateChange('recipe', value.target.value)}
                            required
                        />

                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <TextField
                            type="number"
                            fullWidth
                            size="small"
                            value={form?.stock}
                            id="stock"
                            name="stock"
                            label="تعداد محصول"
                            onChange={(value) => handleInputStateChange('stock', value.target.value)}
                            required
                        />

                    </div>

                    <div className="relative mb-3 xl:w-96 pt-5">
                        <FormControl sx={{ minWidth: 120, width: 350 }} size="small">
                            <InputLabel id="category-label">دسته بندی</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={form.category._id}
                                label="category"
                                onChange={e => handleSelectStateChange('category', e.target.value)}
                            >

                                {
                                    categorySelectOptions && categorySelectOptions.map((option: { value: string, name: string }, index: number) => (

                                        <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* <HSelect
                            value={{ id: form.category?.name!, name: form.category?.name! }}
                            options={categorySelectOptions!}
                            handleStateChange={e => handleSelectStateChange('category', e)}
                        /> */}
                    </div>

                    {propertySelectData.length > 0 && propertySelectData.map((property: any, index: number) => (
                        <div key={index} className="relative mb-3 xl:w-96 pt-5">
                            {/* <span>{property[0]}</span> */}
                            <FormControl sx={{ minWidth: 120, width: 350 }} size="small">
                                <InputLabel id={`property-label${index}`}>{`انتخاب مقدار ${property[0]}`}</InputLabel>

                                <Select
                                    labelId={`property-label${index}`}
                                    id={`property${index}`}
                                    value={form.propertys?.[index]?.value!}
                                    label="property"
                                    onChange={e => handleSelectpropertyChange(property[0], e.target.value, index)}
                                >
                                    <MenuItem key={index} value={0}>بدون استفاده</MenuItem>
                                    {
                                        property[1] && property[1].map((option: { value: string, name: string }, index: number) => (

                                            <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
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
                                {/* <LinkWithRipple
                                    name='addPhoto'
                                    href={`/dashboard/product/addPhoto/${_id || 'add'}?${query}`}
                                >
                                    <span>انتخاب کردن عکس جدید</span>
                                    <Tooltip anchorSelect="#addPhoto" clickable>
                                        <button>انتخاب کردن عکس جدید</button>
                                    </Tooltip>
                                </LinkWithRipple> */}
                                <LinkWithRipple
                                    name={'addPhoto'}
                                    href={`?${stringified}&${new URLSearchParams({
                                        // name: p.name,
                                        openM: 'true'
                                    })}`}
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
                                        {params.get('images')?.split(',') && form.images ? params.get('images')?.split(',').map((gallery) => (
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
                                                                        onClick={() => handlePhoto(gallery)}
                                                                    >

                                                                        <HiOutlineTrash color='red' />
                                                                    </div>
                                                                </div>
                                                            </TERipple>
                                                        </div>
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