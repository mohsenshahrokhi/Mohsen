import React from "react";
import Link from "next/link";
import queryString from "query-string";
import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCategories } from "@/actions/category";
import HandleURL from "@/utils/HandleURL";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import CatList from "@/components/adminComponent/Categories/CatList";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import CollectionsIcon from "@mui/icons-material/Collections";
import EditNoteIcon from "@mui/icons-material/EditNote";

type Props = {
  params: {
    id: string[] | undefined;
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
  // delete searchParams.id;
  var { id } = params;
  id = id?.filter(function (item, index, inputArray) {
    return inputArray.indexOf(item) == index;
  });

  const ids: string[] = id ? [...id] : [];
  // id&ids=[...id]

  const categories = await getData(id?.at(-1) || "null");
  console.log("Category", id, queryString.stringify(searchParams));

  const stringifyParams = queryString.stringify(params);

  const parseSearchParams = queryString.stringify(searchParams);

  // const { url, backUrl } = HandleURL(id);

  const stringified = queryString.stringify({
    parentCat: id?.slice(-1),
    // callbackUrl: url,
  });
  // id?.splice(-1);
  return (
    <Box component="div" sx={{ width: "100%", justifyContent: "center" }}>
      <Box
        className="flex w-full items-center justify-between"
        component="div"
        sx={{ width: "100%" }}
      >
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          aria-label="add"
        >
          <Link
            href={`/siteSettings/addSetting/add_new_cat?${stringified}&${queryString.stringify(
              searchParams
            )}`}
          >
            اضافه کردن ویژگی جدید
            <AddIcon sx={{ ml: 1 }} />
          </Link>
        </Button>
        {id && (
          <Button
            size="medium"
            variant="outlined"
            color="secondary"
            aria-label="add"
          >
            <Link
              href={`/siteSettings/${id.join("/")}?${queryString.stringify(
                searchParams
              )}`}
            >
              برگشت
              <UndoIcon sx={{ ml: 1 }} />
            </Link>
          </Button>
        )}
      </Box>
      <Box
        component={"div"}
        sx={{
          bgcolor: "background.default",
          display: "grid",
          gap: 2,
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
            {/*  {categories.length > 0 &&
              categories.map((cat: TCategorySchema) => (
                <CatList
                  key={cat._id}
                  ids={ids}
                  catString={JSON.stringify(cat)}
                  stringifyParams={stringifyParams}
                  searchParams={queryString.stringify(searchParams)}
                  accessToken={accessToken!}
                />
              ))} */}
            {categories.length > 0 &&
              categories.map((cat: TCategorySchema) => (
                <Box
                  key={cat._id}
                  className=" flex gap-3 h-12 w-full justify-between items-center border rounded-md py-1 px-3 border-gray-300"
                >
                  {cat.name}
                  <Box className="flex gap-3">
                    <Tooltip title={`ویرایش ${cat.name}`} placement="top">
                      <IconButton className=" flex w-5">
                        {/* <Link
                          href={`${path}addSetting/${encodeURIComponent(
                            cat._id
                          )}?${stringifyParams}&${searchParams}`}
                        >
                          <EditNoteIcon className=" flex w-5" color="info" />
                        </Link> */}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={`گالری ${cat.name}`} placement="top">
                      <IconButton className=" flex w-5">
                        {/* <Link
                          href={`${path}settingsProperties/${encodeURIComponent(
                            cat._id
                          )}?${stringifyParams}&${searchParams}`}
                        >
                          <CollectionsIcon className=" flex w-5" color="info" />
                        </Link> */}
                      </IconButton>
                    </Tooltip>
                    {/* <DeleteModal
                      deleteProduct={(id) => deleteCategory(id)}
                      ref={modalRef}
                      label={<CloseIcon />}
                      // disc="آیا از حذف دسته بندی مطمئن هستید ؟"
                      disc={`آیا از حذف دسته بندی ${cat.name} مطمئن هستید ? `}
                      id={cat._id}
                      ModalTitle={`${cat.name}حذف `}
                    />
 */}
                    <Tooltip title={`زیر شاخه های ${cat.name}`} placement="top">
                      <IconButton className=" flex w-5">
                        <Link
                          href={
                            id
                              ? `${id?.join("/")}/${
                                  cat._id
                                }?${queryString.stringify(searchParams)}`
                              : `siteSettings/${
                                  cat._id
                                }?${queryString.stringify(searchParams)}`
                          }
                        >
                          <PreviewIcon color="info" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
          </Box>
        }
      </Box>
    </Box>
  );
}

export default Category;
