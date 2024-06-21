import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import {
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineTrash,
} from "react-icons/hi2";
import Image from "next/image";
import { TProductSchema } from "@/ZSchemas/ProductSchema";

type Props = {
  products: TProductSchema[];
  stringified: string;
};

export default function ProductList({ products, stringified }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
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
            {products?.length > 0 &&
              products.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child TableCell, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      component={"div"}
                      className="inline-flex items-center gap-x-3"
                    >
                      <Checkbox />

                      <Box
                        component={"div"}
                        className="flex items-center gap-x-2"
                      >
                        <Box
                          component={"div"}
                          className="flex items-center justify-center w-8 h-8 overflow-hidden no-scrollbar rounded-full"
                        >
                          <Image
                            src={`/uploads/${product.category?.images[0]}`}
                            alt={product.category?.latinName!}
                            width={50}
                            height={30}
                            quality={5}
                          />
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
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product?.description}</TableCell>
                  <TableCell>{product?.category?.name}</TableCell>
                  <TableCell>{product?.author?.displayName}</TableCell>
                  <TableCell>
                    {
                      // product.propertys?.length && product.propertys.map((p, index) => (
                      //     <div
                      //         className=" flex flex-col mb-2"
                      //         key={index}>
                      //         <div className=" flex justify-between">
                      //             <span
                      //                 className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 dark:bg-primary-700 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700 dark:text-primary-200">
                      //                 {p[0]?.title}
                      //             </span>
                      //             <span
                      //                 className="inline-block whitespace-nowrap rounded-[0.27rem] bg-secondary-100 dark:bg-secondary-700 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800 dark:text-secondary-200">
                      //                 {p[0]?.value}
                      //             </span>
                      //         </div>
                      //     </div>
                      // ))
                    }
                  </TableCell>
                  <TableCell>
                    {!!product?.images?.length &&
                      product.images.map((image) => {
                        return (
                          <Box
                            component={"div"}
                            className="relative flex flex-col h-20 w-20 aspect-video col-span-4"
                            key={image}
                          >
                            <Image
                              src={`/uploads/${image}`}
                              alt={image}
                              width="148"
                              height="199"
                              priority={true}
                              className="rounded-lg"
                            />
                          </Box>
                        );
                      })}
                  </TableCell>
                  <TableCell>
                    <Box
                      component={"div"}
                      className=" flex w-full justify-around items-center"
                    >
                      <Link
                        id={`edit-${product._id}`}
                        href={`/dashboard/product/addProduct/${product?._id}&${stringified}`}
                        className=" "
                      >
                        <HiOutlinePencilSquare color="orange" />
                      </Link>
                      <Link
                        id={`gallery-${product._id}`}
                        href={`/dashboard/product/gallery/${product?._id}`}
                        className=" "
                      >
                        <HiOutlinePhoto color="blue" />
                      </Link>
                      <Link
                        href={"#"}
                        id={`delete-${product._id}`}
                        // onClick={() => handleDelete(product)}
                      >
                        <HiOutlineTrash color="red" />
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
