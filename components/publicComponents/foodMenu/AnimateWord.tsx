'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Props = {
    text: string
    el: keyof JSX.IntrinsicElements
    className: string
    textClassName: string
    once?: boolean
}

const defaultAnimation = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,

    }
}

function AnimateWord({
    text,
    el: Wrapper = 'p',
    className,
    textClassName,
    once
}: Props) {

    const ref = useRef(null)

    const isInView = useInView(ref, { amount: 0.1, once })

    return <Wrapper className={className}>
        <motion.span
            ref={ref}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.035 }}
            aria-hidden
        >
            {text.split(' ').map((word, index) => (<span key={index}>
                <motion.span
                    className={textClassName}
                    variants={defaultAnimation}
                >
                    {word}
                </motion.span>
                <span>&nbsp;</span>
            </span>
            ))}
        </motion.span>
    </Wrapper>
}

export default AnimateWord