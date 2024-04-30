'use client'

import Image from 'next/image'
import TERipple from '@/components/ui/components/Ripple/Ripple'
import AnimateCharacter from './AnimateCharacter'

type Props = {
    banner: string
    item: string
}

function Banner({ banner, item }: Props) {
    return (
        <TERipple rippleColor="light">
            <div className=' relative flex w-full h-60'>
                <Image
                    src={`/uploads/images/${banner}`}
                    fill={true}
                    // width="548"
                    // height="599"
                    // placeholder="blur"
                    // blurDataURL="data:image/jpeg..."
                    priority={true}
                    alt={banner}
                />

                <AnimateCharacter
                    className='absolute bottom-3 text-xs left-3 justify-end text-white bg-zinc-800 rounded px-1'
                    textClassName='font-Kokia uppercase'
                    text={`${item} ~ romance`}
                    el='span'
                />
            </div>
        </TERipple>
    )
}

export default Banner