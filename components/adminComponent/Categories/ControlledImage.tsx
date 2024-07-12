import { Box, Button } from "@mui/material";
import React, { startTransition } from "react";
import Image from "next/image";
import { updateCategory } from "@/actions/category";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  TCategorySchema,
  TEditCategorySchema,
  TRegisterCategorySchema,
} from "@/ZSchemas/CategorySchema";
import { updateProduct } from "@/actions/product";

type Props = {
  PId: string;
  img: string;
  album?: string[];
  property: "colorIcon" | "icon" | "images" | "productImg" | undefined;
  stringifyParams: string;
};

function ControlledImage({
  PId,
  img,
  property,
  album,
  stringifyParams,
}: Props) {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const user = session?.user;

  const accessToken = user?.accessToken || "";

  function handleDelete({
    PId,
    catField,
    image,
  }: {
    PId: string;
    catField: string;
    image: string;
  }): void {
    console.log("ControlledImage", PId, catField, image, album);
    let values: TEditCategorySchema = {};

    switch (catField) {
      case "colorIcon":
        values.colorIcon = "";
        break;
      case "icon":
        values.icon = "";
        break;
      case "images":
        const oldImg = album!;
        const filter = oldImg.filter((img) => image !== img);
        values.images = filter;
        break;

      case "productImg":
        const oldImg1 = album!;
        const filter1 = oldImg1.filter((img) => image !== img);
        values.images = filter1;
        break;

      default:
        break;
    }

    console.log("actionImgs up images", catField, values);
    catField !== "productImg" &&
      startTransition(() => {
        updateCategory({ _id: PId, values, accessToken }).then((data) => {
          if (data.success === true) {
            HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
            router.push(
              `/siteSettings/settingsProperties/${PId}?${stringifyParams}`
            );
          } else {
            HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
          }
        });
      });

    catField === "productImg" &&
      startTransition(() => {
        updateProduct({ _id: PId, values, accessToken }).then((data) => {
          if (data.success === true) {
            HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
            router.push(`/product?${stringifyParams}`);
            // router.push(
            //   `/siteSettings/settingsProperties/${PId}?${stringifyParams}`
            // );
          } else {
            HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
          }
        });
      });
  }

  return (
    <Box
      component={"div"}
      className="flex flex-col justify-center items-center shadow-lg"
    >
      <Box
        component={"div"}
        className="relative overflow-hidden flex flex-col justify-center items-center p-2 rounded-md"
      >
        <Image
          src={`/uploads/${img}`}
          width="100"
          height="100"
          priority={true}
          alt={img}
          className="rounded-lg flex w-20 h-20"
        />
        <Box
          component={"span"}
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,32%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"
        >
          <Box component={"span"} className="absolute left-0 top-0">
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleDelete({ PId: PId!, catField: property!, image: img })
              }
            >
              حذف
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ControlledImage;
