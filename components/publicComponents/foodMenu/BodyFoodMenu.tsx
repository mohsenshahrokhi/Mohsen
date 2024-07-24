"use client";

import Banner from "./Banner";
import AnimateCharacter from "./AnimateCharacter";
import AnimateWord from "./AnimateWord";
import { TProductSchema } from "@/ZSchemas/ProductSchema";
import {
  addCommas,
  digitsEnToFa,
  halfSpace,
} from "@persian-tools/persian-tools";
import { Box, Grid } from "@mui/material";
import NavigationFoodMenu from "./NavigationFoodMenu";

const BodyFoodMenu = ({
  products,
}: {
  products: TProductSchema[];
  activeCat: string;
}) => {
  if (products?.length === 0) {
    return <h3>loading...</h3>;
  }

  return (
    <Box
      component={"div"}
      sx={{
        // position: "relative",
        width: "100%",
        // display: "block",
        // justifyContent: "space-between",
      }}
    >
      {products?.length > 0 && products[0]?.category?.images?.length > 0 && (
        <Banner
          banner={products[0]?.category?.images[0]}
          item={products[0]?.category?.latinName}
        />
      )}

      <Grid
        container
        // spacing={{ mobile: 1, tablet: 3 }}
        // columns={{ mobile: 1, tablet: 1, desktop: 1 }}
        sx={{ marginTop: "1rem", flexDirection: "row", margin: 0 }}
      >
        {products?.length > 0 &&
          products.map((product: TProductSchema) => (
            <Grid
              // direction="column"
              // alignItems="center"
              // // spacing={2}
              mobile={12}
              tablet={6}
              desktop={4}
              // justifyContent="center"
              key={product._id}
              // sx={{ marginTop: "1rem", flexDirection: "row", margin: 0 }}
            >
              <Box
                component={"div"}
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 1,
                  flexDirection: "row",
                }}
              >
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  // className=" flex w-full justify-between items-center"
                >
                  <AnimateWord
                    text={halfSpace(digitsEnToFa(product.title))}
                    textClassName=" inline-flex"
                    className=""
                    el="span"
                  />
                  <Box
                    component={"span"}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "0.35rem",
                      textAlign: "center",
                      // fontWeight: "bold",
                      bgcolor: "success.main",
                      color: "defaultText.main",
                      marginBottom: 1,
                      borderRadius: 2,
                    }}
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
                  className="my-1 w-full h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-90 dark:opacity-100"
                />
                <Box component={"span"} className=" flex w-full ">
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
                  className="my-5 h-px border-0 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-90 dark:opacity-100"
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default BodyFoodMenu;
