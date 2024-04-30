'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import TEInput from "@/components/ui/components/Input/Input"
import TERipple from '@/components/ui/components/Ripple/Ripple'
import Select, { GroupBase, OptionsOrGroups } from 'react-select'
import { useRouter } from 'next/navigation'
import TETextarea from '@/components/ui/components/Textarea/TETextarea'
import { useSession } from 'next-auth/react'
import { CAT, SelectValue, User, Use } from '@/type'

function UserForm({ userId }: Use) {

    const router = useRouter()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    const accessToken = session?.user && session?.user?.accessToken || ''

    const [form, setForm] = useState<User>({
        name: '',
        email: '',
        address: '',
        description: '',
        mobile: '',
        password: '',
        role: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const [isRoleSelectLoading, setIsRoleSelectLoading] = useState(true)

    const [roleSelectOptions, setroleSelectOptions] = useState<OptionsOrGroups<string, GroupBase<string>>>()
    const [role, setRole] = useState({})

    useEffect(() => {

        accessToken && axios.get('/api/category/64d7e4d9c0cc659f800037fc', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {

            const options: any[] = []

            const allCategorie = response.data.category
            const arrCats = allCategorie.propertys[0].values[0].split('،')

            arrCats.forEach((element: CAT) => {

                options.push({ value: element, label: element })

            })
            setroleSelectOptions(options)

        })

    }, [accessToken])

    useEffect(() => {
        userId && accessToken && axios.get(`/api/user/${userId}`, {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then((response) => {
            setForm(response.data.user)
            const role = response.data.user.role
            setRole({ value: role, label: role })
        })
        setIsRoleSelectLoading(false)
    }, [userId, accessToken])

    async function saveProduct(e: any) {

        e.preventDefault()

        setIsLoading(true)

        if (userId) {

            console.log('data', form)

            await axios.patch('/api/user/' + userId, { form }, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })

        } else {
            console.log('data', form)

            await axios.post('/api/user', { form }, {
                headers: {
                    Authorization: `${accessToken}`
                }
            })

        }

        setIsLoading(false)

        router.push('/dashboard/user')

    }

    if (form === undefined) {
        return <h3>loading...</h3>
    }

    function handleInputStateChange(fieldName: string, value: string) {

        setForm((prevState) => ({ ...prevState, [fieldName]: value }))

    }


    function handleSelectStateChange(fieldName: string, value: SelectValue) {

        setForm((prevState) => ({ ...prevState, [fieldName]: value?.value }))

        setRole(value)

    }

    // console.log('form', form)

    return (

        <form
            onSubmit={saveProduct}
            className="space-y-6 flex gap-y-2 flex-col" >
            {userId ? <h3>
                {`ویرایش کاربر ( ${form?.name} )`}
            </h3> : <h3>
                اضافه کردن کاربر جدید

            </h3>}
            <div className='grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-1 gap-x-4'>

                <div className="relative mb-3 xl:w-96 pt-5">
                    <TEInput
                        type="text"
                        value={form?.name}
                        size='lg'
                        id="name"
                        name="name"
                        label="نام کاربر"
                        onChange={(value) => handleInputStateChange('name', value.target.value)}
                        required
                    ></TEInput>
                </div>

                <div className="relative mb-3 xl:w-96 pt-5">
                    <TEInput
                        type="email"
                        value={form?.email}
                        disabled={userId ? true : false}
                        size='lg'
                        id="email"
                        name="email"
                        label="ایمیل کاربر"
                        onChange={(value) => handleInputStateChange('email', value.target.value)}
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
                        label="توضیحات کاربر"
                        onChange={(value) => handleInputStateChange('description', value.target.value)}
                    ></TETextarea>
                </div>

                <div className="relative mb-3 xl:w-96 pt-5">
                    <TETextarea
                        type="text"
                        value={form?.address}
                        size='lg'
                        id="address"
                        name="address"
                        label="آدرس کاربر"
                        onChange={(value) => handleInputStateChange('address', value.target.value)}
                    ></TETextarea>
                </div>

                <div className="relative mb-3 xl:w-96 pt-5">
                    <TEInput
                        type="number"
                        value={form?.mobile}
                        size='lg'
                        id="mobile"
                        name="mobile"
                        label="شماره مبایل کاربر"
                        onChange={(value) => handleInputStateChange('mobile', value.target.value)}
                        required
                    ></TEInput>
                </div>

                <div className="relative mb-3 xl:w-96 pt-5">
                    <TEInput
                        type="text"
                        value={form?.mobile}
                        disabled={userId ? true : false}
                        size='lg'
                        id="password"
                        name="password"
                        label="گذر واژه کاربر"
                        onChange={(value) => handleInputStateChange('password', value.target.value)}
                        required
                    ></TEInput>
                </div>

                <div className="relative mb-3 xl:w-96 pt-5">
                    <Select
                        id='role'
                        name='role'
                        onChange={e => e && handleSelectStateChange('role', e)}
                        isLoading={isRoleSelectLoading}
                        value={role}
                        options={roleSelectOptions}
                        classNamePrefix="select"
                        isDisabled={false}
                        isClearable={true}
                        isRtl={true}
                        isSearchable={true}
                        className="basic-single"
                        placeholder={"سطح دسترسی"}

                    />
                </div>

            </div>


            <div className="flex items-start">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <a href="#" className="mr-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password ?</a>
            </div>
            <TERipple rippleColor="white">

                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                    {
                        !userId ? !isLoading ? <span>ثبت کاربر جدید </span> : <span> در حال اضافه کردن کاربر جدید... </span> : !isLoading ? <span>ویرایش</span> : <span>در حال ویرایش...</span>
                    }
                </button>
            </TERipple>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered ? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
            </div>
        </form>

    )
}

export default UserForm