import {
  HiMiniPlus,
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineTrash,
} from "react-icons/hi2";
import Link from "next/link";
import queryString from "query-string";
import { Box, Button } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllU } from "@/actions/register";
// import UserList from "@/components/adminComponent/Products/ProductList";
import Pagination from "@/components/adminComponent/Pagination";
// import { TProductSchema } from "@/ZSchemas/ProductSchema";
import { TUserSchema } from "@/ZSchemas/UserSchema";
import UserList from "@/components/adminComponent/users/UserList";
import { getCategories } from "@/actions/category";

type Data = {
  users: TUserSchema[];
  success: boolean;
  qtt: number;
};

async function getData({ page, perPage }: { page: number; perPage: number }) {
  const userParams = {
    limit: perPage,
    skip: perPage * (page - 1),
    // populate:
    //   "category.name,category.images,category.latinName,author.displayName",
  };
  const catParams = {
    _id: "668ee26a1cdcaec5bb9c3bb4",
  };

  const userStringifyParams = queryString.stringify(userParams);
  const catStringifyParams = queryString.stringify(catParams);
  /*  const [{ categories }, { users }] = await Promise.all([
    getCategories({ stringifyParams: stringifyCParams }),
    getAllU({ stringifyParams: stringifyUParams }),
  ]); */
  const [{ categories }, users] = await Promise.all([
    getCategories({ stringifyParams: catStringifyParams }),
    getAllU({ stringifyParams: userStringifyParams }),
  ]);

  return { users, categories };
}

type Props = {
  searchParams: { [key: string]: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Users({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  // const verify = (accessToken && verifyJwt(accessToken)) || null;
  // let page = 1;
  let page = parseInt(searchParams.page || "1", 10);
  delete searchParams.id;
  delete searchParams.catId;
  delete searchParams.page;
  delete searchParams.pId;
  const stringified = queryString.stringify(searchParams);
  page = !page || page < 1 ? 1 : page;
  const perPage = 10;

  const { users, categories } = await getData({
    page: page,
    perPage: perPage,
  });

  const totalPage = Math.ceil(users.qtt / perPage);
  const outOfRange = page > totalPage;
  const roles = categories[0].propertys;
  // console.log("Users", users, categories[0].propertys);

  return (
    <Box
      component={"section"}
      className="flex relative flex-col w-full p-2 my-2"
    >
      <Box
        component={"div"}
        className="flex w-full flex-col items-center justify-between"
      >
        <Box component={"h4"} className="text-lg ">
          کاربران ثبت شده
        </Box>

        {/* <Box
          component={"div"}
          className="flex flex-col items-center gap-3 w-full mt-4 gap-x-3"
        >
          <Link
            href={`Users/addUser/add_new_User?${stringified}`}
            className=" flex items-center justify-center gap-3"
            // href={`Users/addProduct/add?sidebarControl=false&sidebarVisible=false&theme=light&${query}`}
          >
            <Box component={"p"}>اضافه کردن کاربر جدید</Box>
            <HiMiniPlus />
          </Link>
        </Box> */}
      </Box>

      <Box component={"div"} className="flex flex-col no-scrollbar mt-6">
        <Box
          component={"div"}
          className="overflow-hidden no-scrollbar border md:rounded-lg"
        >
          {outOfRange ? (
            <Box component={"div"}>این صفحه وجود ندارد</Box>
          ) : (
            <Box component={"div"}>
              <UserList
                stringUsers={JSON.stringify(users.users)}
                accessToken={accessToken!}
                stringified={stringified}
                rolesString={JSON.stringify(roles)}
              />
              <Pagination
                page={page}
                stringified={stringified}
                totalPage={totalPage}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
Users.auth = true;
