import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
    },
    {
        callbacks: {
            authorized: ({ token }) => token?.role === "2",
        },
    }
)

export const config = { matcher: ["/dashboard/:path*"] }
