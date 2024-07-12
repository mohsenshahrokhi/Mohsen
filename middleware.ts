import { withAuth } from "next-auth/middleware";

export default withAuth(
    {
        callbacks: {
            authorized: ({ token }) => {
              if (token?.role === "11") return true
              return false
            },
        },
    }
)

export const config = { matcher: ["/dashboard/:path*",'/users/:path*','/siteSettings/:path*','/product/:path*','/gallery/:path*'] }
