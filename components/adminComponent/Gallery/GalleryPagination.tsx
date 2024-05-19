import { Box, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Props = {
    page: number
    stringified: string
    totalPage: number
}

export default function GalleryPagination({ page, stringified, totalPage }: Props) {

    const prevPage = `?page=${page - 1 > 0 ? page - 1 : 1}&${stringified}`
    const nextPage = `?page=${page + 1}&${stringified}`

    const pageNumber = []
    const offsetPage = 3

    for (let i = page - offsetPage; i <= page + offsetPage; i++) {
        if (i >= 1 && i <= totalPage) pageNumber.push(i)
    }

    return (
        <Box component={'div'} className="flex items-center justify-between mt-6">
            {page === 1 ? (
                <Button
                    disabled={true}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <Box component={'span'}>
                        قبلی
                    </Box>
                </Button>
            ) : (
                <Button>
                    <Link
                        href={`${prevPage}`}
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <Box component={'span'}>
                            قبلی
                        </Box>
                    </Link>
                </Button>
            )}

            <Box component={'div'} className="items-center hidden md:flex gap-x-3">
                {pageNumber.map((p, index) => (

                    <Link
                        key={index}
                        href={`?page=${p}&${stringified}`}
                        className={`px-2 py-1 text-sm  rounded-md ${page === p ? 'bg-blue-500 text-white' : 'bg-blue-100/60 text-blue-500'} `}
                    >{p}</Link>
                ))}
            </Box>
            {page === totalPage ? (
                <Button
                    disabled={true}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                >
                    <Box component={'span'}>
                        بعدی
                    </Box>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Button>
            ) : (
                <Link
                    href={`${nextPage}`}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                >
                    <Box component={'span'}>
                        بعدی
                    </Box>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>)}
        </Box>
    );
}