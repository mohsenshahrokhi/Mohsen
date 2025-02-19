"use client";

import React, { startTransition, useEffect, useRef } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import { ModalProps } from "@/ZSchemas";
import { deleteCat } from "@/actions/category";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import DeleteModal from "@/components/ui/DeleteModal";
import CollectionsIcon from "@mui/icons-material/Collections";
type Props = {
  catString: string;
  stringifyParams: string;
  searchParams: string;
  accessToken: string;
  ids: string[] | undefined;
};

function CatList({
  catString,
  stringifyParams,
  accessToken,
  searchParams,
  ids,
}: Props) {
  const cat = JSON.parse(catString) as TCategorySchema;
  const path = cat.parent === null ? "siteSettings/" : "";
  const modalRef = useRef<ModalProps>(null);

  function deleteCategory(id: string) {
    startTransition(() => {
      deleteCat({ id, accessToken }).then((data) => {
        // console.log("data", data);
        if (data?.success === true) {
          HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
          //  handleClose();

          // router.push(`/siteSettings/${callbackUrl}`);
        } else {
          HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
        }
      });
    });
  }

  console.log("ids", ids);

  return (
    <Box
      key={cat._id}
      className=" flex gap-3 h-12 w-full justify-between items-center border rounded-md py-1 px-3 border-gray-300"
    >
      {cat.name}
      <Box className="flex gap-3">
        <Tooltip title={`ویرایش ${cat.name}`} placement="top">
          <IconButton className=" flex w-5">
            <Link
              href={`${path}addSetting/${encodeURIComponent(
                cat._id
              )}?${stringifyParams}&${searchParams}`}
            >
              <EditNoteIcon className=" flex w-5" color="info" />
            </Link>
          </IconButton>
        </Tooltip>
        <Tooltip title={`گالری ${cat.name}`} placement="top">
          <IconButton className=" flex w-5">
            <Link
              href={`${path}settingsProperties/${encodeURIComponent(
                cat._id
              )}?${stringifyParams}&${searchParams}`}
            >
              <CollectionsIcon className=" flex w-5" color="info" />
            </Link>
          </IconButton>
        </Tooltip>
        <DeleteModal
          deleteProduct={(id) => deleteCategory(id)}
          ref={modalRef}
          label={<CloseIcon />}
          // disc="آیا از حذف دسته بندی مطمئن هستید ؟"
          disc={`آیا از حذف دسته بندی ${cat.name} مطمئن هستید ? `}
          id={cat._id}
          ModalTitle={`${cat.name}حذف `}
        />

        <Tooltip title={`زیر شاخه های ${cat.name}`} placement="top">
          <IconButton className=" flex w-5">
            <Link
              href={`${
                ids?.length === 0 ? `siteSettings/${cat._id}` : ""
              }${ids?.join("/")}?${stringifyParams}&${searchParams}`}
            >
              <PreviewIcon color="info" />
            </Link>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default CatList;
