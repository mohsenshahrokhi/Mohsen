'use client'

import { createTheme, ThemeProvider } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl"
import { prefixer } from "stylis"
import useTheme from "@mui/material/styles/useTheme"
// import Vazir from "../public/font/Vazir.woff2"
import createCache from "@emotion/cache"
import { useSearchParams } from "next/navigation"
import useMediaQuery from "@mui/material/useMediaQuery"
import React from "react"
import { Box, IconButton, PaletteMode } from "@mui/material"
import { amber, deepOrange, grey } from "@mui/material/colors"
import { CacheProvider } from "@emotion/react"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
});

export default function ThemeDirection({
    children,
}: {
    children: React.ReactNode
}) {
    // const themeMode = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    const searchParams = useSearchParams()
    // const themeMode = 'dark'
    const themeMode = searchParams.get('theme') === 'dark' ? 'dark' : 'light'
    const getDesignTokens = (mode: PaletteMode) => ({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // palette values for light mode
                    primary: grey,
                    divider: grey[200],
                    text: {
                        primary: grey[900],
                        secondary: grey[800],
                    },
                    background: {
                        default: grey[100],
                        paper: grey[100],
                    }
                }
                : {
                    // palette values for dark mode
                    primary: grey,
                    divider: grey[700],
                    background: {
                        default: grey[900],
                        paper: grey[900],
                    },
                    text: {
                        primary: grey[100],
                        secondary: grey[500],
                    },
                }),
        },
        typography: {
            fontFamily: 'VazirmatnRegular',
        },
    });


    const allTheme = React.useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);
    return (
        <CacheProvider value={cacheRtl} >
            <ThemeProvider theme={allTheme}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.default',
                        color: 'text.primary',
                    }}
                >
                    {children}
                </Box>
            </ThemeProvider>
        </CacheProvider>
    )
}

// function useMemo(arg0: () => import("@mui/material/styles").Theme, arg1: string[]) {
//     throw new Error("Function not implemented.")
// }
