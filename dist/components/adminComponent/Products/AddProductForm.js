"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
function AddProductForm({ productString, catOptions, userOptions, searchParams, property, add_new_product, CatsString, usersString, }) {
    const router = useRouter();
    const [propertyOp, setPropertyOp] = useState();
    // const product = JSON.parse(productString!) as TEditProductSchema;
    console.log("product");
    const onSubmit = (values) => {
        console.log("values", values);
    };
    // const { fields, append, remove } = useFieldArray({
    //     name: 'propertys',
    //     control
    // })
    // const allCategory = cats.filter(cat=>cat._id===category)
    return (<Box component="div" sx={{ m: "2px", width: "100%", justifyContent: "center" }}></Box>);
}
export default AddProductForm;
//# sourceMappingURL=AddProductForm.js.map