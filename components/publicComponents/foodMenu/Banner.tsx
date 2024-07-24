"use client";

import Image from "next/image";
import AnimateCharacter from "./AnimateCharacter";
import { Box } from "@mui/material";
import useWidth from "@/utils/useWidth";

type Props = {
  banner: string;
  item: string;
};

function Banner({ banner, item }: Props) {
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        marginX: "auto",
      }}
      className=" relative flex w-full sm:w-1/2 lg:w-3/12 h-60 justify-center sm:my-4 items-center sm:rounded overflow-hidden sm:shadow-sm"
    >
      <Image
        src={`/uploads/${banner}`}
        fill={true}
        priority={true}
        alt={banner}
      />

      <AnimateCharacter
        className="absolute bottom-3 text-xs left-3 justify-end text-white bg-zinc-800 rounded px-1"
        textClassName="font-Nokia uppercase"
        text={`${item} ~ romance`}
        el="span"
      />
    </Box>
  );
}

export default Banner;
