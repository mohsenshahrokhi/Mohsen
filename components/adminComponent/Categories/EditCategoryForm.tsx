// "use client";

// import { createCategory, updateCategory } from "@/actions/category";
// import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Avatar,
//   Box,
//   Button,
//   Fab,
//   FormControl,
//   FormControlLabel,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   Switch,
// } from "@mui/material";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ChangeEvent, MouseEventHandler, useState, useTransition } from "react";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import AddIcon from "@mui/icons-material/Add";
// import queryString from "query-string";
// import { HiXMark } from "react-icons/hi2";
// import {
//   EditCategorySchema,
//   TCategorySchema,
//   TEditCategorySchema,
// } from "@/ZSchemas/CategorySchema";
// import { TOptionSchema } from "@/ZSchemas";
// import {
//   SelectElement,
//   SwitchElement,
//   TextFieldElement,
// } from "react-hook-form-mui";

// type Props = {
//   catString?: string;
//   options: TOptionSchema[];
//   callbackUrl: string;
//   parentId: string;
//   searchParams: string;
// };

// function EditCategoryForm({
//   catString,
//   parentId,
//   searchParams,
//   callbackUrl,
//   options,
// }: Props) {
//   const router = useRouter();

//   const [isPending, startTransition] = useTransition();
//   const cat = JSON.parse(catString!) as TCategorySchema;
//   const [property, setProperty] = useState<{ name: string; values: string }[]>(
//     cat?.propertys || []
//   );

//   const { data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/login");
//     },
//   });

//   const user = session?.user;

//   const accessToken = user?.accessToken || "";

//   const form = useForm<TEditCategorySchema>({
//     resolver: zodResolver(EditCategorySchema),
//     defaultValues: {
//       name: cat?.name,
//       latinName: cat?.latinName,
//       slug: cat?.slug,
//       type: cat?.type,
//       parent: cat?.parent,
//       propertys: cat?.propertys,
//     },
//   });

//   const { control, watch } = form;
//   const { fields, append, remove } = useFieldArray({
//     control: control,
//     name: "propertys",
//   });

//   const catId = cat?._id;

//   const onSubmit = (values: TEditCategorySchema) => {
//     form.setValue("author", user?._id);
//     values.author = user?._id;
//     values.propertys = property;
//     startTransition(() => {
//       updateCategory({ _id: catId, values, accessToken }).then((data) => {
//         if (data.success === true) {
//           HandleEnqueueSnackbar({ variant: "success", msg: data.msg });

//           router.push(`/dashboard/siteSettings/${callbackUrl}`);
//         } else {
//           HandleEnqueueSnackbar({ variant: "error", msg: data.msg });
//         }
//       });
//     });
//   };

//   function addProperty(p: { name: string; values: string }) {
//     const oldP = [...property];
//     oldP.push(p);
//     setProperty(oldP);
//     form.formState.defaultValues?.propertys?.push(p);
//   }

//   function deleteProperty(index: number) {
//     const oldP = [...property];
//     oldP.splice(index, 1);
//     setProperty(oldP);
//     form.formState.defaultValues?.propertys?.splice(index, 1);
//   }

//   function handlePropertyName(
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     index: number
//   ): void {
//     const p = e.target.value;
//     const oldP = [...property];
//     oldP[index].name = p;
//     setProperty(oldP);
//   }

//   function handlePropertyValues(
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     index: number
//   ): void {
//     const p = e.target.value;
//     const oldP = [...property];
//     oldP[index].values = p;
//     setProperty(oldP);
//   }

//   console.log("v", property, form.formState.defaultValues);
//   console.log("cat", cat);

//   return (
//     <Box
//       component="div"
//       sx={{ m: "2px", width: "100%", justifyContent: "center" }}
//     >
//       <Box
//         component={"div"}
//         sx={{
//           p: 2,
//           bgcolor: "background.default",
//           display: "grid",
//           gap: 2,
//           width: "100%",
//         }}
//       >
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <Stack spacing={2}>
//             <TextFieldElement
//               name={"name"}
//               label={"نام دسته بندی"}
//               control={control}
//               required
//               fullWidth
//             />

//             <TextFieldElement
//               name={"latinName"}
//               label={"نام لاتین دسته بندی"}
//               control={control}
//               required
//               fullWidth
//             />
//             <SelectElement
//               name={"parent"}
//               label={"دسته بندی"}
//               control={control}
//               options={options}
//               fullWidth
//             />
//             {fields.map((field, index) => (
//               <Box
//                 className=" flex gap-3 mb-3 justify-start items-center"
//                 key={field.id}
//               >
//                 <TextFieldElement
//                   className=" flex w-1/3"
//                   name={`propertys.${index}.name`}
//                   label={"نام خصوصیت"}
//                   control={control}
//                   required
//                 />
//                 <TextFieldElement
//                   className=" flex w-1/3"
//                   name={`propertys.${index}.values`}
//                   label={"مقدار های خصوصیت با کاما جدا شوند"}
//                   control={control}
//                   required
//                 />
//                 <Button
//                   className=" flex w-1/3"
//                   type="button"
//                   variant="contained"
//                   color="error"
//                   onClick={() => remove(index)}
//                 >
//                   حذف این خصوصیت
//                 </Button>
//               </Box>
//             ))}
//             <Button
//               type="button"
//               disabled={isPending}
//               variant="contained"
//               color="primary"
//               sx={{ width: "100%" }}
//               onClick={() => append({ name: "", values: "" })}
//             >
//               اضافه کردن خواص جدید
//             </Button>

//             <SwitchElement
//               name={"type"}
//               label={"فعال سازی"}
//               color="info"
//               control={control}
//             />

//             <Button
//               type="submit"
//               disabled={isPending}
//               variant="contained"
//               color="info"
//               sx={{ width: "100%" }}
//             >
//               <Box component={"span"}>ویرایش</Box>
//             </Button>
//           </Stack>
//         </form>
//       </Box>
//     </Box>
//   );
// }

// export default EditCategoryForm;
