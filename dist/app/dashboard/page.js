"use client";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
export default function Dashboard({ searchParams }) {
    const router = useRouter();
    const stringified = queryString.stringify(searchParams);
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/phone?${stringified}`);
        },
    });
    return (<div>
      <div>
        داشبورد : {session === null || session === void 0 ? void 0 : session.user.role}
        <Box component={"p"}>
          <Button className=" font">داشبورد : {session === null || session === void 0 ? void 0 : session.user.role}</Button>
        </Box>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map