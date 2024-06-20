import { activateUser } from '@/actions/register'
import Link from 'next/link'
import React from 'react'

type Props = {
    params: {
        jwt: string
    }
}

async function ActivationPage({ params }: Props) {

    const result = await activateUser(params.jwt)

    return (
        <div className='flex justify-center items-center h-screen w-screen'>{result === 'userNotExist' ? <div><p className=' text-red-500 text-2xl'>کاربر وجود ندارد</p><Link className=' text-blue-500 text-center border border-blue-500 rounded-md p-3' href={'/'}>انتقال به صفحه اصلی</Link></div> :
            result === 'alreadyActivated' ? <div className=' flex flex-col gap-3'><p className=' text-red-500 text-2xl'>ایمیل فعال است</p><Link className=' text-blue-500 text-center border border-blue-500 rounded-md p-3' href={'/dashboard'}>ورود به حساب کاربری</Link></div> :
                result === 'success' ? <div className=' flex flex-col gap-3'><p className=' text-green-500 text-2xl'>ایمیل حساب کاربری شما تایید شد</p> <Link className='  text-blue-500 text-center border border-blue-500 rounded-md p-3' href={'/dashboard'}>ورود به حساب کاربری</Link></div> :
                    <div><p className=' text-yellow-500 text-2xl'>سرور مشکل دارد لطفا بعدا تلاش کنید</p><Link className=' text-blue-500 text-center border border-blue-500 rounded-md p-3' href={'/'}>انتقال به صفحه اصلی</Link></div>}</div>
    )
}

export default ActivationPage