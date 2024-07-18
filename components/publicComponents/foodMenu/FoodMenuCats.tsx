import { TCategorySchema } from "@/ZSchemas/CategorySchema";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

type Props = {
  catString: string;
};

function FoodMenuCats({ catString }: Props) {
  const cats = JSON.parse(catString) as TCategorySchema[];
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        padding: 2,
      }}
      // className=" flex gap-2 p-2"
    >
      {cats &&
        cats.map((cat: TCategorySchema, index: number) => (
          <Link href={`/menuPage/${cat._id}`} key={index}>
            <Card sx={{ maxWidth: 145 }}>
              <CardActionArea sx={{ padding: "1rem" }}>
                <CardMedia
                  component="img"
                  height="40"
                  image={`/uploads/${cat.colorIcon}`}
                  alt="green iguana"
                />
                {/* <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cat.name}
                  </Typography> */}
                {/* <Typography variant="body2" color="text.secondary">
                    {cat.latinName}
                  </Typography> */}
                {/* </CardContent> */}
              </CardActionArea>
            </Card>
          </Link>
        ))}
    </Box>
  );
}

export default FoodMenuCats;
