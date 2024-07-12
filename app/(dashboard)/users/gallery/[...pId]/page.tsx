/* eslint-disable react/jsx-no-undef */
"use client";

import ControlledImage from "@/components/adminComponent/Categories/ControlledImage";
import { Box, Button, Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { HiMiniPlus, HiOutlineArrowUpTray } from "react-icons/hi2";

function ProductGallery({}: string) {
  const router = useRouter();

  const { pId } = useParams();
  const searchParams = useSearchParams();

  const PId = searchParams.get("PId");
  const defaultImg = searchParams.get("defaultImg");
  const title = searchParams.get("title");
  const callback = searchParams.get("callback");
  const album = JSON.parse(defaultImg || "");
  const [productInfo, setProductInfo] = useState();
  const [gallerys, setGallerys] = useState([]);

  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // useEffect(() => {

  //     axios.get(`/api/product/${pId}`).then((response) => {
  //         setProductInfo(response.data.product)
  //     })

  // }, [pId])

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setImages(_files);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image, i) => {
      formData.append(image.name, image);
    });
    setUploading(true);
    // await axios.patch("/api/product/uploadImages/" + pId, formData)
    // await axios.post("/api/product/uploadImages", formData)
    setUploading(false);
    router.push("/product");
  };

  console.log(
    "ProductGallery",
    PId,
    pId[0],
    JSON.parse(defaultImg!),
    title,
    callback
  );

  return (
    <div className="flex flex-col w-full">
      <section className="flex relative overflow-y-auto flex-col w-full p-10 my-2">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            عکس های محصول
          </h2>

          <div className="flex items-center mt-4 gap-x-3">
            <Tooltip
              title={`اضافه کردن عکس جدید به محصول ${title}`}
              placement="top"
            >
              <Link
                id="addProduct"
                // href={"/gallery/addFile"}
                href={`/gallery/addIcon/productImg?PId=${PId}&imageFor=product&defaultImg=${JSON.stringify(
                  defaultImg
                )}&title=${title}`}
                type="button"
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                <span>{`اضافه کردن عکس جدید به محصول ${title}`}</span>
                <HiMiniPlus />
              </Link>
            </Tooltip>
          </div>
        </div>

        <Box className="flex flex-col mt-2">
          {defaultImg &&
            album.map((gallery: string, index: number) => (
              <div className="flex" key={index}>
                <ControlledImage
                  img={gallery!}
                  PId={PId!}
                  album={album}
                  property={"productImg"}
                  stringifyParams={"stringifyParams"}
                />
              </div>
            ))}
        </Box>
      </section>
    </div>
  );
}

export default ProductGallery;
