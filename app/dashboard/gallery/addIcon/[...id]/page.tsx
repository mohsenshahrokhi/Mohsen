import React from "react";
// import CategoryForm from "@/components/adminComponent/Categories/CategoryForm"

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
// import Checkbox from '@/components/ui/components/Checkbox/Checkbox'
// import HModal from "@/components/ui/components/Modal2/confirmModal";
// import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple'
// import LinkWithRipple from '@/components/ui/components/Button/LinkWithRipple'
import Image from "next/image";
import queryString from "query-string";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllGallerys } from "@/actions/gallery";
import { Box, Button, Checkbox } from "@mui/material";
import Lootti from "@/components/publicComponents/Lootti";
import AddIcon from "@mui/icons-material/Add";
import GalleryBase from "@/components/adminComponent/Gallery/GalleryBase";
import Pagination from "@/components/adminComponent/Pagination";
import { TGallerySchema } from "@/ZSchemas/GallerySchema";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import { getCBy } from "@/actions/category";
import GalleryList from "@/components/adminComponent/Gallery/GalleryList";

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};
type GalleryData = {
  gallerys: TGallerySchema[];
  success: boolean;
  qtt: number;
};

type CatData = {
  success: boolean;
  category: TCategorySchema;
};
/* async function getData({
  catId,
  page,
  perPage,
  accessToken,
}: {
  catId: string;
  page: number;
  perPage: number;
  accessToken: string;
}) {
  const params = {
    // parent: 'null'
    limit: perPage,
    skip: perPage * (page - 1),
  };
  const params2 = {
    _id: catId,
  };

  const stringifyParams = queryString.stringify(params);
  const stringifyParams2 = queryString.stringify(params2);

  const [gallerys, category] = await Promise.all([
    getAllGallerys({ stringifyParams, accessToken }),
    getCBy(stringifyParams2),
  ]);

  return { gallerys: gallerys as GalleryData, category: category as CatData };
} */

async function GalleryData({
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

  return gallerys as GalleryData;
}

async function CategoryData({
  _id,
  accessToken,
}: {
  _id: string;
  accessToken: string;
}) {
  const params = {
    _id,
  };

  const stringifyParams = queryString.stringify(params);

  const { category } = await getCBy(stringifyParams);

  return category;
}

async function Gallery({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  let page = parseInt((searchParams.page as string) || "1", 10);
  delete searchParams.page;
  const stringified = queryString.stringify(searchParams);
  page = !page || page < 1 ? 1 : page;
  const perPage = 20;

  // const catId = params.id[0];
  const _id = searchParams.PId;
  const imageFor = searchParams.imageFor;
  const title = searchParams.title;
  const defaultImg = JSON.parse(searchParams.defaultImg || "");
  const gallerys = await GalleryData({
    page: page,
    perPage: perPage,
    accessToken: accessToken!,
  });
  let category: TCategorySchema = {
    _id: "",
    type: false,
    name: "",
    latinName: "",
    slug: "",
    images: [],
  };
  if (_id)
    category = await CategoryData({ _id: _id!, accessToken: accessToken! });
  const totalPage = Math.ceil(gallerys.qtt / perPage);
  const outOfRange = page > totalPage;

  const pageNumber = [];
  const offsetPage = 3;

  for (let i = page - offsetPage; i <= page + offsetPage; i++) {
    if (i >= 1 && i <= totalPage) pageNumber.push(i);
  }

  const catField = params.id[0] as
    | "colorIcon"
    | "icon"
    | "images"
    | "productImg"
    | undefined;

  console.log("addIcon", catField, _id, JSON.parse(defaultImg));

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
                <Link href={`/dashboard/gallery/addFile?${stringified}`}>
                  <Box component={"span"}>بارگذاری فایل جدید</Box>
                  <AddIcon sx={{ ml: 1 }} />
                </Link>
              </Button>
            </Box>
          </Box>
          <GalleryList
            gallery={gallerys.gallerys}
            catField={catField}
            title={title}
            defaultImg={JSON.parse(defaultImg)}
            imageFor={imageFor}
            _id={_id}
            searchParams={stringified}
          />
          {/* <GalleryBase
            gallery={gallerys.gallerys}
            searchParams={stringified}
            // catId={catId}
            // cat={category.category}
            // catProperty={catProperty}
          /> */}

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
