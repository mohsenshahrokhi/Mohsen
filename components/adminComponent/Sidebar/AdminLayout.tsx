"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { signOut, useSession } from "next-auth/react";
import { useMemo } from "react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("tablet")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const sidebarVisible =
    searchParams.get("sidebarVisible") === "true" ? true : false;
  const sidebarMiddle =
    searchParams.get("sidebarMiddle") === "true" ? true : false;
  const userTheme = localStorage.getItem("theme") || "light";
  const params: URLSearchParams = new URLSearchParams(searchParams);

  const handleDrawerToggle = () => {
    if (sidebarVisible) {
      params.set("sidebarVisible", "false");
      params.set("sidebarMiddle", "false");
    } else {
      if (sidebarMiddle) {
        params.set("sidebarMiddle", "false");
      } else {
        params.set("sidebarVisible", "true");
        params.set("sidebarMiddle", "true");
      }
    }
    router.push(`${pathName}?${params}`);
  };
  const handleDrawerMiddle = () => {
    params.set("sidebarVisible", "false");
    params.set("sidebarMiddle", "true");
    router.push(`${pathName}?${params}`);
  };
  const handleDrawerClose = () => {
    sidebarVisible && params.set("sidebarVisible", "false");
    sidebarMiddle && params.set("sidebarMiddle", "true");
    router.push(`${pathName}?${params}`);
  };

  type Items = {
    label: string;
    items: {
      title: string;
      accessRoles: [string];
      icon: any;
      href: string;
      key: string;
    }[];
  };
  const adminSidebarItems: Items[] = [
    {
      label: "Admin",
      items: [
        {
          title: "Dashboard",
          accessRoles: ["11"],
          href: "/userDashboard",
          key: "userDashboard",
          icon: <DashboardOutlinedIcon />,
        },
        {
          title: "Settings",
          accessRoles: ["11"],
          href: "/siteSettings",
          key: "siteSettings",
          icon: <SettingsOutlinedIcon />,
        },
        {
          title: "Products",
          accessRoles: ["11"],
          href: "/product",
          key: "product",
          icon: <PrecisionManufacturingOutlinedIcon />,
        },
        {
          title: "Invoice",
          accessRoles: ["11"],
          href: "/invoice",
          key: "invoice",
          icon: <ReceiptOutlinedIcon />,
        },
        {
          title: "Users",
          accessRoles: ["11"],
          href: "/users",
          key: "users",
          icon: <GroupOutlinedIcon />,
        },
        {
          title: "Category",
          accessRoles: ["11"],
          href: "/category",
          key: "category",
          icon: <CategoryOutlinedIcon />,
        },
        {
          title: "Gallery",
          accessRoles: ["11"],
          href: "/gallery",
          key: "gallery",
          icon: <CollectionsOutlinedIcon />,
        },
      ],
    },
  ];

  const resetParams = params;
  resetParams.set("sidebarMiddle", "false");
  resetParams.set("sidebarVisible", "false");
  resetParams.delete("page");
  resetParams.delete("id");
  resetParams.delete("pId");
  resetParams.delete("catId");
  resetParams.set("theme", userTheme);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const params = new URLSearchParams(searchParams);
        localStorage.setItem("theme", userTheme === "light" ? "dark" : "light");
        params.set("theme", userTheme === "light" ? "dark" : "light");
        router.push(`${pathName}?${params}`);
      },
    }),
    [pathName, router, searchParams, userTheme]
  );
  console.log(pathName);

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        // width: "100%",
        heigh: "100%",
      }}
    >
      <CssBaseline />
      <AppBar color="info" position="fixed" open={sidebarVisible}>
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
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
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
      </AppBar>
      <Drawer
        variant={`${
          sidebarMiddle
            ? sidebarVisible
              ? "permanent"
              : "permanent"
            : "temporary"
        }`}
        open={sidebarVisible}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerMiddle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {adminSidebarItems.map((black, index) => (
            <Box component={"div"} key={index}>
              {sidebarVisible && (
                <Box component={"div"}>
                  <Typography
                    variant="h5"
                    sx={{
                      // display: "flex",
                      // flexDirection: "column",
                      // width: "100%",
                      padding: 3,
                    }}
                  >
                    {black.label}
                  </Typography>
                  <Divider />
                </Box>
              )}
              {black.items.map((item, index) => (
                <Link key={index} href={`${item.href}?${resetParams}`}>
                  <ListItem
                    divider
                    disablePadding
                    sx={[
                      { display: "block" },
                      pathName === item.href && {
                        bgcolor: theme.palette.grey[100],
                        color: theme.palette.grey[900],
                        "& .itemIcon": {
                          color: theme.palette.grey[700],
                        },
                        // "&:hover": {
                        //   bgcolor: theme.palette.bgColor2,
                        //   color: "white",
                        //   "& .itemIcon": {
                        //     color: "white",
                        //   },
                        // },
                      },
                    ]}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: sidebarVisible ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        className="itemIcon"
                        sx={{
                          minWidth: 0,
                          mr: sidebarVisible ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{ opacity: sidebarVisible ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </Box>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
      <DrawerHeader />
      <Box
        onClick={handleDrawerClose}
        component="div"
        sx={{
          display: "flex",
          // flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/* "use client";

import AdminNavbar from "@/components/adminComponent/Navbar/AdminNavbar";
import AdminSidebar from "@/components/adminComponent/Sidebar/AdminSidebar";
import { verifyJwt } from "@/lib/jwt";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { useSession } from "next-auth/react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sidebarVisible =
    searchParams.get("sidebarVisible") === "true" ? true : false;
  const sidebarControl =
    searchParams.get("sidebarControl") === "true" ? true : false;
  const params = new URLSearchParams(searchParams);
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/phone?${stringified}`);
    },
  });
  // const accessToken = data?.user.accessToken;
  // const verify = accessToken && verifyJwt(accessToken)?._id;
  // if (verify === undefined) {
  //   // redirect(`/`);
  // }

  let theme = searchParams.get("theme") || "dark";
  // let theme = localStorage.getItem("theme") || "dark";

  const stringified = queryString.stringify({
    theme,
    sidebarVisible: false,
    sidebarControl: true,
  });

  useEffect(() => {
    // router.push(`?${stringified}`);
    localStorage.setItem("theme", theme);
  }, [theme, router]);

  if (data?.user && parseInt(data.user.role) < 1) {
    router.push(`/phone?${stringified}`);
    return null;
  }

  if (moment().isAfter(data?.expires)) {
    router.push(`/phone?${stringified}`);
    return null;
  }

  function closeSidebar() {
    if (!sidebarControl) {
      params.set("sidebarControl", "true");
      router.push(`${pathName}?${params}`);
    }
  }

  if (status !== "loading") {
    return (
      <div className="flex flex-col w-full h-full relative">
        <AdminNavbar />
        <div className="flex relative justify-end">
          <div
            className={` ${
              sidebarVisible
                ? sidebarControl
                  ? "w-[5%] border mr-2 mb-2 px-1 justify-center items-center "
                  : " translate-x-0 w-2/12 border mx-2 mb-2 px-3 "
                : " translate-x-48 w-0 border-0 p-0 m-0"
            }  shadow-lg  rounded-md h-[80] flex flex-col transition-all mt-2 ease-in-out duration-300 `}
          >
            <AdminSidebar />
          </div>
          <div
            className={` flex ${
              sidebarVisible
                ? sidebarControl
                  ? " w-[95%] mr-2 "
                  : " w-10/12 "
                : " w-full mr-2 "
            } transition-all ease-in-out duration-300 my-2 ml-2 p-3 shadow-lg border rounded-md overflow-auto`}
            onClick={closeSidebar}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex h-screen w-screen justify-center items-center">
      <CircularProgress
        variant="indeterminate"
        disableShrink
        size={40}
        thickness={4}
      />
    </div>
  );
}
 */
