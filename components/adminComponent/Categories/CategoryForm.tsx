'use client'

import SubmitButton from '@/components/ui/components/Button/SubmitButton'
import axios from 'axios'
import Select from 'react-select'
import TEInput from "@/components/ui/components/Input/Input"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
import { useSession } from 'next-auth/react'
import TETextarea from '@/components/ui/components/Textarea/TETextarea'
import { CAT, SelectValue, Property } from '@/type'

function CategoryForm({ categoryInfo }: { categoryInfo: CAT }) {

    const router = useRouter()

    const { name: editName, parent: editParent, propertys: editPropertys, _id } = categoryInfo

    const [form, setForm] = useState<CAT>()

    const [parent, setParent] = useState<SelectValue>()

    const [isLoading, setIsLoading] = useState(false)

    const [isSelectLoading, setIsSelectLoading] = useState(true)

    const [propertys, setPropertys] = useState<Property[]>(editPropertys?.map(({ values, ...editPropertys }) => ({
        ...editPropertys,
        values: values.join(',')
    })) || [])

    const [selectOptions, setSelectOptions] = useState<SelectValue[]>([])

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const accessToken = session?.user && session?.user?.accessToken || ''

    function handleStateChange(fieldName: string, value: any) {

        if (fieldName === 'parent' && value !== undefined) {
            setForm((prevState) => ({ ...prevState, [fieldName]: value?.value }))
            setParent(value)
        } else {
            setForm((prevState) => ({ ...prevState, [fieldName]: value }))
        }

    }

    function handleNameProperty(index: number, value: string) {

        setPropertys(prev => {
            const p = [...prev]
            p[index].name = value
            return p
        })

    }

    function handleValueProperty(index: number, value: string) {

        setPropertys(prev => {
            const p = [...prev]
            p[index].values = value
            return p
        })

    }

    function handleDeleteProperty(index: number) {

        setPropertys((prev) => {
            return [...prev].filter((p, pIndex) => { return pIndex !== index })

        })

    }

    useEffect(() => {
        setForm((prevState) => ({ ...prevState, name: editName }))
    }, [editName])


    useEffect(() => {

        accessToken && axios.get('/api/category', {

            headers: {
                Authorization: `${accessToken}`
            }

        }).then(response => {
            const options: SelectValue[] = []

            const allCategories = response.data.categorys

            allCategories.forEach((element: CAT) => {
                options.push({ value: element._id!, label: element.name! })
            })

            setSelectOptions(options)
        })
    }, [accessToken])

    useEffect(() => {

        if (_id) {

            const defultSelect = selectOptions.filter(option => option.value === editParent)

            handleStateChange('parent', defultSelect[0])
        }

        setIsSelectLoading(false)

    }, [selectOptions, editParent, _id])

    async function handleSubmit(e: any) {

        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        const data = Object.fromEntries(formData)


        if (data.name) {
            const label = data.name.split(' ').join('_')
            // const label = data.name.replace(/\s/g, 'ـ')
            data.slug = label
        }

        if (!data.parent) {
            delete data.parent
        }


        const allProperty = propertys.map((proper: Property) => (
            {
                name: proper.name,
                values: proper.values.split(',')
            }
        ))
        data.propertys = allProperty


        // if (propertys?.length > 0) {
        //     const allProperty = propertys.map((proper: Property) => (
        //         {
        //             name: proper.name,
        //             values: proper.values.split(',')
        //         }
        //     ))
        //     data.propertys = allProperty
        // } else {
        //     data.propertys = []
        // }

        console.log('data', data)

        if (_id) {
            await axios.patch('/api/category/' + _id, { data }, {

                headers: {
                    Authorization: `${accessToken}`
                }

            })
            router.push('/dashboard/category')
        } else {

            await axios.post('/api/category', { data }, {

                headers: {
                    Authorization: `${accessToken}`
                }

            })
            setForm(undefined)
            setParent(undefined)
            setIsLoading(false)
        }

        setIsLoading(false)

        setIsSelectLoading(true)


    }

    function handleCancel() {
        router.push('/dashboard/category')
    }

    function handleProperty() {

        setPropertys(prev => {
            return [...prev, { name: '', values: '' }]
        })

    }

    console.log('form', form)
    // console.log('property', propertys)

    return (
        <div className=" flex w-full mt-4 h-24rem">
            <form
                onSubmit={handleSubmit}
                className=" flex space-y-6 w-full gap-y-2 h-full flex-col" >
                <div className=' flex flex-col w-full h-full gap-2'>

                    <div className="flex flex-col w-full gap-2 h-full pt-5">
                        <TEInput
                            type="text"
                            size='lg'
                            value={form?.name}
                            onChange={e => handleStateChange('name', e.target.value)}
                            id="name"
                            name="name"
                            label="نام دسته بندی"
                            required
                        ></TEInput>

                        <Select
                            name='parent'
                            onChange={e => handleStateChange('parent', e)}
                            isLoading={isSelectLoading}
                            value={parent}
                            options={selectOptions}
                            classNamePrefix="select"
                            isDisabled={false}
                            isClearable={true}
                            isRtl={true}
                            isSearchable={true}
                            className="basic-single"
                            placeholder={"دسته اصلی"}

                        />
                    </div>
                    <div className=' flex flex-col max-h-64 overflow-y-auto gap-2 border-t-2 p-2 w-full '>
                        <h1>ویژگی ها</h1>

                        {propertys.length > 0 && propertys.map((p, index) => (
                            <div
                                className=' flex flex-col border rounded-md p-3 gap-3 w-full'
                                key={index}
                            >

                                <TEInput
                                    type="text"
                                    // size='lg'
                                    value={propertys[index].name}
                                    onChange={e => handleNameProperty(index, e.target.value)}
                                    id={`nameId_${index}`}
                                    // name={`name_${index}`}
                                    label="نام ویژگی"
                                    required
                                ></TEInput>

                                <TETextarea
                                    type="text"
                                    size='lg'
                                    className=''
                                    value={propertys[index]?.values}
                                    onChange={e => handleValueProperty(index, e.target.value)}
                                    id={`valueId_${index}`}
                                    // name={`value_${index}`}
                                    label="نام مقدار ویژگی"
                                    required
                                ></TETextarea>

                                <ButtonWithRipple
                                    name='remove'
                                    onClick={() => handleDeleteProperty(index)}
                                >
                                    حذف
                                </ButtonWithRipple>

                            </div>
                        ))}
                        <div className=' flex w-full mt-4'>

                            <ButtonWithRipple
                                name='addPropertis'
                                size='large'
                                onClick={handleProperty}
                            >
                                اضافه کردن ویژگی جدید
                            </ButtonWithRipple>
                        </div>

                    </div>

                    <div className=' flex flex-col justify-between w-full gap-3 items-center border-t-2 p-2' >

                        <SubmitButton
                            size='large'
                            name='submit'
                        >
                            {
                                !_id ? !isLoading ? <span>ثبت دسته بندی جدید </span> : <span> در حال اضافه کردن دسته بندی جدید... </span> : !isLoading ? <span>ویرایش</span> : <span>در حال ویرایش...</span>
                            }
                        </SubmitButton>

                        <ButtonWithRipple
                            name='cancel'
                            color='purple'
                            size='large'
                            onClick={handleCancel}
                        >
                            انصراف
                        </ButtonWithRipple>
                    </div>

                </div>

            </form>
        </div>
    )
}

export default CategoryForm