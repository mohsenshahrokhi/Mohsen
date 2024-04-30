'use client'

import Lottie from 'lottie-react'
import React from 'react'

type Props = {
    animationData: unknown
    loop: boolean
}

function Lootti({ animationData, loop }: Props) {
    return (
        <Lottie
            animationData={animationData}
            loop={loop}
            style={{ width: "100px", height: "100px" }}
        />
    )
}

export default Lootti