"use client";

import Link from "next/link";
import junkfood from "@/public/icons/json/junk-food.json";
import working from "@/public/icons/json/working.json";
import Lootti from "@/components/publicComponents/Lootti";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { Button, Stack, Tooltip } from "@mui/material";

export default function Home() {
  const router = useRouter();

  // const searchParams = useSearchParams();
  // const params: URLSearchParams = new URLSearchParams(searchParams);
  const theme = localStorage.getItem("theme") || "light";
  const resetParams = {
    sidebarMiddle: false,
    sidebarVisible: false,
    theme: theme,
  };
  // const { status, data } = useSession();
  // const accessToken = data?.user.accessToken;
  // const verify = accessToken && verifyJwt(accessToken)?._id;
  // if (verify === undefined) {
  // }
  // useEffect(() => {
  //   const stringified = queryString.stringify({
  //     theme,
  //     sidebarVisible: false,
  //     sidebarMiddle: true,
  //   });
  //   router.push(`/?${stringified}`);
  //   localStorage.setItem("theme", theme);
  // }, [router, theme]);
  // console.log("searchParams", queryString.stringify(resetParams));
  const stringifyParams = queryString.stringify(resetParams);
  // router.push(stringifyParams);

  return (
    <main className=" flex h-screen w-full">
      <section className="flex flex-col w-full relative h-full">
        <video
          autoPlay
          muted
          loop
          className=" flex h-full w-full object-cover fixed"
        >
          <source
            type="video/mp4"
            src="./uploads/video/mp4/1719399842916@v-bg.mp4"
          />
        </video>
      </section>

      <section className=" left-5 py-5 absolute z-20 flex flex-col h-full w-28 items-center justify-between">
        <Tooltip title={`منو فست فود`} placement="bottom">
          <Link href={`./menuPage?theme=${theme}`}>
            <Lootti animationData={junkfood} loop={true} />
          </Link>
        </Tooltip>
        <Tooltip title={`پنل کاربری`} placement="top">
          <Link href={`./userDashboard?${stringifyParams}`}>
            <Lootti animationData={working} loop={true} />
          </Link>
        </Tooltip>
      </section>
    </main>
  );
}
