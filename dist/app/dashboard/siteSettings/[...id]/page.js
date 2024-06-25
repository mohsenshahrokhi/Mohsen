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
import CatList from "@/components/adminComponent/Categories/CatList";
async function getData(cId, accessToken) {
    const params = {
        parent: cId,
        populate: "parent.name,author",
    };
    const stringifyParams = queryString.stringify(params);
    const { categories, success } = await getCategories({
        stringifyParams,
        accessToken,
    });
    return categories;
}
async function Category({ params, searchParams }) {
    const session = await getServerSession(authOptions);
    const accessToken = session === null || session === void 0 ? void 0 : session.user.accessToken;
    const { id } = params;
    const categories = await getData(id.slice(-1)[0], accessToken);
    const stringifyParams = queryString.stringify(params);
    const parseSearchParams = queryString.stringify(searchParams);
    const { url, backUrl } = HandleURL(id);
    const stringified = queryString.stringify({ parentCat: params.id.slice(-1) });
    return (<Box component="div" sx={{ m: "2px", width: "100%", justifyContent: "center" }}>
      <Box className="flex w-full items-center justify-between" component="div" sx={{ m: "2px", width: "100%" }}>
        <Button size="medium" variant="outlined" color="secondary" aria-label="add">
          <Link href={`/dashboard/siteSettings/addSetting/add_new_cat?${stringified}&callbackUrl=${url}`}>
            اضافه کردن ویژگی جدید
            <AddIcon sx={{ ml: 1 }}/>
          </Link>
        </Button>
        <Button size="medium" variant="outlined" color="secondary" aria-label="add">
          <Link href={`/dashboard/siteSettings/${backUrl}?${parseSearchParams}`}>
            برگشت
            <UndoIcon sx={{ ml: 1 }}/>
          </Link>
        </Button>
      </Box>
      <Box component={"div"} sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gap: 2,
            m: 2,
        }}>
        {<Box sx={{
                p: 2,
                bgcolor: "background.default",
                display: "grid",
                gap: 2,
                m: 2,
            }}>
            {categories.length > 0 &&
                categories.map((cat) => (<CatList key={cat._id} catString={JSON.stringify(cat)} stringifyParams={stringifyParams} accessToken={accessToken}/>))}
          </Box>}
      </Box>
    </Box>);
}
export default Category;
{
    /* <Accordion key={cat._id} >
                                  <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`panel-${cat._id}-bh-content`}
                                      id={`panel-${cat._id}-bh-header`}
                                  >
                                      <Box className=' flex w-full justify-between items-center ml-5'>
  
                                          <Typography sx={{ flexShrink: 0 }}>
                                              {cat.name}
                                          </Typography>
  
                                          <Box className=' flex gap-3'>
                                              <Tooltip title={`حذف ${cat.name}`} placement="top">
                                                  <Link
                                                      href={`/dashboard/siteSettings/deleteSettings/${encodeURIComponent(cat._id)}?${parseSearchParams}`}
                                                  >
                            
                                                      <CloseIcon color="error" />
                                                
                                                  </Link>
                                              </Tooltip>
  
                                              <Tooltip title={`ویرایش ${cat.name}`} placement="top">
                                                  <Link
                                                      href={`/dashboard/siteSettings/addSetting/${encodeURIComponent(cat._id)}?${parseSearchParams}`}
                                                  >
                       
                                                      <EditNoteIcon color='info' />
                                                     
                                                  </Link>
                                              </Tooltip>
                                              <Tooltip title={`زیر شاخه های ${cat.name}`} placement="top">
                                                  <Link
                                                      href={`/dashboard/siteSettings/${url}/${encodeURIComponent(cat._id)}?${parseSearchParams}`}
                                                  >
                             
                                                      <PreviewIcon color='info' />
                                                   
                                                  </Link>
                                              </Tooltip>
                                          </Box>
                                      </Box>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                      <Box
                                          component={'div'}
                                      >
                                          <CatList
                                              backUrl={backUrl}
                                              pathname={`/dashboard/siteSettings/${url}`}
                                              parentId={`${cat._id}`}
                                              parseSearchParams={parseSearchParams}
                                          />
                                      </Box>
                                  </AccordionDetails>
                              </Accordion> */
}
//# sourceMappingURL=page.js.map