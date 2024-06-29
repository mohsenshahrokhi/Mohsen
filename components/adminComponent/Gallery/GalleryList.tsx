"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { startTransition, useEffect, useState } from "react";
import { Box, Button, Checkbox } from "@mui/material";
import Lootti from "@/components/publicComponents/Lootti";
import { updateCategory } from "@/actions/category";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { TGallerySchema } from "@/ZSchemas/GallerySchema";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import { deleteImg } from "@/actions/gallery";

function GalleryList({
  gallery,
  searchParams,
  categoryString,
  catField,
}: {
  gallery: TGallerySchema[];
  categoryString?: string;
  catField?: "colorIcon" | "icon" | "images" | undefined;
  searchParams: string;
}) {
  const router = useRouter();

  // const params = queryString.parse(searchParams)

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [images, setImages] = useState<string[]>([]);

  // const userId = session?.user?.id

  const accessToken = (session?.user && session?.user?.accessToken) || "";

  const category = categoryString
    ? (JSON.parse(categoryString || "") as TCategorySchema) || undefined
    : null;

  useEffect(() => {
    if (category && catField === "images") setImages(category?.images);
  }, [catField]);

  function handlePhoto(e: string) {
    console.log(e);

    let oldImg = [...images];
    if (oldImg.includes(e)) {
      oldImg = oldImg.filter((old) => old !== e);
    } else {
      if ((catField === "icon" || "colorIcon") && oldImg.length < 1)
        oldImg.push(e);

      (catField === "images" || catField === undefined) && oldImg.push(e);
    }

    setImages(oldImg);
  }

  const imageSvgContainer = (image: TGallerySchema) => {
    return (
      <Box
        component={"div"}
        className=" flex text-center justify-center cursor-pointer"
        // onClick={() => handlePhoto(image._id)}
        onClick={() =>
          handlePhoto(`${catField ? `${image.type}/${image.url}` : image._id}`)
        }
        // onClick={() => handlePhoto(`${image.type}/${image.url}`)}
      >
        <Box component={"div"} className="flex flex-col border">
          <Box component={"div"} className="p-2 md:flex-shrink-0">
            <Box
              component={"div"}
              className="relative overflow-hidden bg-cover bg-no-repeat"
            >
              <Image
                src={`/uploads/${image.type}/${image.url}`}
                width="148"
                height="199"
                priority={true}
                alt={"galler"}
                className="rounded-lg"
              />
              <Box
                component={"div"}
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"
              ></Box>
              <Box component={"div"} className=" absolute left-0 top-0">
                <Checkbox
                  id={image._id}
                  checked={
                    images.includes(`${image._id}`) ||
                    images.includes(`${image.type}/${image.url}`)
                  }
                  color="info"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const videoContainer = (image: TGallerySchema, key: string) => {
    return (
      <Box
        key={key}
        component={"div"}
        className=" flex text-center justify-center"
      >
        <Box component={"div"} className="flex flex-col border">
          <Box component={"div"} className="p-2 md:flex-shrink-0">
            <Box
              component={"div"}
              className="relative overflow-hidden bg-cover bg-no-repeat"
            >
              <video
                autoPlay
                muted
                loop
                className=" flex h-20 w-20 object-cover fixed"
              >
                <source
                  type={image.type}
                  src={`./uploads/${image.type}/${image.url}`}
                />
              </video>
              <Box
                component={"div"}
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"
              ></Box>
              <Box component={"div"} className=" absolute right-1 top-1">
                {/* <Checkbox
                                                                    id={galler._id}
                                                                    checked={false}
                                                                    setCheck={() => handleSelected(galler.url)}
                                                                />  */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const svgContainer = async (image: TGallerySchema) => {
    console.log("path:", `./public/uploads/${image.type}/${image.url}`);
    // const DynamicComponent = dynamic(() => import(`@/public/uploads/${image.type}/${image.url}`));

    // const { default: data } = await import(`@/public/uploads/${image.type}/${image.url}`, { assert: { type: "json" } });
    return (
      <Box component={"div"} className=" flex text-center justify-center">
        {/* {<DynamicComponent />} */}
        <Box component={"div"} className="flex flex-col border">
          <Box component={"div"} className="p-2 md:flex-shrink-0">
            <Box
              component={"div"}
              className="relative overflow-hidden bg-cover bg-no-repeat"
            >
              <Lootti
                animationData={`./public/uploads/${image.type}/${image.url}`}
                loop={true}
              />
              <Box
                component={"div"}
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"
              ></Box>
              <Box component={"div"} className=" absolute right-1 top-1">
                {/* <Checkbox
                                                                    id={galler._id}
                                                                    checked={false}
                                                                    setCheck={() => handleSelected(galler.url)}
                                                                />  */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  console.log("galleryList", images, category);

  async function actionImgs() {
    if (catField) {
      let values = { ...category };
      const catId = values._id;
      delete values._id;
      if (catField === "icon") {
        values.icon = images[0];
      }

      if (catField === "colorIcon") {
        values.colorIcon = images[0];
      }

      if (catField === "images") {
        values.images = images;
      }
      console.log("actionImgs images", catField, values);
      startTransition(() => {
        updateCategory({ _id: catId, values, accessToken }).then((data) => {
          if (data.success === true) {
            HandleEnqueueSnackbar({ variant: "success", msg: data.msg });

            router.push(
              `/dashboard/siteSettings/settingsProperties/${catId}?${searchParams}`
            );
          } else {
            HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
          }
        });
      });
    } else {
      console.log("actionImgs images", catField, images);

      // startTransition(() => {
      //   deleteImg({ img: images, accessToken }).then((data) => {

      //     if (data.success === true) {
      //       HandleEnqueueSnackbar({ variant: "success", msg: data.msg });

      //       router.push(`/dashboard/siteSettings/gallery?${searchParams}`);
      //     } else {
      //       HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
      //     }
      //   });
      // });
    }
  }

  return (
    <Box component={"div"} className="flex flex-col mt-2">
      <Box component={"div"} className=" flex py-10 h-32">
        {images.length > 0 && (
          <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={actionImgs}
          >
            {catField ? (
              catField === "colorIcon" || catField === "icon" ? (
                catField === "colorIcon" ? (
                  <span>
                    به روز رسانی آیکون رنگی دسته بندی {category?.name}
                  </span>
                ) : (
                  <span>
                    به روز رسانی آیکون سیاه و سفید دسته بندی {category?.name}
                  </span>
                )
              ) : (
                <span>به روز رسانی گالری دسته بندی {category?.name}</span>
              )
            ) : (
              <span> پاک کردن عکس های انتخاب شده</span>
            )}
          </Button>
        )}
      </Box>
      <Box
        component={"div"}
        className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
      >
        <Box
          component={"div"}
          className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
        >
          <Box
            component={"div"}
            className=" grid grid-cols-4 md:grid-cols-12 p-5 gap-2 overflow-hidden border md:rounded-lg"
          >
            {gallery.length > 0 &&
              gallery.map((galler, index) => (
                <Box key={index}>
                  {galler.type === "image/svg+xml" && imageSvgContainer(galler)}
                </Box>
              ))}

            {gallery.length > 0 &&
              gallery.map((galler, index) => (
                <Box key={index}>
                  {(galler.type === "image/jpeg" ||
                    galler.type === "image/png") &&
                    imageSvgContainer(galler)}
                </Box>
              ))}

            {/* {gallerys.length > 0 && gallerys.map((galler) => (
                    <>
                        {galler.type === 'video/mp4' &&
                            videoContainer(galler, galler._id)
                        }
                    </>
                ))} */}

            {/* {gallerys.length > 0 && gallerys.map((galler) => (
                    <div key={galler._id}>
                        {galler.type === 'application/json' &&
                            svgContainer(galler)
                        }
                    </div>
                ))} */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GalleryList;
