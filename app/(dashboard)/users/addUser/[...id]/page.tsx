import { TOptionSchema } from "@/ZSchemas";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import {
  TEditProductSchema,
  TProductSchema,
  TRegisterProductSchema,
} from "@/ZSchemas/ProductSchema";
import { TUserSchema } from "@/ZSchemas/UserSchema";
import { getCategories } from "@/actions/category";
import { getAllU, getUBy } from "@/actions/register";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddProductForm from "@/components/adminComponent/Products/AddProductForm";
import AddUserForm from "@/components/adminComponent/users/AddUserForm";
import { Box } from "@mui/material";
import { log } from "handlebars/runtime";
import { getServerSession } from "next-auth";
import queryString from "query-string";
import React from "react";

type Props = {
  params: {
    id: string[] | string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getData() {
  const CParams = {
    _id: "668ee26a1cdcaec5bb9c3bb4",
    limit: 2000,
  };

  const stringifyCParams = queryString.stringify(CParams);

  const { categories } = await getCategories({
    stringifyParams: stringifyCParams,
  });

  return categories;
}

async function getU(uId: string) {
  const PParams = {
    _id: uId,
  };
  const stringifyPParams = queryString.stringify(PParams);
  const { user } = await getUBy(stringifyPParams);
  return user;
}

async function AddUser({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken || "";
  const pId = searchParams.pId ? searchParams.pId : "";
  const stringifyParams = queryString.stringify(searchParams);
  const callbackUrl = searchParams.callbackUrl;
  const { id } = params;
  const add_new_user = id[0] === "add_new_user" ? true : false;
  const copy_new_user = searchParams.type === "copy_user" ? true : false;

  let user: TUserSchema;

  add_new_user
    ? (user = {
        _id: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        active: false,
        role: "0",
        verifyPhone: false,
        verifyMail: false,
      })
    : (user = await getU(id[0]));

  const categories = await getData();
  const roleOptions: TOptionSchema[] = [];
  const roles = categories[0].propertys;
  roles?.map((role: { name: string; values: string }) => {
    roleOptions.push({ id: role.values, label: role.name });
  });

  // console.log("categories", categories);
  // console.log("AddUser", roleOptions);
  // console.log("pOptions", pOptions);

  return (
    <Box className="flex relative flex-col w-full">
      <AddUserForm
        catsString={JSON.stringify(categories)}
        userString={JSON.stringify(user)}
        add_new_user={add_new_user}
        accessToken={accessToken}
        roleOptions={roleOptions}
      />
    </Box>
  );
}

export default AddUser;
