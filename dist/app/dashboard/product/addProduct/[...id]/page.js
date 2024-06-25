import { getCategories } from "@/actions/category";
import { getPBy } from "@/actions/product";
import { getAllU } from "@/actions/register";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddProductForm from "@/components/adminComponent/Products/AddProductForm";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import queryString from "query-string";
import React from "react";
async function getData() {
    const CParams = {
        // _id: pId,
        // populate: 'category.name,category.images,category.-_id,category.latinName,author.displayName,author.-_id,seller.displayName,seller.-_id'
        limit: 2000,
    };
    const UParams = {
        // _id: pId,
        // populate: 'category.name,category.images,category.-_id,category.latinName,author.displayName,author.-_id,seller.displayName,seller.-_id'
        limit: 2000,
    };
    const stringifyCParams = queryString.stringify(CParams);
    const stringifyUParams = queryString.stringify(UParams);
    const [{ categories }, { users }] = await Promise.all([
        getCategories({ stringifyParams: stringifyCParams }),
        getAllU({ stringifyParams: stringifyUParams }),
    ]);
    return { categories, users };
}
async function getP(pId) {
    const PParams = {
        _id: pId,
        // populate:
        //   "category.name,category.images,category.latinName,category.propertys,author.displayName,seller.displayName",
    };
    const stringifyPParams = queryString.stringify(PParams);
    const { product } = await getPBy(stringifyPParams);
    return product;
}
async function AddProduct({ params, searchParams }) {
    const session = await getServerSession(authOptions);
    const accessToken = session === null || session === void 0 ? void 0 : session.user.accessToken;
    const pId = searchParams.pId ? searchParams.pId : "";
    const stringifyParams = queryString.stringify(searchParams);
    const callbackUrl = searchParams.callbackUrl;
    const { id } = params;
    const add_new_product = id[0] === "add_new_product" ? true : false;
    let product;
    add_new_product
        ? (product = {
            _id: "",
            title: "",
            price: "",
            discount: "",
            recipe: "",
            stock: "",
            description: "",
            propertys: [],
            category: "",
            type: false,
            author: session === null || session === void 0 ? void 0 : session.user._id,
            createdAt: new Date(),
        })
        : (product = await getP(id[0]));
    const { categories, users } = await getData();
    const catOptions = [];
    categories === null || categories === void 0 ? void 0 : categories.map((cat) => {
        catOptions.push({ id: cat._id, label: cat.name });
    });
    const userOptions = [];
    users === null || users === void 0 ? void 0 : users.map((user) => {
        userOptions.push({ id: user._id, label: user._id });
    });
    // const session = await getServerSession(authOptions)
    // const accessToken = session?.user.accessToken as string
    // const stringifyParams = queryString.stringify(searchParams)
    // const pId = searchParams.id as string
    // const { id } = params
    // const edit = id[0] === 'edit' ? true : false
    // const { product, categories, users } = await getData(pId, accessToken)
    // console.log("product", product);
    const propertys = [];
    categories === null || categories === void 0 ? void 0 : categories.map((c) => {
        if (c._id === product.category) {
            // if (c.propertys && c.propertys.length > 1) {
            console.log("c", c);
            propertys.push(c.propertys);
            // }
            return;
        }
    });
    return (<Box className="flex relative flex-col w-full">
      {/* {edit && <Ppppp
                  searchParams={stringifyParams}
                  product={[]}
              />} */}
      {/* {add_new_product && ( */}
      <AddProductForm add_new_product={add_new_product} searchParams={stringifyParams} catOptions={catOptions} userOptions={userOptions} property={propertys} productString={JSON.stringify(product)} CatsString={JSON.stringify(categories)} usersString={JSON.stringify(users)}/>
      {/* )} */}
      {/* {!add && <Ppppp
                  searchParams={stringifyParams}
                  product={product}
              // callbackUrl={callbackUrl}
              />} */}
    </Box>);
}
export default AddProduct;
//# sourceMappingURL=page.js.map