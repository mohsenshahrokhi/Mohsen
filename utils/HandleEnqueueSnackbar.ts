'use client'

import { enqueueSnackbar } from 'notistack'

type Props = {
    msg: string
    variant: "default" | "error" | "success" | "warning" | "info" | undefined
}

function HandleEnqueueSnackbar({ msg, variant }: Props) {
    return (
        enqueueSnackbar(msg, { variant })
    )
}

export default HandleEnqueueSnackbar