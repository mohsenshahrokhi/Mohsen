"use client";
import Image from "next/image";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import Link from "next/link";
import { Box, IconButton, Slide, Zoom } from "@mui/material";
import { useParams } from "next/navigation";

type Props = {
  menuCategories: TCategorySchema[];
};

function NavItem({ menuCategories }: Props) {
  const params = useParams();
  const activeCat = params.cId;
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        marginLeft: 1,
        position: "relative",
      }}
      component={"div"}
    >
      {menuCategories?.length > 0 &&
        menuCategories.map((item: TCategorySchema) => (
          <Zoom
            style={{ transitionDelay: activeCat.length > 0 ? "200ms" : "0ms" }}
            key={item._id}
            in={activeCat.length > 0}
          >
            <Box
              sx={{
                display: "flex",
                marginRight: 3,
                width: "3rem",
                cursor: "pointer",
              }}
              component={"li"}
            >
              <Link
                href={`/menuPage/${item._id}?select=title,price,category,recipe&category=${item._id}&populate=category.name,category.images&stock>1`}
              >
                <Slide
                  mountOnEnter
                  unmountOnExit
                  direction="down"
                  in={activeCat !== item._id}
                  style={{
                    transitionDelay: activeCat !== item._id ? "50ms" : "0ms",
                  }}
                >
                  <IconButton>
                    <Image
                      priority
                      src={`/uploads/${item.icon}`}
                      height={40}
                      width={40}
                      alt={item.latinName}
                    />
                  </IconButton>
                </Slide>

                <Slide
                  mountOnEnter
                  unmountOnExit
                  direction="up"
                  in={activeCat === item._id}
                  style={{
                    transitionDelay: activeCat === item._id ? "200ms" : "0ms",
                  }}
                >
                  <IconButton
                    sx={{
                      width: 80,
                      height: 80,
                      display: "flex",
                      position: "absolute",
                      marginBottom: 6,
                      top: -40,
                      bgcolor: "background.default",
                    }}
                  >
                    <Image
                      priority
                      src={`/uploads/${item.colorIcon}`}
                      height={80}
                      width={80}
                      alt={item.latinName}
                    />
                  </IconButton>
                </Slide>
              </Link>
            </Box>
          </Zoom>
        ))}
    </Box>
  );
}

export default NavItem;
