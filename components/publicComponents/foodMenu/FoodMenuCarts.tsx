import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";

type Props = {
  catString: string;
  stringified: string;
};

function FoodMenuCarts({ catString, stringified }: Props) {
  const cats = JSON.parse(catString) as TCategorySchema[];
  return (
    <Grid
      container
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
        paddingX: 2,
      }}
    >
      {cats &&
        cats.map((cat: TCategorySchema, index: number) => (
          <Grid
            direction="row"
            alignItems="center"
            spacing={2}
            item
            key={index}
            justifyContent="center"
            margin={2}
          >
            <Link
              className=" flex w-full justify-center items-center"
              href={`/menuPage/${cat._id}?${stringified}`}
            >
              <Card sx={{ maxWidth: 145 }}>
                <CardActionArea sx={{ padding: "1rem" }}>
                  <CardMedia
                    component="img"
                    height="40"
                    image={`/uploads/${cat.colorIcon}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      {cat.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
}

export default FoodMenuCarts;
