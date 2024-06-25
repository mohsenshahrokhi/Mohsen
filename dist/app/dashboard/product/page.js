import { HiMiniPlus, } from "react-icons/hi2";
import Link from "next/link";
import queryString from "query-string";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProducts } from "@/actions/product";
import ProductList from "@/components/adminComponent/Products/ProductList";
import Pagination from "@/components/adminComponent/Pagination";
async function getData({ page, perPage, accessToken, }) {
    const params = {
        limit: perPage,
        skip: perPage * (page - 1),
        populate: "category.name,category.images,category.latinName,author.displayName",
    };
    const stringifyParams = queryString.stringify(params);
    const products = await getProducts(stringifyParams);
    return products;
}
export default async function Product({ searchParams }) {
    const session = await getServerSession(authOptions);
    const accessToken = session === null || session === void 0 ? void 0 : session.user.accessToken;
    // const verify = (accessToken && verifyJwt(accessToken)) || null;
    // let page = 1;
    let page = parseInt(searchParams.page || "1", 10);
    delete searchParams.page;
    delete searchParams.pId;
    const stringified = queryString.stringify(searchParams);
    page = !page || page < 1 ? 1 : page;
    const perPage = 1;
    const { products, qtt } = await getData({
        page: page,
        perPage: perPage,
        accessToken: accessToken,
    });
    const totalPage = Math.ceil(qtt / perPage);
    const outOfRange = page > totalPage;
    return (<Box component={"section"} className="flex relative flex-col w-full p-2 my-2">
      <Box component={"div"} className="flex w-full flex-col items-center justify-between">
        <Box component={"h4"} className="text-lg ">
          محصولات ثبت شده
        </Box>

        <Box component={"div"} className="flex flex-col items-center gap-3 w-full mt-4 gap-x-3">
          <Link href={`product/addProduct/add_new_product?${stringified}`} className=" flex items-center justify-center gap-3">
            <Box component={"p"}>اضافه کردن محصول جدید</Box>
            <HiMiniPlus />
          </Link>
        </Box>
      </Box>

      <Box component={"div"} className="flex flex-col no-scrollbar mt-6">
        <Box component={"div"} className="-mx-4 -my-2 overflow-x-auto no-scrollbar sm:-mx-6 lg:-mx-8">
          <Box component={"div"} className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Box component={"div"} className="overflow-hidden no-scrollbar border md:rounded-lg">
              {outOfRange ? (<Box component={"div"}>این صفحه وجود ندارد</Box>) : (<Box component={"div"}>
                  <ProductList products={products} stringified={stringified}/>
                  <Pagination page={page} stringified={stringified} totalPage={totalPage}/>
                </Box>)}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>);
}
Product.auth = true;
//# sourceMappingURL=page.js.map