"use client";

import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import queryString from "query-string";
import { HiXMark } from "react-icons/hi2";
import { useEffect, useState, useTransition } from "react";
import { updateProduct } from "@/actions/product";
import { DevTool } from "@hookform/devtools";
import {
  EditProductSchema,
  ProductSchema,
  RegisterProductSchema,
  TEditProductSchema,
  TProductSchema,
  TRegisterProductSchema,
} from "@/ZSchemas/ProductSchema";
import { TUserSchema } from "@/ZSchemas/UserSchema";
import {
  TCategorySchema,
  TRegisterCategorySchema,
} from "@/ZSchemas/CategorySchema";
import { getCategories } from "@/actions/category";
import {
  TextFieldElement,
  SelectElement,
  SwitchElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { TOptionSchema } from "@/ZSchemas";
import { append } from "stylis";

type Props = {
  productString?: string;
  add_new_product: boolean;
  catOptions: TOptionSchema[];
  userOptions: TOptionSchema[];
  CatsString?: string;
  usersString?: string;
  searchParams: string;
};

function AddProductForm({
  productString,
  catOptions,
  userOptions,
  searchParams,
  add_new_product,
  CatsString,
  usersString,
}: Props) {
  const router = useRouter();
  const [property, setProperty] = useState<
    {
      name: string;
      values: string;
    }[]
  >();

  const [category, setCategory] = useState<TCategorySchema | undefined>();

  const product = JSON.parse(productString!) as TEditProductSchema;
  const cats = JSON.parse(CatsString!) as TCategorySchema[];
  const users = JSON.parse(usersString!) as TUserSchema[];
  // const cats: TCategorySchema[] = []
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const user = session?.user;
  const [isPending, startTransition] = useTransition();
  const accessToken = user?.accessToken || "";

  const form = useForm<TEditProductSchema>({
    mode: "all",
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      ...product,
    },
  });
  // const form = useForm<TEditProductSchema>({
  //   resolver: zodResolver(EditProductSchema),
  //   defaultValues: {
  //     category: editCategory?._id || "",
  //     description: editDescription || "",
  //     images: editImage || [],
  //     price: editPrice || "0",
  //     discount: editDiscount || "",
  //     ratings: editRatings || "",
  //     recipe: editRecipe || "",
  //     seller: editSeller?._id || "",
  //     author: editAuthor?._id || "",
  //     slug: editSlug || "",
  //     title: editTitle || "",
  //     stock: editStock || "",
  //     colorIcon: editColorIcon,
  //     icon: editIcon,
  //     type: editType,
  //     propertys: editPropertys,
  //   },
  // });

  const { control, handleSubmit, watch, setValue } = form;
  const watchC = watch("category");
  // console.log("watch", watchC);
  // const fields = [];
  const { fields, append } = useFieldArray({
    control,
    name: "propertys",
  });

  // useEffect(() => {
  //     setCats(JSON.parse(stringCats!) as TCategorySchema[])
  // }, [stringCats])

  useEffect(() => {
    // const cP = cats?.filter((c) => c._id === watchC)[0];
    const cP: [
      {
        name: string;
        values: string;
      }[]
    ] = [];
    cats.map((c: TCategorySchema) => {
      if (c._id === watchC) {
        cP.push(c.propertys);
        return;
      }
    });
    const field: {
      title: string;
      value: string;
      type: boolean;
      options: TOptionSchema[];
    }[] = [];
    cP[0]?.map((c: { name: string; values: string }) => {
      const cOp: TOptionSchema[] = [];
      values?.map((value: string) => {
        cOp.push({ id: value, label: value });
      });

      append({
        title: c.name,
        value: cOp[0].id,
        type: false,
        options: cOp,
      });
    });
    // setProperty(cP?.propertys);
    console.log(field, cP);

    // form.setValue("propertys", field);

    // setCategory(cP);
  }, [watchC]);

  useEffect(() => {
    // setCategory(category?.propertys);
  }, [category?.propertys]);

  // useEffect(() => {
  //   setValue("propertys", property);
  // }, [property, setValue, watchC]);

  // const c = cats && JSON.parse(cats!) as TCategorySchema[]
  // useEffect(() => {
  //     const catP = cats?.filter((cat) => cat._id === product.category._id)[0]
  //     setProperty(catP.propertys)
  // }, [product.category._id])

  // const w = w

  if (form === undefined) {
    return <h3>loading...</h3>;
  }

  const onSubmit = (values: TEditProductSchema) => {
    console.log("values", values);

    // createCategory({ values, accessToken })
    //     .then((data) => {
    //         console.log(data)

    //         if (data.success === true) {

    //             HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })

    //             // parent ?
    //             //     router.push(`/dashboard/siteSettings/`) :
    //             //     router.push(`/dashboard/siteSettings`)
    //         } else {

    // HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
    //         }

    //     })
    // })

    // startTransition(() => {
    //     updateProduct({ _id: product._id, values, accessToken })
    //         .then((data) => {
    //             console.log(data)

    //             if (data.success === true) {

    //                 HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })
    //                 router.push(`/dashboard/product`)
    //             } else {

    //                 HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
    //             }

    //         })
    // })
  };

  // const { fields, append, remove } = useFieldArray({
  //     name: 'propertys',
  //     control
  // })

  // const allCategory = cats.filter(cat=>cat._id===category)

  console.log("category", category);
  console.log("property", property);
  console.log("fields", fields);

  console.log("defaultValue", form.formState.defaultValues);

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
              required
              fullWidth
            />
            <TextFieldElement
              name={"stock"}
              label={"تعداد محصول"}
              control={control}
              required
              fullWidth
            />
            <TextFieldElement
              name={"discount"}
              label={"تخفیف محصول"}
              control={control}
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
              required
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
            {fields.map((field, index) => (
              <Box className={" flex"} key={field.id}>
                <SelectElement
                  name={`propertys.${index}.title`}
                  label={field.title}
                  control={control}
                  // options={`propertys.${index}.options`}
                  options={catOptions}
                  fullWidth
                />
                <SwitchElement
                  name={`propertys.${index}.type`}
                  label={"فعال سازی"}
                  color="info"
                  control={control}
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
      {/* <DevTool control={control} /> */}
    </Box>
  );
}

export default AddProductForm;
