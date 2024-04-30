'use client'

import axios from 'axios'
import TEInput from "@/components/ui/components/Input/Input"
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
import { useSession } from 'next-auth/react'
import { CAT, SelectValue, AddCat, GalleryInfoProps } from '@/type'
import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import TERipple from '@/components/ui/components/Ripple/Ripple'
import SubmitButton from '@/components/ui/components/Button/SubmitButton'
import HSelect from '@/components/ui/components/HSelect/HSelect'

function CategoryForm({ categoryInfo }: { categoryInfo: AddCat }) {

    const router = useRouter()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const accessToken = session?.user && session?.user?.accessToken || ''

    const {
        name: editName,
        parent: editParent,
        propertys: editPropertys,
        _id,
        slug: editSlug,
        eName: editEName,
        colorIcon: editColorIcon,
        icon: editIcon,
        images: editImages,
        type: editType,
    } = categoryInfo


    const [parentSelectOptions, setParentSelectOptions] = useState<SelectValue[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let [selectIcon, setSelectIcon] = useState('')
    const [gallerys, setGallerys] = useState<GalleryInfoProps[]>([])
    const [form, setForm] = useState<AddCat>(
        {
            name: editName || '',
            slug: editSlug || '',
            parent: editParent || '',
            propertys: editPropertys || [{ name: '', values: '' }],
            eName: editEName || '',
            colorIcon: editColorIcon || '',
            icon: editIcon || '',
            images: editImages || [''],
            type: editType || ''
        }
    )
    const [selectParent, setSelectParent] = useState<SelectValue>({ id: '', name: '' })

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

    }, [getAllGallery])

    useEffect(() => {
        accessToken && axios.get('/api/category', {

            headers: {
                Authorization: `${accessToken}`
            }

        }).then(response => {
            const options: SelectValue[] = []
            let defultOption: SelectValue = { id: '', name: '' }

            const allCategories = response.data.categorys

            allCategories.forEach((element: CAT) => {
                options.push({ id: element._id!, name: element.name! })
                if (form.parent === element._id) {
                    defultOption = { id: element._id!, name: element.name! }
                }
            })

            setParentSelectOptions(options)
            setSelectParent(defultOption)
        })
    }, [accessToken, form.parent])

    function handleStateChange(fieldName: string, value: any) {

        if (fieldName === 'parent' && value !== undefined) {

            setForm((prevState) => ({ ...prevState, parent: value?.id }))
            setSelectParent(value)

        } else {
            setForm((prevState) => ({ ...prevState, [fieldName]: value }))
            if (fieldName === 'name' && value !== undefined) {
                const label = value.split(' ').join('_')
                setForm((prevState) => ({ ...prevState, slug: label }))
            }
        }

    }

    function handleProperty() {

        const oldForm = { ...form }
        oldForm?.propertys?.push({ name: '', values: '' })
        setForm(oldForm)

    }

    function handleNameProperty(index: number, value: string) {

        const oldForm = { ...form }
        oldForm.propertys![index].name = value
        setForm(oldForm)

    }

    function handleValueProperty(index: number, value: string) {

        const oldForm = { ...form }
        oldForm.propertys![index].values = value
        setForm(oldForm)

    }


    function handleDeleteProperty(index: number) {

        const oldForm = { ...form }
        oldForm.propertys!.splice(index, 1)
        setForm(oldForm)

    }

    function setCheckAdd(e: any) {
        const type = e ? '1' : ''
        setForm((prevState) => ({ ...prevState, type }))
    }

    function selected(e: string) {
        setIsOpen(true)
        setSelectIcon(e)
    }

    function setIcon(e: string) {

        if (selectIcon === 'images') {
            const oldForm = { ...form }
            if (oldForm.images?.includes(e)) {
                const has = oldForm.images?.filter(i => i !== e)
                oldForm.images = ['']
                has.length > 0 && has.map((i) => {
                    oldForm.images?.push(i)
                })
            } else oldForm.images?.push(e)
            setForm(oldForm)
        } else {
            setForm((prev) => ({ ...prev, [selectIcon]: e }))
            setIsOpen(false)
        }


    }

    const items = <div className=' flex flex-col gap-2 w-full border rounded-md p-2'>

        <TEInput
            name='eName'
            size='lg'
            label="نام لاتین"
            onChange={e => handleStateChange('eName', e.target.value)}
            value={form?.eName}
        />

        <div className=' flex gap-2 border rounded-md p-2 items-center justify-between w-full '>
            <p>آیکون سیاه و سفید</p>
            {form?.icon !== '' ? <Image
                className=' rounded-md shadow-md'
                src={`/uploads/images/${form?.icon}`}
                width={90}
                height={90}
                alt={form?.icon!}
            /> : <div className="flex items-center gap-x-3">
                <ButtonWithRipple
                    name='icon'
                    onClick={() => selected('icon')}
                >
                    انتخاب عکس
                </ButtonWithRipple>
            </div>
            }
        </div>

        <div className=' flex gap-2 border rounded-md p-2 items-center justify-between w-full '>
            <p>آیکون رنگی</p>
            {form?.colorIcon !== '' ? <Image
                className=' rounded-md'
                src={`/uploads/images/${form?.colorIcon}`}
                width={90}
                height={90}
                alt={form?.colorIcon!}
            /> : <div className="flex items-center gap-x-3">

                <ButtonWithRipple
                    name='colorIcon'
                    onClick={() => selected('colorIcon')}
                >
                    انتخاب عکس
                </ButtonWithRipple>

            </div>
            }
        </div>

        <div className=' flex gap-2 border rounded-md p-2 items-center justify-between w-full '>
            <p>گالری</p>
            {form?.images && form.images.length > 0 ? form.images.map((i) => (i !== '' && <Image
                key={i}
                className=' rounded-md'
                src={`/uploads/images/${i}`}
                width={90}
                height={90}
                alt={i}
            />)) : <div className="flex items-center gap-x-3">

                <ButtonWithRipple
                    name='colorIcon'
                    onClick={() => selected('images')}
                >
                    انتخاب عکس
                </ButtonWithRipple>

            </div>
            }
        </div>

    </div>

    async function handleSubmit(e: any) {

        e.preventDefault()
        setIsLoading(true)
        if (form.parent === '') delete form.parent
        if (_id) {
            await axios.patch('/api/category/' + _id, { data: form }, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })
        } else {
            await axios.post('/api/category', { data: form }, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })
        }
        router.push('/dashboard/category')
        setIsLoading(false)
    }

    return (
        <div className=" flex flex-col w-full">
            <Transition appear show={isOpen} as={Fragment}>
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Payment successful
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
                                                                            checked={false}
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
                                            color='red'
                                            name='cancel'
                                            onClick={() => setIsOpen(false)}
                                        >
                                            انصراف
                                        </ButtonWithRipple>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <form
                onSubmit={handleSubmit}
                className=" flex space-y-6 w-full gap-y-2 flex-col" >

                <div className="flex flex-col w-full gap-2 pt-5">

                    <TEInput
                        onChange={e => handleStateChange('name', e.target.value)}
                        value={form?.name}
                        type="text"
                        size='lg'
                        id="name"
                        name="name"
                        label="نام دسته بندی"
                        required
                    ></TEInput>

                    <HSelect
                        value={selectParent}
                        options={parentSelectOptions}
                        handleStateChange={e => handleStateChange('parent', e)}
                    />
                    {/* <Select
                        name='parent'
                        isLoading={selectLoading}
                        onChange={e => handleStateChange('parent', e)}
                        value={parent}
                        options={parentSelectOptions}
                        classNamePrefix="select"
                        isDisabled={false}
                        isClearable={true}
                        isRtl={true}
                        isSearchable={true}
                        className="basic-single"
                        placeholder={"دسته اصلی"}
                    /> */}
                    <div className=' flex flex-col w-full justify-between items-center mt-3'>
                        <div className='flex mb-3 w-full justify-between items-center'>
                            <p>اضافه کردن جزییات بیشتر</p>
                            <Checkbox id='addPhoto' checked={form.type === '1' ? true : false} setCheck={(e) => setCheckAdd(e)} />
                        </div>
                        {form?.type === '1' && items}
                    </div>
                </div>
                <div className=' flex flex-col max-h-80 overflow-y-auto gap-2 border-t-2 p-2 w-full '>
                    <h1>ویژگی ها</h1>

                    {form?.propertys && form.propertys?.length > 0 && form!.propertys?.map((p, index) => (
                        <div
                            className=' flex flex-col border rounded-md p-3 gap-3 w-full'
                            key={index}
                        >

                            <TEInput
                                type="text"
                                size='lg'
                                value={form?.propertys![index]?.name}
                                onChange={e => handleNameProperty(index, e.target.value)}
                                id={`nameId_${index}`}
                                label="نام ویژگی"
                                required
                            ></TEInput>

                            <TEInput
                                type="text"
                                size='lg'
                                value={form?.propertys![index]?.values}
                                onChange={e => handleValueProperty(index, e.target.value)}
                                id={`valueId_${index}`}
                                label="نام مقدار ویژگی"
                                required
                            ></TEInput>

                            <ButtonWithRipple
                                name='remove'
                                size='large'
                                onClick={() => handleDeleteProperty(index)}
                            >
                                حذف
                            </ButtonWithRipple>

                        </div>
                    ))}

                </div>

                <div className=' flex flex-col justify-between w-full gap-3 items-center border-t-2 p-2' >
                    <ButtonWithRipple
                        name='addPropertis'
                        color='green'
                        size='large'
                        onClick={handleProperty}
                    >
                        اضافه کردن ویژگی جدید
                    </ButtonWithRipple>

                    <SubmitButton
                        size='large'
                        name='submit'
                    >
                        {
                            !_id ? !isLoading ? ' ثبت دسته بندی جدید' : ' در حال اضافه کردن دسته بندی جدید...' : !isLoading ? 'ویرایش' : ' در حال ویرایش...'
                        }
                    </SubmitButton>

                    <ButtonWithRipple
                        name='cancel'
                        color='purple'
                        size='large'
                        onClick={() => router.push('/dashboard/category')}
                    >
                        انصراف
                    </ButtonWithRipple>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm