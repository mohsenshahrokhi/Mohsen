import Banner from "./Banner";
import AnimateCharacter from "./AnimateCharacter";
import AnimateWord from "./AnimateWord";
import { TProductSchema } from "@/ZSchemas/ProductSchema";
import {
  addCommas,
  digitsEnToFa,
  halfSpace,
} from "@persian-tools/persian-tools";
import { Box } from "@mui/material";
import NavigationFoodMenu from "./NavigationFoodMenu";

const BodyFoodMenu = ({
  products,
  activeCat,
}: {
  products: TProductSchema[];
  activeCat: string;
}) => {
  if (products?.length === 0) {
    return <h3>loading...</h3>;
  }
  return (
    <Box component={"div"} className="flex flex-col w-full ">
      <Box
        component={"div"}
        className="relative overflow-hidden bg-cover bg-no-repeat"
      >
        {products?.length > 0 &&
          products[0]?.category &&
          products[0]?.category.images &&
          products[0]?.category.images.length > 0 && (
            <Box className=" flex w-full justify-center items-center">
              <Banner
                banner={products[0]?.category?.images[0]}
                item={products[0]?.category?.latinName}
              />
            </Box>
          )}

        <Box
          component={"div"}
          className=" grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2"
        >
          {products?.length > 0 &&
            products.map((product: TProductSchema) => (
              <Box component={"div"} className="" key={product._id}>
                <Box
                  component={"div"}
                  className=" flex justify-between items-center px-3"
                >
                  <AnimateWord
                    text={halfSpace(digitsEnToFa(product.title))}
                    textClassName=" inline-flex"
                    className=""
                    el="span"
                  />
                  <Box
                    component={"span"}
                    className=" flex flex-col whitespace-nowrap rounded-full bg-success-100 px-[1em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[1.2em] font-bold leading-none text-success-700"
                  >
                    <AnimateCharacter
                      text={digitsEnToFa(addCommas(product.price))}
                      el="span"
                      textClassName=" inline-flex float-left"
                      className=" text-lg flex flex-col"
                    />
                  </Box>
                </Box>

                <Box
                  component={"hr"}
                  className="my-1 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"
                />
                <Box component={"div"} className=" flex w-full">
                  <AnimateWord
                    text={halfSpace(digitsEnToFa(product.recipe)) || ""}
                    textClassName=" text-sm text-zinc-500"
                    className=" text-zinc-500"
                    el="p"
                    // once
                  />
                </Box>
                <Box
                  component={"hr"}
                  className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-90 dark:opacity-100"
                />
              </Box>
            ))}
        </Box>
      </Box>
      {/* <Box
        component={"ul"}
        className="max-h-20 w-full flex justify-start items-center overflow-x-auto bg-slate-400"
      >
        <NavigationFoodMenu activeCat={activeCat} />
      </Box> */}
    </Box>
  );
};

export default BodyFoodMenu;
