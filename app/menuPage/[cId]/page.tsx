import { TProductSchema } from "@/ZSchemas/ProductSchema";
import { getProducts } from "@/actions/product";
import BodyFoodMenu from "@/components/publicComponents/foodMenu/BodyFoodMenu";
import queryString from "query-string";
import React from "react";

type Props = {
  params: {
    cId: string;
  };
};

type Data = {
  products: TProductSchema[];
  success: boolean;
  qtt: number;
};
async function getData(cId: string) {
  const params = {
    category: cId,
    type: true,
    populate:
      "category.name,category.images,category.latinName,author.displayName",
  };

  const stringifyParams = queryString.stringify(params);

  const { products } = (await getProducts(stringifyParams)) as Data;

  return products;
}

async function MenuCatPage({ params: { cId } }: Props) {
  const catId = cId;
  const products = await getData(catId);
  console.log("productPage", catId);

  return (
    <BodyFoodMenu
      activeCat={catId}
      products={JSON.parse(JSON.stringify(products))}
    />
  );
}

export default MenuCatPage;
