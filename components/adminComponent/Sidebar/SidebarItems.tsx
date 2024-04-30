'use client'

// import { useAppSelector } from '@/store/hooks'
import { useSession } from 'next-auth/react'
import { GrGallery, GrUserAdmin } from 'react-icons/gr'
import { LiaFileInvoiceDollarSolid, LiaProductHunt } from 'react-icons/lia'
import { CiSettings, CiUser } from 'react-icons/ci'
import { BiCategory } from 'react-icons/bi'
import { TfiPanel } from 'react-icons/tfi'
import Link from 'next/link'
import React from 'react'

type Props = {
    title: boolean
    params: URLSearchParams
}

import { usePathname, useRouter } from "next/navigation"
import { AiOutlineDashboard } from 'react-icons/ai'

const SidebarItems = ({ title, params }: Props) => {

    const carentRoute = usePathname()

    const router = useRouter()

    // const { color } = useAppSelector((store) => store.themeMode.theme)

    const { data: session } = useSession()

    const accessRole = session?.user && session?.user?.role || ''

    const sidebarItems = [
        {
            label: 'Admin',
            items: [
                {
                    title: 'Dashboard',
                    accessRolse: ['2'],
                    icon: <GrUserAdmin />,
                    href: '/dashboard',

                },
                {
                    title: 'Settings',
                    accessRolse: ['2'],
                    icon: <CiSettings />,
                    href: '/dashboard/siteSettings',

                },
                {
                    title: 'Products',
                    accessRolse: ["مدیر کل"],
                    icon: <LiaProductHunt />,
                    href: '/dashboard/product',

                },
                {
                    title: 'Invoice',
                    accessRolse: ["مدیر کل"],
                    icon: <LiaFileInvoiceDollarSolid />,
                    href: '/dashboard/invoice',

                },
                {
                    title: 'Users',
                    accessRolse: ["مدیر کل"],
                    icon: <CiUser />,
                    href: '/dashboard/user',

                },
                {
                    title: 'Category',
                    accessRolse: ["مدیر کل"],
                    icon: <BiCategory />,
                    href: '/dashboard/category?limit=400&select=name%2Ctype%2CeName%2Cparent',

                },
                {
                    title: 'Gallery',
                    accessRolse: ["مدیر کل"],
                    icon: <GrGallery />,
                    href: '/dashboard/gallery',

                }
            ]
        }, {
            label: 'User',
            items: [
                {
                    title: 'userDashboard',
                    accessRolse: ["مدیر کل", 'کاربر'],
                    icon: <AiOutlineDashboard />,
                    href: '/userDashboard',

                },
                {
                    title: 'userSettings',
                    accessRolse: ["مدیر کل", 'کاربر'],
                    icon: <TfiPanel />,
                    href: '#',

                },
                {
                    title: 'Products',
                    accessRolse: ['کاربر'],
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>,
                    href: '#',

                },
                {
                    title: 'Users',
                    accessRolse: ['کاربر'],
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>,
                    href: '#',

                },
                {
                    title: 'Options',
                    accessRolse: ['کاربر'],
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>,
                    href: '#',

                }
            ]
        },

    ]

    return (
        <div className={`space-y-3 ${!title && 'flex flex-col items-center'} `}>

            {
                sidebarItems?.map((item, index) => (
                    <div key={index}
                        className=' flex flex-col p-3'
                    >

                        {title && <label className={`px-3 text-xs uppercase mb-2`}>{item.label}</label>}

                        {item.items?.map((i, index) => (
                            <div
                                className={`flex items-center p-3 mb-1 rounded-md transition-colors duration-300 transform hover:bg-zinc-300 hover:text-zinc-800 ${(i.href === carentRoute ? 'bg-sky-200 ' : '')} ${i.accessRolse.includes(accessRole) ? '' : 'hidden'}`}
                                key={index}
                            >
                                <Link
                                    href={`${i.href}?${params}`}
                                    className=' flex w-full'
                                >
                                    {i.icon}
                                    {title && <span className="mx-2 text-sm font-medium">{i.title}</span>}
                                </Link>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}

export default SidebarItems