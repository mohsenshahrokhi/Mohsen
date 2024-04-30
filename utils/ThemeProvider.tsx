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


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ThemeDirection({
    children,
}: {
    children: React.ReactNode
}) {

    // const themeMode = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    const searchParams = useSearchParams()
    const themeSystem = useMediaQuery('(prefers-color-scheme: dark)');
    // const themeMode = 'dark'
    const themeMode = searchParams.get('theme') === 'dark' ? 'dark' : 'light'
    const theme = useTheme()
    // console.log('themeMode', themeMode, theme, searchParams.get('theme'))
    // localStorage.setItem('theme', themeMode);

    // const theme = React.useMemo(() => createTheme({
    //     palette: {
    //         mode: themeMode
    //     },
    //     typography: {
    //         fontFamily: 'Vazir',
    //     },
    //     components: {
    //         MuiTypography: {
    //             defaultProps: {
    //                 variantMapping: {
    //                     h1: 'h2',
    //                     h2: 'h2',
    //                     h3: 'h2',
    //                     h4: 'h2',
    //                     h5: 'h2',
    //                     h6: 'h2',
    //                     subtitle1: 'h2',
    //                     subtitle2: 'h2',
    //                     body1: 'span',
    //                     body2: 'span',
    //                 },
    //             },
    //         },
    //         MuiCssBaseline: {
    //             styleOverrides: `
    //         @font-face {
    //           font-family: 'Vazir';
    //           font-style: normal;
    //           font-display: swap;
    //           font-weight: 400;
    //           src: local('Vazir'), local('Vazir'), url(/fonts/Vazir.woff2) format('woff2');
    //           unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //         }
    //       `,
    //         },
    //     },
    //     direction: "rtl"
    // }), [themeMode])
    // const getDesignTokens = (mode: PaletteMode) => ({
    //     palette: {
    //         mode
    //     },
    //     typography: {
    //         fontFamily: 'Vazir',
    //     },
    //     components: {
    //         MuiTypography: {
    //             defaultProps: {
    //                 variantMapping: {
    //                     h1: 'h2',
    //                     h2: 'h2',
    //                     h3: 'h2',
    //                     h4: 'h2',
    //                     h5: 'h2',
    //                     h6: 'h2',
    //                     subtitle1: 'h2',
    //                     subtitle2: 'h2',
    //                     body1: 'span',
    //                     body2: 'span',
    //                 },
    //             },
    //         },
    //         MuiCssBaseline: {
    //             styleOverrides: `
    //             @font-face {
    //               font-family: 'Vazir';
    //               font-style: normal;
    //               font-display: swap;
    //               font-weight: 400;
    //               src: local('Vazir'), local('Vazir'), url(/fonts/Vazir.woff2) format('woff2');
    //               unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //             }
    //           `,
    //         },
    //     },
    //     direction: "rtl"
    // });

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
            fontFamily: 'Vazir',
        },
        // components: {
        //     MuiCssBaseline: {
        //         styleOverrides: `
        //             @font-face {
        //               font-family: 'Vazir';
        //               font-style: normal;
        //               font-display: swap;
        //               font-weight: 400;
        //               src: local('Vazir'), local('Vazir'), url(../public/fonts/Vazir.woff2) format('woff2');
        //               unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        //             }
        //           `,
        //     },
        // }
    });

    // const allTheme = React.useMemo(
    //     () =>
    //         createTheme({
    //             palette: {
    //                 mode,
    //             },
    //         }),
    //     [mode],
    // );
    // console.log('mode', mode);

    const allTheme = React.useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);
    return (
        <CacheProvider value={cacheRtl} >
            {/* <ColorModeContext.Provider value={colorMode}> */}
            <ThemeProvider theme={allTheme}>
                {/* <MyApp /> */}
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
            {/* </ColorModeContext.Provider> */}
        </CacheProvider>
    )
}

function useMemo(arg0: () => import("@mui/material/styles").Theme, arg1: string[]) {
    throw new Error("Function not implemented.")
}
