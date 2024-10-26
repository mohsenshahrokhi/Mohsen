"use client";

import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import { useEffect, useState } from "react";

type Props = {
  sidebarVisible: any;
  params: any;
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

const SidebarItems2 = ({ sidebarVisible, params }: Props) => {
  const [userTheme, setUserTheme] = useState("dark");
  // const [userTheme,setUserTheme] = localStorage.getItem("theme") || "light";
  const theme = useTheme();
  const pathName = usePathname();
  const resetParams = params;
  resetParams.set("sidebarMiddle", "false");
  resetParams.set("sidebarVisible", "false");
  resetParams.delete("page");
  resetParams.delete("id");
  resetParams.delete("pId");
  resetParams.delete("catId");
  resetParams.set("theme", userTheme);

  useEffect(() => {
    setUserTheme(localStorage.getItem("theme") || "dark");
  }, []);

  const adminSidebarItems: Items[] = [
    {
      label: "مدیر",
      items: [
        {
          title: "داشبورد",
          accessRoles: ["11"],
          href: "/userDashboard",
          key: "userDashboard",
          icon: <DashboardOutlinedIcon />,
        },
        {
          title: "تنظیمات",
          accessRoles: ["11"],
          href: `/siteSettings/?page=1`,
          key: "siteSettings",
          icon: <SettingsOutlinedIcon />,
        },
        {
          title: "محصولات",
          accessRoles: ["11"],
          href: `/product/?page=1`,
          key: "product",
          icon: <PrecisionManufacturingOutlinedIcon />,
        },
        {
          title: "فاکتور ها",
          accessRoles: ["11"],
          href: `/invoice/?page=1`,
          key: "invoice",
          icon: <ReceiptOutlinedIcon />,
        },
        {
          title: "کاربران",
          accessRoles: ["11"],
          href: `/users/?page=1`,
          key: "users",
          icon: <GroupOutlinedIcon />,
        },
        {
          title: "دسته بندی ها",
          accessRoles: ["11"],
          href: "/category",
          key: "category",
          icon: <CategoryOutlinedIcon />,
        },
        {
          title: "بارگذاری شده",
          accessRoles: ["11"],
          href: `/gallery/?page=1`,
          key: "gallery",
          icon: <CollectionsOutlinedIcon />,
        },
      ],
    },
  ];

  return (
    <>
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
            <Link key={index} href={`${item.href}&${resetParams}`}>
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
    </>
  );
};

export default SidebarItems2;
