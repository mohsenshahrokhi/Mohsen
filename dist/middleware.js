import { withAuth } from "next-auth/middleware";
export default withAuth(function middleware(req) {
}, {
    callbacks: {
        authorized: ({ token }) => (token === null || token === void 0 ? void 0 : token.role) === "2",
    },
});
export const config = { matcher: ["/dashboard/:path*"] };
//# sourceMappingURL=middleware.js.map