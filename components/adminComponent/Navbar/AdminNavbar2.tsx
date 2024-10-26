"use client";

import { Box, Button, IconButton, Toolbar, useTheme } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import queryString from "query-string";

const AdminNavbar2 = ({
  handleDrawerToggle,
}: {
  handleDrawerToggle: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const [userTheme, setUserTheme] = useState("");

  const toggleColorMode = useCallback(() => {
    localStorage.setItem("theme", userTheme === "light" ? "dark" : "light");
    const params = new URLSearchParams(searchParams || {});
    params.set("theme", userTheme === "light" ? "dark" : "light");
    router.push(`?${params.toString()}`);
  }, [router, searchParams, userTheme]);

  useEffect(() => {
    setUserTheme(localStorage.getItem("theme") || "dark");
  }, [toggleColorMode]);

  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{
          marginRight: 5,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Box component={"div"}>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {userTheme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box component={"div"} className=" flex w-130">
        {isAuth ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => signOut({ callbackUrl: "/" })}
            name="logout"
          >
            خروج {data?.user?.displayName || data?.user?.username}
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            href="/username"
            name="login"
          >
            ورود
          </Button>
        )}
      </Box>
    </Toolbar>
  );
};

export default AdminNavbar2;
