'use client'

import Image from 'next/image'
import SidebarItems from './SidebarItems'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const AdminSidebar = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const sidebarControl = searchParams.get('sidebarControl') === 'true' ? true : false
    const theme = searchParams.get('theme') || 'light'

    const params: URLSearchParams = new URLSearchParams(searchParams)
    const toggleSidebar = () => {


        sidebarControl ? params.set('sidebarControl', 'false') : params.set('sidebarControl', 'true')
        params.set('theme', theme)
        router.push(`${pathName}?${params}`)

    }
    const resetParams = params
    resetParams.set('sidebarControl', 'false')
    resetParams.set('sidebarVisible', 'false')
    resetParams.set('theme', theme)

    return (
        <>
            <Link
                href={`/?theme=${theme}`}
                className=' flex py-2 border-b-2 h-10 justify-center items-center'
            >
                <Image width={30} height={30} className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="" />
            </Link >

            <div className="flex flex-col overflow-y-auto h-96 overflow-x-hidden justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                    <SidebarItems params={resetParams} title={sidebarControl ? false : true} />
                </nav>
            </div>
            <div className="flex h-13 justify-center py-2 border-t-2 items-center">

                <button
                    onClick={toggleSidebar}
                    type="button"
                    className={`${sidebarControl ?? 'rotate-180 translate-x-5'}transition-transform duration-200 border  hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center`}>
                    <svg aria-hidden="true" className='w-5 h-5' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Icon description</span>
                </button>

            </div>
        </ >
    )
}

export default AdminSidebar