"use client";
import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import BasicModal from "@/components/ui/BasicModal";
function CatList({ catString, stringifyParams, accessToken }) {
    const cat = JSON.parse(catString);
    const path = cat.parent === null ? "siteSettings/" : "";
    return (<Box key={cat._id} className=" flex gap-3 h-12 w-full justify-between items-center border rounded-md py-1 px-3 border-gray-300">
      {cat.name}
      <Box className="flex gap-3">
        <Tooltip title={`ویرایش ${cat.name}`} placement="top">
          <IconButton className=" flex w-5">
            <Link href={`${path}addSetting/${encodeURIComponent(cat._id)}?${stringifyParams}`}>
              <EditNoteIcon className=" flex w-5" color="info"/>
            </Link>
          </IconButton>
        </Tooltip>

        <BasicModal label={<CloseIcon />} disc="آیا از حذف این دسته بندی مطمئن هستید ؟" catString={JSON.stringify(cat)} accessToken={accessToken} callbackUrl={"/"}/>

        <Tooltip title={`زیر شاخه های ${cat.name}`} placement="top">
          <IconButton className=" flex w-5">
            <Link href={`${path}${encodeURIComponent(cat._id)}?${stringifyParams}`}>
              <PreviewIcon color="info"/>
            </Link>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>);
}
export default CatList;
//# sourceMappingURL=CatList.js.map