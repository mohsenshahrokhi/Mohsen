import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import NavItem from "./NavItem";
import queryString from "query-string";
import { getCategories } from "@/actions/category";

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

const NavigationFoodMenu = async ({ activeCat }: { activeCat: string }) => {
  const categories = await getData("6673f94fceba3a6ae38dd878");
  const menuCategories = categories?.filter(
    (c: TCategorySchema) => c.type === true
  );
  return (
    <NavItem
      activeCat={activeCat}
      menuCategories={JSON.parse(JSON.stringify(menuCategories))}
    />
  );
};
export default NavigationFoodMenu;
