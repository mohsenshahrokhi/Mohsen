"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Box, PaletteMode } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { deepPurple, grey, indigo } from "@mui/material/colors";
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function ThemeDirection({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const themeMode = searchParams.get("theme") === "dark" ? "dark" : "light";
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      secondary: {
        main: "#e1e1e1",
      },
      defaultText: {
        main: "#f2f2f2",
      },
      bgColor: { main: indigo },
      bgColor1: { main: deepPurple },
    },
    typography: {
      fontFamily: "VazirmatnRegular",
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 960,
        desktop: 1280,
      },
    },
  });

  const allTheme = React.useMemo(
    () => createTheme({ ...getDesignTokens(themeMode), direction: "rtl" }),
    [themeMode]
  );
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={allTheme}>
        <Box
          component={"main"}
          sx={{
            display: "flex",
            width: "100%",
            maxHeight: "100%",
            // padding: 1,
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

// function useMemo(arg0: () => import("@mui/material/styles").Theme, arg1: string[]) {
//     throw new Error("Function not implemented.")
// }
