"use client";

import Image from "next/image";
import SidebarItems from "./SidebarItems";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Fab, Tooltip } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const AdminSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const sidebarControl =
    searchParams.get("sidebarControl") === "true" ? true : false;
  const theme = searchParams.get("theme") || "light";

  const params: URLSearchParams = new URLSearchParams(searchParams);

  const toggleSidebar = () => {
    sidebarControl
      ? params.set("sidebarControl", "false")
      : params.set("sidebarControl", "true");
    params.set("theme", theme);
    params.set("sidebarVisible", "true");
    params.delete("id");
    params.delete("pId");
    params.delete("catId");
    params.delete("page");
    router.push(`${pathName}?${params}`);
  };
  const resetParams = params;
  resetParams.set("sidebarControl", "false");
  resetParams.set("sidebarVisible", "false");
  resetParams.delete("page");
  resetParams.delete("id");
  resetParams.delete("pId");
  resetParams.delete("catId");
  resetParams.set("theme", theme);

  return (
    <Box className="flex flex-col w-full h-full">
      <Link
        href={`/`}
        className=" flex py-2 border-b-2 w-full justify-center items-center"
      >
        <Image
          width={30}
          height={30}
          className="w-auto h-7"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
      </Link>

      <div className="flex flex-col w-full overflow-y-auto h-full overflow-x-hidden flex-1 mt-6">
        <nav className="-mx-3 flex flex-col justify-center items-center p-0">
          {/* <nav className="-mx-3 space-y-6 flex flex-col w-full"> */}
          <SidebarItems
            params={resetParams}
            title={sidebarControl ? false : true}
          />
        </nav>
      </div>
      <div className="flex w-full justify-center py-2 border-t-2 items-center">
        <Tooltip title={""} placement="top">
          <Fab
            color="info"
            size="small"
            aria-label="add"
            onClick={toggleSidebar}
          >
            {sidebarControl ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          </Fab>
        </Tooltip>
      </div>
    </Box>
  );
};

export default AdminSidebar;
