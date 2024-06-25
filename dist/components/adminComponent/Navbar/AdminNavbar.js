"use client";
import ToggleSidebar from "../Sidebar/ToggleSidebar";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Headroom from "react-headroom";
import { Box, Button, IconButton, Link } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useMemo } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
const AdminNavbar = () => {
    var _a, _b;
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { data, status } = useSession();
    const isAuth = status === "authenticated";
    const themeMode = searchParams.get("theme") === "dark" ? "dark" : "light";
    const breadcrumbs = pathName.split("/");
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            const params = new URLSearchParams(searchParams);
            localStorage.setItem("theme", themeMode === "light" ? "dark" : "light");
            params.set("theme", themeMode === "light" ? "dark" : "light");
            router.push(`${pathName}?${params}`);
        },
    }), [pathName, router, searchParams, themeMode]);
    let href = "";
    return (<Headroom>
      <div className=" flex w-full h-14 shadow-md items-center mb-2 py-2 px-5 justify-between border-b">
        <ToggleSidebar />
        <Box>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <div className=" flex w-130">
          {isAuth ? (<Button onClick={() => signOut({ callbackUrl: "/" })} name="logout">
              خروج {((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.displayName) || ((_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.username)}
            </Button>) : (<Button href="/username" name="login">
              ورود
            </Button>)}
        </div>
      </div>
      <div role="presentation">
        <Breadcrumbs className=" flex px-2" aria-label="breadcrumb">
          {breadcrumbs.map((path, index) => {
            if (index > 0)
                href = href.concat("/", path);
            if (index < breadcrumbs.length)
                return (<Link key={path} underline="hover" color="inherit" href={`${href}`}>
                  {path}
                </Link>);
            // if (index === (breadcrumbs.length - 1)) return (
            //     <span
            //         key={path}
            //         color="text.primary"
            //         aria-current="page"
            //     >
            //         {path}
            //     </span>
            // )
        })}
        </Breadcrumbs>
      </div>
    </Headroom>);
};
export default AdminNavbar;
//# sourceMappingURL=AdminNavbar.js.map