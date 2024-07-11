import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt";

export default withAuth(
//     async function middleware(req) {
//     const token = await getToken({ req });
//     const isAuth = verifyJwt(token?.accessToken||'');
//     const isAuthPage =
//       req.nextUrl.pathname.startsWith("/login") ||
//       req.nextUrl.pathname.startsWith("/register");
//     const isApiPage = req.nextUrl.pathname.startsWith("/dashboard");

//     if (isAuthPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       }

//       return null;
//     }

//     if (isApiPage) {
//       if (isAuth) {
//         return NextResponse.next();
//       }
//     }

//     if (!isAuth) {
//       let from = req.nextUrl.pathname;
//       if (req.nextUrl.search) {
//         from += req.nextUrl.search;
//       }
//  if (isAuth) {
//          return NextResponse.redirect(
//         new URL(`/dashboard`, req.url)
//       );
//       }
//       return NextResponse.redirect(
//         new URL(`/phone`, req.url)
//       );
//     }
    //   },
// function middleware(req) {
//     console.log('middleware',verifyJwt(req.nextauth.token?.accessToken))
//   },
    {
        callbacks: {
            
            authorized: ({ token }) => {
                // console.log('token',verifyJwt(token?.accessToken));
                
            //   if(verifyJwt(token?.user?.accessToken)) return true
              if (token?.role === "11") return true
              return false
            },
        },
    }
)

export const config = { matcher: ["/dashboard/:path*"] }
