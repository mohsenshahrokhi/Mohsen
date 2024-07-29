import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import { getCategories } from "@/actions/category";
import FoodMenuCarts from "@/components/publicComponents/foodMenu/FoodMenuCarts";
import queryString from "query-string";
export const metadata = {
  title: "Food Menu",
  description: "Generated by Mohsen Shahrokhi",
};
async function getData(cId: string) {
  const params = {
    parent: cId,
  };
  const stringifyParams = queryString.stringify(params);
  const { categories, success } = await getCategories({
    stringifyParams,
  });
  return categories as TCategorySchema[];
}
export default async function MenuPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const categories = await getData("6673f94fceba3a6ae38dd878");
  const catString = JSON.stringify(categories);
  const stringified = queryString.stringify(searchParams);
  return <FoodMenuCarts catString={catString} stringified={stringified} />;
}