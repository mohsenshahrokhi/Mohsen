"use client";

import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
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
  TEditProductSchema,
  TProductSchema,
} from "@/ZSchemas/ProductSchema";
import { TUserSchema } from "@/ZSchemas/UserSchema";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import { getCategories } from "@/actions/category";

type Props = {
  productInfo?: string;
  stringCats?: string;
  users?: TUserSchema[];
  searchParams: string;
};

function EditProductForm({
  productInfo,
  searchParams,
  stringCats,
  users,
}: Props) {
  const router = useRouter();
  const [property, setProperty] =
    useState<
      { _id: string; name: string; values: { id: string; label: string }[] }[]
    >();
  // const [cats, setCats] = useState<TCategorySchema[]>()
  const product = JSON.parse(productInfo!) as TProductSchema;
  // const product = {} as TProductSchema
  const cats = JSON.parse(stringCats!) as TCategorySchema[];
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

  const {
    category: editCategory,
    description: editDescription,
    images: editImage,
    price: editPrice,
    discount: editDiscount,
    propertys: editPropertys,
    ratings: editRatings,
    recipe: editRecipe,
    reviews: editReviews,
    seller: editSeller,
    author: editAuthor,
    slug: editSlug,
    title: editTitle,
    stock: editStock,
    colorIcon: editColorIcon,
    icon: editIcon,
    images: editImages,
    type: editType,
    // _id,
  } = product;

  const form = useForm<TEditProductSchema>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      category: editCategory?._id || "",
      description: editDescription || "",
      images: editImage || [],
      price: editPrice || "0",
      discount: editDiscount || "",
      ratings: editRatings || "",
      recipe: editRecipe || "",
      seller: editSeller?._id || "",
      author: editAuthor?._id || "",
      slug: editSlug || "",
      title: editTitle || "",
      stock: editStock || "",
      colorIcon: editColorIcon,
      icon: editIcon,
      type: editType,
      propertys: editPropertys,
    },
  });

  const { control, handleSubmit, register, watch, setValue, reset } = form;
  const watchC = watch("category");
  console.log("watch", watchC);
  const fields = [];
  // const { fields } = useFieldArray({
  //     control,
  //     name: 'propertys'
  // })

  // useEffect(() => {
  //     setCats(JSON.parse(stringCats!) as TCategorySchema[])
  // }, [stringCats])

  useEffect(() => {
    const cP = cats?.filter((c) => c._id === watchC)[0];
    // setProperty(cP)
    console.log("cP", cP);

    //     reset(product)
  }, [cats, product, watchC]);

  useEffect(() => {
    setValue("propertys", property);
  }, [property, setValue, watchC]);

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

  console.log("cats", property);

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col w-full items-start"
        >
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              name={`propertys.${index}.title`}
              control={control}
              render={({ field, fieldState }) => (
                <FormControl
                  key={index}
                  component="div"
                  fullWidth
                  sx={{ my: 1 }}
                  variant="outlined"
                >
                  {/* <InputLabel htmlFor={`simple-select-label-${field.name}`}>{field.value}</InputLabel> */}
                  {/* <InputLabel htmlFor={`simple-select-label-${field.name}`}>{field.value}</InputLabel> */}

                  {/* <Select
                                        labelId={`simple-select-label-${field.name}`}
                                        id={`simple-select-${field.name}`}
                                        name={`propertys[${index}].title`}
                                        value={field.name}
                                        label={field.value}
                                        fullWidth
                                    >
                                        {
                                            property && property[index].values.map((p, index) => (
                                                <MenuItem key={index} value={p.id}>{p.label}</MenuItem>
                                            ))
                                        }
                                    </Select> */}
                </FormControl>
              )}
            />
          ))}
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                <InputLabel htmlFor="title">نام محصول</InputLabel>
                <OutlinedInput
                  id="title"
                  // inputComponent={TextMaskCustom as any}
                  {...field}
                  autoComplete="title"
                  disabled={isPending}
                  // onInvalid={true}
                  error={fieldState.error ? true : false}
                  type={"text"}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="start"
                      >
                        {/* {<SendToMobileRoundedIcon />} */}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="نام محصول"
                  fullWidth
                />
                {/* <Input
                                value={values.textmask}
                                onChange={handleChange}
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom as any}
                            /> */}
                <FormHelperText
                  component={"div"}
                  sx={{
                    color: "error.main",
                  }}
                >
                  {fieldState.error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                <InputLabel htmlFor="price">قیمت</InputLabel>
                <OutlinedInput
                  id="price"
                  {...field}
                  autoComplete="price"
                  disabled={isPending}
                  error={fieldState.error ? true : false}
                  type={"number"}
                  label="قیمت"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="start"
                      >
                        {/* {<EmailRoundedIcon />} */}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  component={"div"}
                  sx={{
                    color: "error.main",
                  }}
                >
                  {fieldState.error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                label="فعال کردن"
                labelPlacement="start"
                className=" flex w-full mr-0 items-start"
                control={
                  <Switch
                    onChange={onChange}
                    checked={value}
                    {...{ inputProps: { "aria-label": "Switch demo" } }}
                    color="info"
                  />
                }
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="دسته بندی"
                  fullWidth
                  onChange={onChange}
                >
                  {cats?.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="recipe"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                {/* <InputLabel htmlFor="recipe">توضیحات</InputLabel> */}
                <TextField
                  id="recipe"
                  {...field}
                  autoComplete="recipe"
                  disabled={isPending}
                  multiline
                  error={fieldState.error ? true : false}
                  type={"textAria"}
                  label="مواد تشکیل دهنده"
                  fullWidth
                />
                <FormHelperText
                  component={"div"}
                  sx={{
                    color: "error.main",
                  }}
                >
                  {fieldState.error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                {/* <InputLabel htmlFor="description">توضیحات</InputLabel> */}
                <TextField
                  id="description"
                  {...field}
                  autoComplete="description"
                  disabled={isPending}
                  multiline
                  error={fieldState.error ? true : false}
                  type={"textAria"}
                  label="توضیحات"
                  fullWidth
                  rows={4}
                />
                <FormHelperText
                  component={"div"}
                  sx={{
                    color: "error.main",
                  }}
                >
                  {fieldState.error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="discount"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                <InputLabel htmlFor="discount">میزان تخفیف</InputLabel>
                <OutlinedInput
                  id="discount"
                  {...field}
                  autoComplete="discount"
                  disabled={isPending}
                  error={fieldState.error ? true : false}
                  type={"number"}
                  label="میزان تخفیف"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="start"
                      >
                        {/* {<EmailRoundedIcon />} */}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  component={"div"}
                  sx={{
                    color: "error.main",
                  }}
                >
                  {fieldState.error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="stock"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                <InputLabel htmlFor="stock">مقدار موجودی</InputLabel>
                <OutlinedInput
                  id="stock"
                  {...field}
                  autoComplete="stock"
                  disabled={isPending}
                  error={fieldState.error ? true : false}
                  type={"number"}
                  label="مقدار موجودی"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="start"
                      >
                        {/* {<EmailRoundedIcon />} */}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  component={"div"}
                  sx={{
                    color: "error.main",
                  }}
                >
                  {fieldState.error?.message ?? ""}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="seller"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="div"
                fullWidth
                sx={{ my: 1 }}
                variant="outlined"
              >
                <InputLabel id="demo-simple-select-label">
                  خریدار این محصول
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="خریدار این محصول"
                  fullWidth
                  onChange={onChange}
                >
                  {users?.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.displayName || user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

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

export default EditProductForm;
