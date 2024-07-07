"use client";

import Image from "next/image";
import AnimateCharacter from "./AnimateCharacter";
import { Box } from "@mui/material";

type Props = {
  banner: string;
  item: string;
};

function Banner({ banner, item }: Props) {
  return (
    <Box className=" relative flex w-full h-60 justify-center items-center rounded-sm overflow-hidden shadow-sm">
      <Image
        src={`/uploads/${banner}`}
        // fill={true}
        width="548"
        height="599"
        // placeholder="blur"
        // blurDataURL="data:image/jpeg..."
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
