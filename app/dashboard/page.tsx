"use client";

import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function Dashboard({ searchParams }: Props) {
  const router = useRouter();

  const stringified = queryString.stringify(searchParams);

  const { data: session } = useSession();

  return (
    <div>
      <div>
        داشبورد : {session?.user.role}
        <Box component={"p"}>
          <Button className=" font">داشبورد : {session?.user.role}</Button>
        </Box>
      </div>
    </div>
  );
}
