"use client";

import { Box, Button, Checkbox } from "@mui/material";
import Link from "next/link";
import React, { MouseEventHandler, MouseEvent } from "react";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import ControlledImage from "./ControlledImage";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";

type Props = {
  categoryString: string;
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

function PropertiesDetile({ categoryString, stringifyParams }: Props) {
  const category = JSON.parse(categoryString);
  const handleDelete = (propertys: string, image: string) => {
    // console.log("pdetile", category._id, propertys, image);
  };

  console.log(category);

  return (
    <Box
      component={"div"}
      className=" flex flex-col w-full justify-between items-center py-3"
    >
      <Box
        component={"div"}
        className=" flex w-full justify-around mb-5 items-center py-3"
      >
        {!category.icon ? (
          <Button
            id="icon"
            size="medium"
            variant="outlined"
            color="secondary"
            aria-label="add"
          >
            <Link
              href={`/dashboard/gallery/addIcon/icon?catId=${category?._id}&${stringifyParams}`}
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
              image={category.icon}
              cat={category}
              property={"icon"}
              stringifyParams={stringifyParams}
            />
          </Box>
        )}
        {!category.colorIcon ? (
          <Button
            id="colorIcon"
            size="medium"
            variant="outlined"
            color="secondary"
            aria-label="add"
          >
            <Link
              href={`/dashboard/gallery/addIcon/colorIcon?catId=${category?._id}&${stringifyParams}`}
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
              image={category.colorIcon}
              cat={category}
              property={"colorIcon"}
              stringifyParams={stringifyParams}
            />
          </Box>
        )}
      </Box>

      {/* {!(category.images && category.images.length > 0) ? ( */}
      <Button
        id="images"
        size="medium"
        variant="outlined"
        color="secondary"
        aria-label="add"
      >
        <Link
          href={`/dashboard/gallery/addIcon/images?catId=${category?._id}&${stringifyParams}`}
        >
          اضافه کردن آلبوم عکس
          <AddIcon sx={{ ml: 1 }} />
        </Link>
      </Button>
      {/* ) : ( */}
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
          {category.images.map((img: string, index: number) => (
            <Box
              key={index}
              className=" flex w-32 h-32 items-center justify-center"
              component={"div"}
            >
              <ControlledImage
                image={img}
                cat={category}
                stringifyParams={stringifyParams}
                property={"images"}
              />
            </Box>
          ))}
        </Box>
      </Box>
      {/* )} */}
    </Box>
  );
}

export default PropertiesDetile;
