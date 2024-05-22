'use client'

import Gallery from '@/components/adminComponent/Gallery/Gallery'
import { useParams, useSearchParams } from "next/navigation"

function AddPhoto() {
    const { pId } = useParams()
    // const params = new URLSearchParams(useSearchParams())
    // params.delete('time')
    // console.log(params)

    return <Gallery apiToo='product' searchParams={useSearchParams().toString()} itemId={pId || '0'} />
}

export default AddPhoto