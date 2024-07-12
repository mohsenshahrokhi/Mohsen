import React from "react";
import Link from "next/link";
import queryString from "query-string";
import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import { Box, Button } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCategories } from "@/actions/category";
import HandleURL from "@/utils/HandleURL";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import CatList from "@/components/adminComponent/Categories/CatList";

type Props = {
  params: {
    id: string[] | string;
  };
  searchParams: { [key: string]: string | undefined };
};

async function getData(cId: string) {
  const params = {
    parent: cId,
    populate: "parent.name,author",
  };
  const stringifyParams = queryString.stringify(params);

  const { categories, success } = await getCategories({
    stringifyParams,
  });

  return categories as TCategorySchema[];
}

async function Category({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  delete searchParams.id;
  const { id } = params;

  const categories = await getData(id.slice(-1)[0]);

  const stringifyParams = queryString.stringify(params);

  const parseSearchParams = queryString.stringify(searchParams);

  const { url, backUrl } = HandleURL(id);

  const stringified = queryString.stringify({
    parentCat: params.id.slice(-1),
    callbackUrl: url,
  });

  return (
    <Box
      component="div"
      sx={{ m: "2px", width: "100%", justifyContent: "center" }}
    >
      <Box
        className="flex w-full items-center justify-between"
        component="div"
        sx={{ m: "2px", width: "100%" }}
      >
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          aria-label="add"
        >
          <Link href={`/siteSettings/addSetting/add_new_cat?${stringified}`}>
            اضافه کردن ویژگی جدید
            <AddIcon sx={{ ml: 1 }} />
          </Link>
        </Button>
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          aria-label="add"
        >
          <Link href={`/siteSettings/${backUrl}?${parseSearchParams}`}>
            برگشت
            <UndoIcon sx={{ ml: 1 }} />
          </Link>
        </Button>
      </Box>
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
        {
          <Box
            sx={{
              p: 2,
              bgcolor: "background.default",
              display: "grid",
              gap: 2,
              m: 2,
            }}
          >
            {categories.length > 0 &&
              categories.map((cat: TCategorySchema) => (
                <CatList
                  key={cat._id}
                  catString={JSON.stringify(cat)}
                  stringifyParams={stringifyParams}
                  accessToken={accessToken!}
                />
              ))}
          </Box>
        }
      </Box>
    </Box>
  );
}

export default Category;
