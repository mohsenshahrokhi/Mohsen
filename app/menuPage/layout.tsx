import NavigationFoodMenu from "@/components/publicComponents/foodMenu/NavigationFoodMenu";
import { Box, Container } from "@mui/material";

export const metadata = {
  title: "Food Menu",
  description: "Generated by Mohsen Shahrokhi",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "100%",
        marginRight: 5,
        marginLeft: 5,
      }}
      component={"div"}
    >
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          paddingRight: 0,
          paddingLeft: 0,
          height: "100%",
          width: "100%",
          borderLeft: 1,
          borderRight: 1,
          borderTop: 2,
          borderColor: "background.menuNavBg",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            overflowY: "auto",
          }}
          component={"div"}
        >
          {children}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            // overflowX: "auto",
            
            bgcolor: "background.menuNavBg",
            height: "3rem",
          }}
          component={"ul"}
        >
          <NavigationFoodMenu />
        </Box>
      </Box>
    </Container>
  );
}
