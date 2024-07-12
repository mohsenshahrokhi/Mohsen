import React from "react";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import queryString from "query-string";
import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import CatList from "@/components/adminComponent/Categories/CatList";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verifyJwt } from "@/lib/jwt";
import { getCategories } from "@/actions/category";
import CloseIcon from "@mui/icons-material/Close";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";

type Props = {
  params: {
    id: string[] | string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getData(cId: string, accessToken: string) {
  const params = {
    parent: cId,
    populate: "parent.name,author.username",
  };
  const stringifyParams = queryString.stringify(params);

  const { categories, success } = await getCategories({ stringifyParams });

  return categories as TCategorySchema[];
}

async function Category({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.accessToken;
  const verify = (accessToken && verifyJwt(accessToken)) || null;

  const categories = await getData(params.id.slice(-1)[0], accessToken!);
  const parseSearchParams = queryString.stringify(searchParams);

  const { id } = params;

  console.log("params", params);

  let url = "";
  let backUrl = "";

  if (Array.isArray(id)) {
    if (id.length > 1) {
      url = "";
      backUrl = "";
      url = id.join("/");
      const copyUrl = [...id];
      copyUrl.pop();
      backUrl = copyUrl.join("/");
    } else {
      url = id[0];
    }
  }

  const stringified = queryString.stringify({ id: params.id.slice(-1) });

  return (
    <Box
      component="div"
      sx={{ m: "2px", width: "100%", justifyContent: "center" }}
    >
      <Fab size="medium" variant="extended" color="secondary" aria-label="add">
        <Link
          href={`/dashboard/siteSettings/addSetting?${stringified}?${parseSearchParams}`}
        >
          اضافه کردن ویژگی جدید
          <AddIcon sx={{ ml: 1 }} />
        </Link>
      </Fab>
      <Fab size="medium" variant="extended" color="secondary" aria-label="add">
        <Link href={`/dashboard/siteSettings/${backUrl}?${parseSearchParams}`}>
          برگشت
          <UndoIcon sx={{ ml: 1 }} />
        </Link>
      </Fab>
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
          <div>
            {categories.length > 0 &&
              categories.map((cat: TCategorySchema) => (
                <Accordion key={cat._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${cat._id}-bh-content`}
                    id={`panel-${cat._id}-bh-header`}
                  >
                    <Box className=" flex w-full justify-between items-center ml-5">
                      <Typography sx={{ flexShrink: 0 }}>{cat.name}</Typography>

                      <Box className=" flex gap-3">
                        <Tooltip title={`حذف ${cat.name}`} placement="top">
                          <Link href={``}>
                            {/* <Fab color="error" size="small" aria-label="add"> */}
                            <CloseIcon color="error" />
                            {/* </Fab> */}
                          </Link>
                        </Tooltip>

                        <Tooltip title={`ویرایش ${cat.name}`} placement="top">
                          <Link
                            href={`/dashboard/siteSettings/${url}/${cat._id}?${parseSearchParams}`}
                          >
                            {/* <Fab color="info" size="small" aria-label="add"> */}
                            <EditNoteIcon color="info" />
                            {/* </Fab> */}
                          </Link>
                        </Tooltip>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box component={"div"}>
                      <CatList
                        backUrl={backUrl}
                        pathname={`/dashboard/siteSettings/${url}`}
                        parentId={`${cat._id}`}
                        parseSearchParams={parseSearchParams}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        }
      </Box>
    </Box>
  );
}

export default Category;
