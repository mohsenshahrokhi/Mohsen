'use client'

import { SnackbarProvider } from 'notistack'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function ToustProvider({ children }: Props) {
    return (
        <SnackbarProvider maxSnack={5}>
            {children}
        </SnackbarProvider>
    )
}

export default ToustProvider