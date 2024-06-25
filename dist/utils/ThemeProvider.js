'use client';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
// import Vazir from "../public/font/Vazir.woff2"
import createCache from "@emotion/cache";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CacheProvider } from "@emotion/react";
// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
});
export default function ThemeDirection({ children, }) {
    // const themeMode = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    const searchParams = useSearchParams();
    // const themeMode = 'dark'
    const themeMode = searchParams.get('theme') === 'dark' ? 'dark' : 'light';
    const getDesignTokens = (mode) => ({
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
    return (<CacheProvider value={cacheRtl}>
            <ThemeProvider theme={allTheme}>
                <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
        }}>
                    {children}
                </Box>
            </ThemeProvider>
        </CacheProvider>);
}
//# sourceMappingURL=ThemeProvider.js.map