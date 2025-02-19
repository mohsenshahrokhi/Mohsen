import AdminLayout from "@/components/adminComponent/Sidebar/AdminLayout";

import CircularProgress from "@mui/material/CircularProgress";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (status !== "loading") {
  return <AdminLayout>{children}</AdminLayout>;
  // }

  // return (
  //   <div className=" flex h-screen w-screen justify-center items-center">
  //     <CircularProgress
  //       variant="indeterminate"
  //       disableShrink
  //       size={40}
  //       thickness={4}
  //     />
  //   </div>
  // );
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
