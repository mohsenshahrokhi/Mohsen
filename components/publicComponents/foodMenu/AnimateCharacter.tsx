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
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,

    }
}

function AnimateCharacter({
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
            className=' items-center flex'
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.035 }}
            aria-hidden
        >
            {text.split(' ').map((word, index) => (
                <span className=' inline-block' key={word}>
                    {word.split('').map((char, index) => (
                        <motion.span
                            className={textClassName}
                            variants={defaultAnimation}
                            key={index}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {index > 1 && <span className=' inline-block'>&nbsp;</span>}
                </span>
            ))}
        </motion.span>
    </Wrapper>
}

export default AnimateCharacter