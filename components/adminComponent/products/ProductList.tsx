"use client";

import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  // Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  HiOutlinePencilSquare,
  HiOutlinePhoto,
  HiOutlineTrash,
} from "react-icons/hi2";
import Image from "next/image";
import { TProductSchema } from "@/ZSchemas/ProductSchema";
import CloseIcon from "@mui/icons-material/Close";
import BasicModal from "@/components/ui/BasicModal";
import {
  forwardRef,
  startTransition,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { deleteCat } from "@/actions/category";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { deleteP } from "@/actions/product";
import { ModalProps } from "@/ZSchemas";
import DeleteModal from "@/components/ui/DeleteModal";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Link from "next/link";

type Props = {
  stringProducts: string;
  stringified: string;
  accessToken: string;
};

export default function ProductList({
  stringProducts,
  stringified,
  accessToken,
}: Props) {
  const modalRef = useRef<ModalProps>(null);

  const products = JSON.parse(stringProducts) as TProductSchema[];

  function deleteProduct(id: string) {
    startTransition(() => {
      deleteP({ id, accessToken }).then((data) => {
        console.log("data", data);
        if (data?.success === true) {
          modalRef.current?.handleClose();
          HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
        } else {
          HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
        }
      });
    });
  }

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
            {products?.length > 0 &&
              products.map((product: TProductSchema, index: number) => (
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
                  <TableCell>
                    {digitsEnToFa(addCommas(product.price))}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {product.type === true ? (
                        <Chip label="فعال" color="success" />
                      ) : (
                        <Chip label="غیر فعال" color="primary" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {digitsEnToFa(addCommas(product.stock))}
                  </TableCell>
                  <TableCell>{product?.description}</TableCell>
                  <TableCell>{product?.category?.name}</TableCell>
                  <TableCell>{product?.author?.displayName}</TableCell>
                  <TableCell>
                    {product.propertys?.map(
                      (p, index) =>
                        p.type && (
                          <Stack
                            key={index}
                            direction="row"
                            spacing={1}
                            className=" mb-1"
                          >
                            <Chip label={p?.title} color="primary" />
                            <Chip label={p?.value} color="success" />
                          </Stack>
                        )
                    )}
                  </TableCell>
                  <TableCell>
                    {!!product?.images?.length &&
                      product.images.map((image, index) => {
                        return (
                          <Box
                            component={"div"}
                            className="relative flex flex-col h-20 w-20 aspect-video col-span-4"
                            key={index}
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
                      className=" flex sm:flex-col sm:max-h-20 w-full justify-around items-center"
                    >
                      <Box
                        component={"div"}
                        className=" flex gap-x-4 w-full justify-around items-center"
                      >
                        <Tooltip
                          title={`ویرایش ${product.title}`}
                          placement="top"
                        >
                          <IconButton color="warning" className=" flex w-5">
                            <Link
                              id={`edit-${product._id}`}
                              href={`/product/addProduct/${product?._id}?${stringified}`}
                            >
                              <HiOutlinePencilSquare color="orange" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"عکس ها"} placement="top">
                          <IconButton color="warning" className=" flex w-5">
                            <Link
                              id={`gallery-${product._id}`}
                              href={`/product/gallery/productImg?PId=${
                                product?._id
                              }&defaultImg=${JSON.stringify(
                                product.images
                              )}&title=${
                                product.title
                              }&callback=${stringified}`}
                            >
                              <HiOutlinePhoto color="blue" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box
                        component={"div"}
                        className=" flex gap-x-4 w-full justify-around items-center"
                      >
                        <Tooltip
                          title={`کپی از ${product.title}`}
                          placement="top"
                        >
                          <IconButton color="warning" className=" flex w-5">
                            <Link
                              id={`edit-${product._id}`}
                              href={`product/addProduct/${product._id}?type=copy_product&&${stringified}`}
                              className=" "
                            >
                              <ContentCopyIcon color="info" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <DeleteModal
                          deleteProduct={(id) => deleteProduct(id)}
                          ref={modalRef}
                          label={<CloseIcon />}
                          disc={`آیا از حذف محصول ${product.title} مطمئن هستید ؟`}
                          id={product._id}
                          ModalTitle={` حذف ${product.title}`}
                        />
                      </Box>
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
