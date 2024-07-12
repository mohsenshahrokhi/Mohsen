import React from "react";
import Link from "next/link";
import {
  HiMiniPlus,
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineTrash,
} from "react-icons/hi2";
// import { Tooltip } from 'react-tooltip'
// import TERipple from '@/components/ui/components/Ripple/Ripple'
// import TEMModal from '@/components/ui/components/Modal/TEMModal'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import { CAT, GalleryInfoProps } from '@/type'
import Image from "next/image";
// import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
// import HModal from "@/components/ui/components/Modal2/confirmModal";
// import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
// import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import queryString from "query-string";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verifyJwt } from "@/lib/jwt";
import { getAllGallerys } from "@/actions/gallery";
import { Box, Button, Checkbox } from "@mui/material";
import Lootti from "@/components/publicComponents/Lootti";
import dynamic from "next/dynamic";
import AddIcon from "@mui/icons-material/Add";
import { skip } from "node:test";
import GalleryBase from "@/components/adminComponent/Gallery/GalleryBase";
import Pagination from "@/components/adminComponent/Pagination";
import { TGallerySchema } from "@/ZSchemas/GallerySchema";
import GalleryList from "@/components/adminComponent/Gallery/GalleryList";

type Props = {
  searchParams: { [key: string]: string | undefined };
  params: {
    id: string;
  };
};
type Data = {
  gallerys: TGallerySchema[];
  success: boolean;
  qtt: number;
};
async function getData({
  page,
  perPage,
  accessToken,
}: {
  page: number;
  perPage: number;
  accessToken: string;
}) {
  const params = {
    // parent: 'null'
    limit: perPage,
    skip: perPage * (page - 1),
  };

  const stringifyParams = queryString.stringify(params);

  const gallerys = await getAllGallerys({ stringifyParams, accessToken });

  return gallerys as Data;
}

async function Gallery({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  // const verify = accessToken && verifyJwt(accessToken) || null
  // searchParams.delete('page')
  let page = parseInt(searchParams.page || "1", 10);
  delete searchParams.page;
  const stringified = queryString.stringify(searchParams);
  page = !page || page < 1 ? 1 : page;
  const perPage = 20;

  const { gallerys, qtt } = await getData({
    page: page,
    perPage: perPage,
    accessToken: accessToken!,
  });
  const totalPage = Math.ceil(qtt / perPage) > 0 ? Math.ceil(qtt / perPage) : 1;
  const outOfRange = page > totalPage;

  return (
    <Box component={"div"} className="flex flex-col w-full">
      {outOfRange ? (
        <Box component={"div"}>این صفحه وجود ندارد</Box>
      ) : (
        <Box
          component={"section"}
          className="flex relative overflow-y-auto flex-col w-full p-1 my-2"
        >
          <Box component={"div"} className="flex items-center justify-between">
            <Box component={"h2"} className="text-lg font-medium ">
              فایل های بارگذاری شده
            </Box>

            <Box component={"div"} className="flex items-center">
              <Button
                size="medium"
                variant="contained"
                color="info"
                aria-label="add"
              >
                <Link href={`/gallery/addFile?${stringified}`}>
                  <Box component={"span"}>بارگذاری فایل جدید</Box>
                  <AddIcon sx={{ ml: 1 }} />
                </Link>
              </Button>
            </Box>
          </Box>

          <GalleryList
            gallery={gallerys}
            searchParams={stringified}
            defaultImg={[""]}
          />

          <Pagination
            page={page}
            stringified={stringified}
            totalPage={totalPage}
          />
        </Box>
      )}
    </Box>
  );
}

export default Gallery;
