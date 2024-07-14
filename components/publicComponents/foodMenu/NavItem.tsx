import Image from "next/image";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import Link from "next/link";
import { Box, IconButton } from "@mui/material";

type Props = {
  menuCategories: TCategorySchema[];
  activeCat: string;
};

function NavItem({ menuCategories, activeCat }: Props) {
  return (
    <Box component={"div"} className=" flex">
      {menuCategories?.length > 0 &&
        menuCategories.map((item: TCategorySchema) => (
          <Box
            component={"li"}
            key={item._id}
            className={`flex min-w-fit mr-3`}
          >
            <Link
              href={`/menuPage/${item._id}?select=title,price,category,recipe&category=${item._id}&populate=category.name,category.images&stock>1`}
              className=" duration-700"
            >
              <Box component={"div"} className=" cursor-pointer">
                <Box
                  component={"div"}
                  className={`${
                    activeCat === item._id ? "opacity-0 hidden" : "opacity-1"
                  }`}
                >
                  <IconButton aria-label="delete">
                    <Image
                      priority
                      src={`/uploads/${item.icon}`}
                      height={40}
                      width={40}
                      alt={item.latinName}
                    />
                  </IconButton>
                </Box>

                <Box
                  component={"div"}
                  className={` ${
                    activeCat === item._id
                      ? "opacity-1 flex scale-150"
                      : "opacity-0 hidden "
                  }`}
                >
                  <IconButton aria-label="delete">
                    <Image
                      priority
                      src={`/uploads/${item.colorIcon}`}
                      height={40}
                      width={40}
                      alt={item.latinName}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Link>
          </Box>
        ))}
    </Box>
  );
}

export default NavItem;
