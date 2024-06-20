"use client";

import { createCategory, updateCategory } from "@/actions/category";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  RegisterCategorySchema,
  TCategorySchema,
  TRegisterCategorySchema,
} from "@/ZSchemas/CategorySchema";
import {
  SelectElement,
  SwitchElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { TOptionSchema } from "@/ZSchemas";

type Props = {
  catString?: string;
  options: TOptionSchema[];
  add_new_cat: boolean;
  searchParams: string;
  callbackUrl: string;
};

function AddCategoryForm({
  catString,
  callbackUrl,
  options,
  add_new_cat,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const cat = JSON.parse(catString!) as TCategorySchema;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const user = session?.user;

  const accessToken = user?.accessToken || "";

  const form = useForm<TRegisterCategorySchema>({
    mode: "all",
    resolver: zodResolver(RegisterCategorySchema),
    defaultValues: {
      ...cat,
    },
  });

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "propertys",
  });

  const onSubmit = (values: TRegisterCategorySchema): void => {
    add_new_cat &&
      startTransition(() => {
        createCategory({ values, accessToken }).then((data) => {
          if (data.success === true) {
            HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
            router.push(`/dashboard/siteSettings/${callbackUrl}`);
          } else {
            HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
          }
        });
      });

    !add_new_cat &&
      startTransition(() => {
        updateCategory({ _id: cat._id, values, accessToken }).then((data) => {
          if (data.success === true) {
            HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
            router.push(`/dashboard/siteSettings/${callbackUrl}`);
          } else {
            HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
          }
        });
      });
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextFieldElement
              name={"name"}
              label={"نام دسته بندی"}
              control={control}
              required
              fullWidth
            />

            <TextFieldElement
              name={"latinName"}
              label={"نام لاتین دسته بندی"}
              control={control}
              required
              fullWidth
            />
            <SelectElement
              name={"parent"}
              label={"دسته بندی"}
              control={control}
              options={options}
              fullWidth
            />
            {fields.map((field, index) => (
              <Box
                className=" flex gap-3 mb-3 justify-start items-center"
                key={field.id}
              >
                <TextFieldElement
                  className=" flex w-1/3"
                  name={`propertys.${index}.name`}
                  label={"نام خصوصیت"}
                  control={control}
                  required
                />
                <TextFieldElement
                  className=" flex w-1/3"
                  name={`propertys.${index}.values`}
                  label={"مقدار های خصوصیت با کاما جدا شوند"}
                  control={control}
                  required
                />
                <Button
                  className=" flex w-1/3"
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={() => remove(index)}
                >
                  حذف این خصوصیت
                </Button>
              </Box>
            ))}

            <Button
              type="button"
              disabled={isPending}
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
              onClick={() => append({ name: "", values: "" })}
            >
              اضافه کردن خواص جدید
            </Button>
            <SwitchElement
              name={"type"}
              label={"فعال سازی"}
              color="info"
              control={control}
            />
            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              color="info"
              fullWidth
            >
              <Box component={"span"}>ثبت</Box>{" "}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default AddCategoryForm;
