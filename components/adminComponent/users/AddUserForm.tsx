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

type Props = {
  catsString: string;
  productString: string;
  add_new_product: boolean;
  accessToken: string;
  catOptions: TOptionSchema[];
};

function AddUserForm({
  catsString,
  productString,
  add_new_product,
  accessToken,
  catOptions,
}: Props) {
  const cats = JSON.parse(catsString!) as TCategorySchema[];
  const product = JSON.parse(productString!) as TEditProductSchema;
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

  const form = useForm<TRegisterProductSchema>({
    mode: "all",
    resolver: zodResolver(RegisterProductSchema),
    defaultValues: {
      ...product,
    },
  });

  const { control, handleSubmit, watch, setValue } = form;
  const watchC = watch("category");
  console.log("watch", watchC);
  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "propertys",
  });

  useEffect(() => {
    const category: TCategorySchema = cats?.filter((c) => c._id === watchC)[0];
    setNewCat(category);
  }, [watchC]);

  useEffect(() => {
    const pOptions: TOptionSchema[][] =
      newCat?.propertys?.map((op: { name: string; values: string }) => {
        return op.values.split(",").map((p: string) => {
          return { id: p, label: p };
        });
      }) || [];
    setPSelectOp(pOptions);

    const newFields: {
      title: string;
      value: string;
      type: boolean;
    }[] =
      newCat?.propertys?.map((op: { name: string; values: string }) => {
        return { title: op.name, value: "", type: false };
      }) || [];
    setNewFields(newFields);
  }, [newCat]);

  useEffect(() => {
    replace(newFields!);
  }, [newFields]);

  // useEffect(() => {
  //   replace(product.propertys);
  // }, [product]);

  const onSubmit = (values: TRegisterProductSchema) => {
    add_new_product &&
      startTransition(() => {
        createProduct({ values, accessToken }).then((data) => {
          if (data.success === true) {
            HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
            router.push(`/dashboard/product`);
          } else {
            HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
          }
        });
      });
    !add_new_product &&
      startTransition(() => {
        updateProduct({ _id: product._id, values, accessToken }).then(
          (data) => {
            console.log(data);

            if (data.success === true) {
              HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
              router.push(`/dashboard/product`);
            } else {
              HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
            }
          }
        );
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
              name={"title"}
              label={"نام محصول"}
              control={control}
              required
              fullWidth
            />
            <TextFieldElement
              name={"price"}
              label={"قیمت محصول"}
              control={control}
              // type="number"
              required
              fullWidth
            />
            <TextFieldElement
              name={"stock"}
              label={"تعداد محصول"}
              control={control}
              // type="number"
              required
              fullWidth
            />
            <TextFieldElement
              name={"discount"}
              label={"تخفیف محصول"}
              control={control}
              // type="number"
              required
              fullWidth
            />
            <TextareaAutosizeElement
              name={"description"}
              label={"توضیحات محصول"}
              control={control}
              rows={3}
              required
              fullWidth
            />
            <TextareaAutosizeElement
              name={"recipe"}
              label={"مواد تشکیل دهنده محصول"}
              control={control}
              rows={3}
              // required
              fullWidth
            />
            <SelectElement
              name={"category"}
              label={"دسته بندی"}
              control={control}
              options={catOptions}
              required
              fullWidth
            />
            {pSelectOp &&
              fields.map((field, index) => (
                <Box className={" flex gap-5"} key={field.id}>
                  <SelectElement
                    name={`propertys.${index}.value`}
                    label={field.title}
                    control={control}
                    // options={`propertys.${index}.options`}
                    options={pSelectOp![index]}
                    // fullWidth
                    className=" flex w-4/5"
                  />
                  <SwitchElement
                    control={control}
                    name={`propertys.${index}.type`}
                    label={"فعال سازی"}
                    color="info"
                    className=" flex w-1/5"
                  />
                </Box>
              ))}
            <SwitchElement
              name={"type"}
              label={"فعال سازی"}
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
