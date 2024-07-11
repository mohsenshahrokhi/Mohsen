import { Box, Button } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { verifyJwt } from "@/lib/jwt";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Dashboard({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  // const accessToken = session?.user.accessToken;
  // const verify = accessToken && verifyJwt(accessToken)?._id;

  return (
    <div>
      <div>
        داشبورد : {session?.user.displayName}
        <Box component={"p"}>
          <Button className=" font">داشبورد : {session?.user.role}</Button>
        </Box>
      </div>
    </div>
  );
}
