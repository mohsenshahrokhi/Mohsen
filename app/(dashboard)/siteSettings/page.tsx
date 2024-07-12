import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verifyJwt } from "@/lib/jwt";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import queryString from "query-string";
import { getCategories } from "@/actions/category";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import CatList from "@/components/adminComponent/Categories/CatList";

async function getData() {
  const params = {
    parent: "null",
  };

  const stringifyParams = queryString.stringify(params);

  const { categories } = await getCategories({
    stringifyParams,
  });

  return categories as TCategorySchema[];
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function settingsProperties({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  const verify = accessToken && verifyJwt(accessToken)?._id;

  delete searchParams.page;
  const stringifyParams = queryString.stringify(searchParams);
  let categories: TCategorySchema[] = [];
  if (verify) categories = await getData();
  console.log("settingsProperties", categories);

  return (
    <Box
      component="div"
      sx={{ m: "2px", width: "100%", justifyContent: "center" }}
    >
      <Button
        size="medium"
        variant="outlined"
        color="secondary"
        aria-label="add"
      >
        <Link href={`/siteSettings/addSetting/add_new_cat?${stringifyParams}`}>
          اضافه کردن ویژگی جدید
          <AddIcon sx={{ ml: 1 }} />
        </Link>
      </Button>

      <Box
        component={"div"}
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "grid",
          gap: 2,
          m: 2,
        }}
      >
        {categories &&
          categories.length > 0 &&
          categories.map((cat: TCategorySchema) => (
            <CatList
              key={cat._id}
              catString={JSON.stringify(cat)}
              stringifyParams={stringifyParams}
              accessToken={accessToken!}
            />
          ))}
      </Box>
    </Box>
  );
}

export default settingsProperties;
