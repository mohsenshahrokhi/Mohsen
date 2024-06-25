"use client";
import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { createProduct, updateProduct } from "@/actions/product";
import { RegisterProductSchema, } from "@/ZSchemas/ProductSchema";
import { TextFieldElement, SelectElement, SwitchElement, TextareaAutosizeElement, } from "react-hook-form-mui";
function AddProductForm({ productString, catOptions, userOptions, searchParams, property, add_new_product, CatsString, usersString, }) {
    const router = useRouter();
    const [propertyOp, setPropertyOp] = useState();
    const [propertys, setPropertys] = useState(property);
    const product = JSON.parse(productString);
    const cats = JSON.parse(CatsString);
    // const users = JSON.parse(usersString!) as TUserSchema[];
    // const cats: TCategorySchema[] = []
    console.log("product", product);
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        },
    });
    const user = session === null || session === void 0 ? void 0 : session.user;
    const [isPending, startTransition] = useTransition();
    const accessToken = (user === null || user === void 0 ? void 0 : user.accessToken) || "";
    const form = useForm({
        mode: "all",
        resolver: zodResolver(RegisterProductSchema),
        defaultValues: {
            ...product,
        },
    });
    const { control, handleSubmit, watch, setValue } = form;
    const watchC = watch("category");
    console.log("watch", watchC);
    // const fields = [];
    const { fields, append, replace, remove } = useFieldArray({
        control,
        name: "propertys",
    });
    useEffect(() => {
        // let cP: {
        //   name: string;
        //   values: string;
        // }[] = [];
        console.log("cl");
        cats.map((c) => {
            if (c._id === watchC) {
                // if (c.propertys && c.propertys.length > 1) {
                console.log("c", c);
                setPropertys(c);
                // }
                return;
            }
        });
        /*     const allCOp: TOptionSchema[][] = [];
        cP &&
          cP.map((c: { name: string; values: string }) => {
            const cOp: TOptionSchema[] = [];
            console.log("c.values", c.values);
            const vS = c.values?.split(",") || [];
            vS.map((value: string) => {
              cOp.push({ id: value, label: value });
            });
            allCOp.push(cOp);
            append({
              title: c.name,
              value: cOp[0].id,
              type: false,
            });
          });
        setPropertyOp(allCOp); */
    }, [watchC]);
    useEffect(() => {
        var _a;
        const allCOp = [];
        // propertys &&
        // if (product.category !== propertys._id) replace([]);
        // product.category === propertys._id &&
        (_a = propertys.propertys) === null || _a === void 0 ? void 0 : _a.map((c, index) => {
            var _a;
            const cOp = [];
            console.log("c.values", c);
            const vS = ((_a = c.values) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
            vS.map((value) => {
                cOp.push({ id: value, label: value });
            });
            allCOp.push(cOp);
            // if (fields.length > 1 && fields[index]?.title === c.name) remove(index);
            // product.category !== propertys._id &&
            if (fields.length > 1 && fields[index].title !== c.name)
                append({
                    title: c.name,
                    value: cOp[0].id,
                    type: false,
                });
        });
        setPropertyOp(allCOp);
    }, [propertys]);
    if (form === undefined) {
        return <h3>loading...</h3>;
    }
    const onSubmit = (values) => {
        console.log("values", values);
        add_new_product &&
            startTransition(() => {
                createProduct({ values, accessToken }).then((data) => {
                    if (data.success === true) {
                        HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
                        router.push(`/dashboard/product`);
                    }
                    else {
                        HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
                    }
                });
            });
        !add_new_product &&
            startTransition(() => {
                updateProduct({ _id: product._id, values, accessToken }).then((data) => {
                    console.log(data);
                    if (data.success === true) {
                        HandleEnqueueSnackbar({ variant: "success", msg: data.msg });
                        router.push(`/dashboard/product`);
                    }
                    else {
                        HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
                    }
                });
            });
    };
    // const { fields, append, remove } = useFieldArray({
    //     name: 'propertys',
    //     control
    // })
    // const allCategory = cats.filter(cat=>cat._id===category)
    // console.log("category", category);
    // console.log("property", propertyOp);
    console.log("fields", fields, propertyOp, propertys);
    console.log("propertys", propertys);
    console.log("defaultValue", form.formState.defaultValues);
    console.log("errors", form.formState.errors);
    return (<Box component="div" sx={{ m: "2px", width: "100%", justifyContent: "center" }}>
      <Box component={"div"} sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gap: 2,
            width: "100%",
        }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextFieldElement name={"title"} label={"نام محصول"} control={control} 
    // required
    fullWidth/>
            <TextFieldElement name={"price"} label={"قیمت محصول"} control={control} 
    // required
    fullWidth/>
            <TextFieldElement name={"stock"} label={"تعداد محصول"} control={control} 
    // required
    fullWidth/>
            <TextFieldElement name={"discount"} label={"تخفیف محصول"} control={control} fullWidth/>
            <TextareaAutosizeElement name={"description"} label={"توضیحات محصول"} control={control} rows={3} 
    // required
    fullWidth/>
            <TextareaAutosizeElement name={"recipe"} label={"مواد تشکیل دهنده محصول"} control={control} rows={3} 
    // required
    fullWidth/>
            <SelectElement name={"category"} label={"دسته بندی"} control={control} options={catOptions} 
    // required
    fullWidth/>
            {propertyOp &&
            fields.map((field, index) => (<Box className={" flex"} key={field.id}>
                  <SelectElement name={`propertys.${index}.value`} label={field.title} control={control} 
            // options={`propertys.${index}.options`}
            options={propertyOp[index]} fullWidth/>
                  <SwitchElement control={control} name={`propertys.${index}.type`} label={"فعال سازی"} color="info"/>
                </Box>))}
            <SwitchElement name={"type"} label={"فعال سازی"} color="info" control={control}/>
          </Stack>

          <Button type="submit" disabled={isPending} variant="contained" color="info" sx={{ width: "100%", marginTop: "10px" }}>
            <Box component={"span"}>ویرایش</Box>
          </Button>
        </form>
      </Box>
      {/* <DevTool control={control} /> */}
    </Box>);
}
export default AddProductForm;
//# sourceMappingURL=Ppppp.js.map