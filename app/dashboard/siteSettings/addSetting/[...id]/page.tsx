import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import queryString from "query-string";
import React from "react";
import { getCBy, getCategories } from "@/actions/category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddCategoryForm from "@/components/adminComponent/Categories/AddCategoryForm";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import { TOptionSchema } from "@/ZSchemas";

type Props = {
  params: {
    id: string | string[];
  };
  searchParams: {
    parentCat: string;
    callbackUrl: string;
  };
  // searchParams: { [parentCat: string]: [string] | undefined }
};

async function getData(cId: string) {
  const params = {
    _id: cId,
    // populate: 'parent.name,author'
  };
  const stringifyParams = queryString.stringify(params);
  const { category, success } = await getCBy(stringifyParams);
  return category;
}

async function getCats(accessToken: string) {
  const params = {
    // populate: 'parent.name,author'
  };
  const stringifyParams = queryString.stringify(params);
  const { categories, success } = await getCategories({
    stringifyParams,
    accessToken,
  });
  return categories;
}

async function AddSetting({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  const pId = searchParams.parentCat ? searchParams.parentCat : "";
  const stringifyParams = queryString.stringify(searchParams);
  const callbackUrl = searchParams.callbackUrl;
  const { id } = params;
  const catId = searchParams.parentCat;
  const add_new_cat = id[0] === "add_new_cat" ? true : false;
  let category: TCategorySchema;

  add_new_cat
    ? (category = {
        _id: "",
        name: "",
        latinName: "",
        slug: "",
        type: false,
        parent: catId,
        images: [],
        propertys: [],
        author: session?.user._id,
      })
    : (category = await getData(id[0]));
  const categories = await getCats(accessToken!);
  const catString = JSON.stringify(category);
  const options: TOptionSchema[] = [];
  categories?.map((cat: TCategorySchema) => {
    options.push({ id: cat._id, label: cat.name });
  });
  return (
    <Box
      component="div"
      sx={{ m: "2px", width: "100%", justifyContent: "center" }}
    >
      <p className=" flex p-3">
        {add_new_cat
          ? `اضافه کردن دسته بندی جدید به دسته بندی ( ${category.name} )`
          : `ویرایش دسته بندی ( ${category.name} )`}
      </p>
      <Fab size="medium" variant="extended" color="secondary" aria-label="add">
        <Link href={`/dashboard/siteSettings/${callbackUrl}`}>انصراف</Link>
      </Fab>

      <Box
        component={"div"}
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "grid",
          gap: 2,
          width: "100%",
        }}
      >
        <AddCategoryForm
          catString={catString}
          add_new_cat={add_new_cat}
          options={options}
          callbackUrl={callbackUrl}
          searchParams={stringifyParams}
        />
      </Box>
    </Box>
  );
}

export default AddSetting;
