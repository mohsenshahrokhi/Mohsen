import { Box, Checkbox, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import Link from "next/link";
import { HiOutlinePencilSquare, HiOutlinePhoto, HiOutlineTrash, } from "react-icons/hi2";
import Image from "next/image";
export default function ProductList({ products, stringified }) {
    function handleDelete(product) { }
    return (<Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Box component={"div"} className="flex items-center gap-x-3">
                  <Checkbox />
                  <Box component={"span"}>نام</Box>
                </Box>
              </TableCell>
              <TableCell>قیمت</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>موجودی</TableCell>
              <TableCell>توضیحات</TableCell>
              <TableCell>دسته بندی</TableCell>
              <TableCell>ثبت کننده</TableCell>
              <TableCell>خواص محصول</TableCell>
              <TableCell>گالری محصول</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(products === null || products === void 0 ? void 0 : products.length) > 0 &&
            products.map((product, index) => {
                var _a, _b, _c, _d;
                return (<TableRow key={index} sx={{
                        "&:last-child TableCell, &:last-child th": { border: 0 },
                    }}>
                  <TableCell component="th" scope="row">
                    <Box component={"div"} className="inline-flex items-center gap-x-3">
                      <Checkbox />

                      <Box component={"div"} className="flex items-center gap-x-2">
                        <Box component={"div"} className="flex items-center justify-center w-8 h-8 overflow-hidden no-scrollbar rounded-full">
                          {/* <Image
                      src={`/uploads/${product.category?.images[0]}`}
                      alt={product.category?.latinName!}
                      width={50}
                      height={30}
                      quality={5}
                    /> */}
                          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                      </svg> */}
                        </Box>

                        <Box component={"div"}>
                          <Box component={"h6"} className="font-normal ">
                            {product.title}
                          </Box>
                          <Box component={"p"} className="text-xs">
                            200 KB
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {product.type === true ? (<Chip label="فعال" color="success"/>) : (<Chip label="غیر فعال" color="primary"/>)}
                    </Stack>
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product === null || product === void 0 ? void 0 : product.description}</TableCell>
                  <TableCell>{(_a = product === null || product === void 0 ? void 0 : product.category) === null || _a === void 0 ? void 0 : _a.name}</TableCell>
                  <TableCell>{(_b = product === null || product === void 0 ? void 0 : product.author) === null || _b === void 0 ? void 0 : _b.displayName}</TableCell>
                  <TableCell>
                    {(_c = product.propertys) === null || _c === void 0 ? void 0 : _c.map((p, index) => p.type && (<Stack key={index} direction="row" spacing={1} className=" mb-1">
                            <Chip label={p === null || p === void 0 ? void 0 : p.title} color="primary"/>
                            <Chip label={p === null || p === void 0 ? void 0 : p.value} color="success"/>
                          </Stack>))}
                  </TableCell>
                  <TableCell>
                    {!!((_d = product === null || product === void 0 ? void 0 : product.images) === null || _d === void 0 ? void 0 : _d.length) &&
                        product.images.map((image) => {
                            return (<Box component={"div"} className="relative flex flex-col h-20 w-20 aspect-video col-span-4" key={image}>
                            <Image src={`/uploads/${image}`} alt={image} width="148" height="199" priority={true} className="rounded-lg"/>
                          </Box>);
                        })}
                  </TableCell>
                  <TableCell>
                    <Box component={"div"} className=" flex w-full justify-around items-center">
                      <Link id={`edit-${product._id}`} href={`/dashboard/product/addProduct/${product === null || product === void 0 ? void 0 : product._id}?${stringified}`} className=" ">
                        <HiOutlinePencilSquare color="orange"/>
                      </Link>
                      <Link id={`gallery-${product._id}`} href={`/dashboard/product/gallery/${product === null || product === void 0 ? void 0 : product._id}?${stringified}`} className=" ">
                        <HiOutlinePhoto color="blue"/>
                      </Link>
                      <Link href={"#"} id={`delete-${product._id}`}>
                        <HiOutlineTrash color="red"/>
                      </Link>

                      {/* <TEMModal
                                                      id={product._id}
                                                      close={isOpen}
                                                      headerTitle="اخطار"
                                                      bodyTitle={`آیا از حذف محصول ${product.title} مطمئن هستید ؟`}
                                                  >
                                                      <TERipple rippleColor="white">
                                                          <button
                                                              onClick={() => deleteP(product?._id)}
                                                              className="  text-slate-100 py-1 px-4 rounded shadow-sm bg-red-600 text-center justify-center items-center">
                                                              {!isLoading ? <span>بله</span> : <span>Deleting...</span>}
                                                          </button>
                                                      </TERipple>
                                                  </TEMModal> */}
                    </Box>
                  </TableCell>
                </TableRow>);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>);
}
//# sourceMappingURL=ProductList.js.map