"use client";

import { Box, Button, Checkbox } from "@mui/material";
import Link from "next/link";
import React, { MouseEventHandler, MouseEvent } from "react";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ControlledImage from "./ControlledImage";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";

type Props = {
  catImg: {
    _id?: string;
    colorIcon?: string;
    icon?: string;
    images?: string[];
    title?: string;
  };
  stringifyParams: string;
};

const label = { inputProps: { "aria-label": "Delete Checkbox" } };

const styles = {
  checkBox: {
    left: "-2rem",
    "&:hover": {
      background: "#f00",
    },
  },
};

function PropertiesDetile({ catImg, stringifyParams }: Props) {
  const handleDelete = (propertys: string, image: string) => {
    console.log(catImg._id, propertys, image);
  };
  const catId = catImg._id!;
  // console.log("PropertiesDetile", catImg);

  return (
    <Box
      component={"div"}
      className=" flex flex-col w-full justify-between items-center py-3"
    >
      <Box
        component={"div"}
        className=" flex w-full justify-around mb-5 items-center py-3"
      >
        {!catImg.icon ? (
          <Button
            id="icon"
            size="medium"
            variant="outlined"
            color="secondary"
            aria-label="add"
          >
            <Link
              href={`/gallery/addIcon/icon?PId=${catId}&imageFor=category&defaultImg=${JSON.stringify(
                [catImg.icon]
              )}&title=${catImg.title}&${stringifyParams}`}
            >
              اضافه کردن ایکون سیاه و سفید
              <AddIcon sx={{ ml: 1 }} />
            </Link>
          </Button>
        ) : (
          <Box>
            <Box component={"p"} className=" flex mb-3 p-2 ">
              آیکون سیاه و سفید
            </Box>
            <ControlledImage
              property={"icon"}
              stringifyParams={stringifyParams}
              img={catImg.icon!}
              PId={catImg._id!}
            />
          </Box>
        )}
        {!catImg.colorIcon ? (
          <Button
            id="colorIcon"
            size="medium"
            variant="outlined"
            color="secondary"
            aria-label="add"
          >
            <Link
              href={`/gallery/addIcon/colorIcon?PId=${catId}&imageFor=category&defaultImg=${JSON.stringify(
                [catImg.colorIcon]
              )}&title=${catImg.title}&${stringifyParams}`}
            >
              اضافه کردن آیکون رنگی
              <AddIcon sx={{ ml: 1 }} />
            </Link>
          </Button>
        ) : (
          <Box>
            <Box component={"p"} className=" flex mb-3 p-2 ">
              آیکون رنگی
            </Box>
            <ControlledImage
              img={catImg.colorIcon!}
              PId={catImg._id!}
              property={"colorIcon"}
              stringifyParams={stringifyParams}
            />
          </Box>
        )}
      </Box>

      <Button
        id="images"
        size="medium"
        variant="outlined"
        color="secondary"
        aria-label="add"
      >
        <Link
          href={`/gallery/addIcon/images?PId=${catId}&imageFor=category&defaultImg=${JSON.stringify(
            catImg.images
          )}&title=${catImg.title}&${stringifyParams}`}
        >
          اضافه کردن آلبوم عکس
          <AddIcon sx={{ ml: 1 }} />
        </Link>
      </Button>
      {catImg.images && catImg.images.length > 0 && (
        <Box className=" flex flex-col w-full justify-between items-center h-1/3">
          <Box
            className="flex flex-col w-full h-20 justify-center items-center"
            component={"p"}
          >
            آلبوم عکس این زیر دسته
          </Box>
          <Box
            component={"div"}
            className=" flex w-full justify-start gap-3 p-3 items-center"
          >
            {catImg.images.map((img) => (
              <Box
                key={img}
                className=" flex w-32 h-32 items-center justify-center"
                component={"div"}
              >
                <ControlledImage
                  img={img!}
                  PId={catImg._id!}
                  album={catImg.images}
                  stringifyParams={stringifyParams}
                  property={"images"}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PropertiesDetile;
