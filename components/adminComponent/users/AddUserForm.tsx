"use client";

import { TOptionSchema } from "@/ZSchemas";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import {
  RegisterProductSchema,
  TEditProductSchema,
  TRegisterProductSchema,
} from "@/ZSchemas/ProductSchema";
import { Box, Button, Stack } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { useEffect, useState, useTransition } from "react";
import { createProduct, updateProduct } from "@/actions/product";
import { useRouter } from "next/navigation";
import {
  SelectElement,
  SwitchElement,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import {
  RegisterUserFormSchema,
  RegisterUserSchema,
  TRegisterUserFormSchema,
  TRegisterUserSchema,
} from "@/ZSchemas/UserSchema";
import { updateUser } from "@/actions/register";

type Props = {
  catsString: string;
  userString: string;
  add_new_user: boolean;
  accessToken: string;
  roleOptions: TOptionSchema[];
};

function AddUserForm({
  catsString,
  userString,
  add_new_user,
  accessToken,
  roleOptions,
}: Props) {
  const cats = JSON.parse(catsString!) as TCategorySchema[];
  const user = JSON.parse(userString!) as TEditProductSchema;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pSelectOp, setPSelectOp] = useState<TOptionSchema[][]>();
  const [newCat, setNewCat] = useState<TCategorySchema>();
  const [newFields, setNewFields] = useState<
    {
      title: string;
      value: string;
      type: boolean;
    }[]
  >();

  const form = useForm<TRegisterUserFormSchema>({
    mode: "all",
    resolver: zodResolver(RegisterUserFormSchema),
    defaultValues: {
      ...user,
    },
  });

  const { control, handleSubmit, watch, setValue } = form;

  const onSubmit = (values: TRegisterUserFormSchema) => {
    // console.log("AddUserForm", values);
    // add_new_user &&
    // startTransition(() => {
    //   createProduct({ values, accessToken }).then((data) => {
    //     if (data.success === true) {
    //       HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
    //       router.push(`/product`);
    //     } else {
    //       HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
    //     }
    //   });
    // });
    !add_new_user &&
      startTransition(() => {
        updateUser({ _id: user._id, values, accessToken }).then((data) => {
          console.log(data);
          if (data.success === true) {
            HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
            router.push(`/users`);
          } else {
            HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
          }
        });
      });
  };

  // console.log("add_new_product", add_new_product);
  // console.log("pOptions", pSelectOp);
  // console.log("newFields", newFields);
  // console.log("newCat", newCat);

  return (
    <Box
      component="div"
      sx={{ m: "2px", width: "100%", justifyContent: "center" }}
    >
      <Box
        component={"div"}
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "grid",
          gap: 2,
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextFieldElement
              name={"username"}
              label={"نام"}
              control={control}
              required
              fullWidth
            />
            <TextFieldElement
              name={"displayName"}
              label={"نام نمایشی"}
              control={control}
              // type="number"
              required
              fullWidth
            />
            <TextFieldElement
              name={"phone"}
              label={"تلفن همراه"}
              control={control}
              // type="number"
              required
              fullWidth
            />
            <TextFieldElement
              name={"email"}
              label={"ایمیل"}
              control={control}
              // type="number"
              required
              fullWidth
            />

            <TextareaAutosizeElement
              name={"address"}
              label={"آدرس"}
              control={control}
              rows={3}
              fullWidth
            />
            <TextareaAutosizeElement
              name={"description"}
              label={"توضیحات کاربر"}
              control={control}
              rows={3}
              fullWidth
            />

            <SelectElement
              name={"role"}
              label={"دسترسی"}
              control={control}
              options={roleOptions}
              fullWidth
            />

            <SwitchElement
              name={"active"}
              label={"وضعیت"}
              color="info"
              control={control}
            />
          </Stack>

          <Button
            type="submit"
            disabled={isPending}
            variant="contained"
            color="info"
            sx={{ width: "100%", marginTop: "10px" }}
          >
            <Box component={"span"}>ویرایش</Box>
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddUserForm;
