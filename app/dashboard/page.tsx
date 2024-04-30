'use client'

import { Box, Button } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}
export default function Dashboard({ searchParams }: Props) {

    const router = useRouter()
    const params = queryString.stringify(searchParams)
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/phone?${params}`)
        },
    })

    return (
        <div>
            <div>

                داشبورد : {session?.user.role}
                <Box

                    component={'p'}
                >

                    <Button className=' font'>
                        داشبورد : {session?.user.role}
                    </Button>
                </Box>

            </div>
        </div>
    )
}

