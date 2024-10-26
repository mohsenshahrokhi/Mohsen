"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";

type Props = {
  title: boolean;
  params: URLSearchParams;
};

import { usePathname } from "next/navigation";

const SidebarItems = ({ title, params }: Props) => {
  const route = usePathname();
  const currentRoute = route?.split("/").splice(1);
  const { data: session } = useSession();

  const accessRole = (session?.user && session?.user?.role) || "";

  const sidebarItems = [
    {
      label: "Admin",
      items: [
        {
          title: "داشبورد",
          accessRoles: ["11"],
          icon: <DashboardOutlinedIcon />,
          href: "/userDashboard",
          key: "userDashboard",
        },
        {
          title: "تنظیمات",
          accessRoles: ["11"],
          icon: <SettingsOutlinedIcon />,
          href: "/siteSettings",
          key: "siteSettings",
        },
        {
          title: "محصولات",
          accessRoles: ["11"],
          icon: <PrecisionManufacturingOutlinedIcon />,
          href: "/product",
          key: "product",
        },
        {
          title: "فاکتور ها",
          accessRoles: ["11"],
          icon: <ReceiptOutlinedIcon />,
          href: "/invoice",
          key: "invoice",
        },
        {
          title: "کاربران",
          accessRoles: ["11"],
          icon: <GroupOutlinedIcon />,
          href: "/users",
          key: "users",
        },
        {
          title: "دسته بندی",
          accessRoles: ["11"],
          icon: <CategoryOutlinedIcon />,
          href: "/category",
          key: "category",
        },
        {
          title: "بارگذاری شده",
          accessRoles: ["11"],
          icon: <CollectionsOutlinedIcon />,
          href: "/gallery",
          key: "gallery",
        },
      ],
    },
    {
      label: "User",
      items: [
        {
          title: "پنل کاربری",
          accessRoles: ["مدیر کل", "کاربر"],
          icon: <PersonOutlineOutlinedIcon />,
          href: "/userDashboard?",
          key: "userDashboard",
        },
        {
          title: "تنظیمات کاربر",
          accessRoles: ["مدیر کل", "کاربر"],
          icon: <ContactPageOutlinedIcon />,
          href: "#",
          key: "#",
        },
        {
          title: "Products",
          accessRoles: ["کاربر"],
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
          ),
          href: "#",
          key: "#",
        },
        {
          title: "Users",
          accessRoles: ["کاربر"],
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
          ),
          href: "#",
          key: "#",
        },
        {
          title: "Options",
          accessRoles: ["کاربر"],
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
          ),
          href: "#",
          key: "#",
        },
      ],
    },
  ];

  return (
    <div className={`space-y-3 ${!title && "flex flex-col items-center"} `}>
      {sidebarItems?.map((sidebarItem, index) => (
        <div
          key={index}
          className=" flex w-full flex-col justify-center items-center h-full"
        >
          {title && (
            <label className={`px-3 text-xs uppercase mb-2`}>
              {sidebarItem.label}
            </label>
          )}

          {sidebarItem.items?.map((i, index) => (
            <div
              className={`flex text-center items-center justify-center mb-1 rounded-md transition-colors duration-300 transform hover:bg-zinc-300 hover:text-zinc-800 ${
                currentRoute?.includes(i.key) ? "bg-sky-200 " : ""
              } ${i.accessRoles.includes(accessRole) ? "" : "hidden"}`}
              key={index}
            >
              <Link href={`${i.href}?&${params}`} className=" flex w-full">
                {i.icon}
                {title && (
                  <span className="mx-2 text-sm font-medium">{i.title}</span>
                )}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SidebarItems;
