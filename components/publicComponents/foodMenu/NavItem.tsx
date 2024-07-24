"use client";
import Image from "next/image";
import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import Link from "next/link";
import { Box, IconButton, Slide, Zoom } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import queryString from "query-string";

type Props = {
  menuCategories: TCategorySchema[];
};

function NavItem({ menuCategories }: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const activeCat = params.cId;
  const theme = searchParams.get("theme") || "light";
  const stringifySearchParams = queryString.stringify({ theme: theme });
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "space-around",
        // overflowX: "visible",
        // zIndex: 1000,
      }}
      component={"ul"}
    >
      {menuCategories?.length > 0 &&
        menuCategories.map((item: TCategorySchema) => (
          <Box component={"li"} sx={{ position: "relative" }} key={item._id}>
            <Zoom
              style={{
                transitionDelay:
                  activeCat && activeCat.length > 0 ? "200ms" : "0ms",
              }}
              in={(activeCat && activeCat.length > 0) || false}
            >
              <Box
                sx={{
                  display: "flex",
                  // marginRight: 3,
                  width: "3rem",
                  cursor: "pointer",
                }}
                component={"div"}
              >
                <Link
                  href={`/menuPage/${item._id}?select=title,price,category,recipe&category=${item._id}&populate=category.name,category.images&stock>1&${stringifySearchParams}`}
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
                    in={(activeCat && activeCat === item._id) || false}
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
                        left: "-35%",
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
          </Box>
        ))}
    </Box>
  );
}

export default NavItem;
