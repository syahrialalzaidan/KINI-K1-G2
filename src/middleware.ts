import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware (request: NextRequestWithAuth) {
        const userRole = request.nextauth.token?.role;

        if (request.nextUrl.pathname.startsWith("/admin")
            && userRole != "ADMIN") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
        
        if (request.nextUrl.pathname.startsWith("/cashier")
            && userRole != "CASHIER") {
            if (userRole != "ADMIN") {
                return NextResponse.rewrite(
                    new URL("/denied", request.url)
                )
            }
        }
        
        if (request.nextUrl.pathname.startsWith("/warehouse")
            && userRole != "WAREHOUSE") {
                if (userRole != "ADMIN") {
                    return NextResponse.rewrite(
                        new URL("/denied", request.url)
                    )
                }
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (req.nextUrl.pathname.startsWith('/protected') && token === null) {
                    return false
                }
                return true
            }
        }
    }
)

export const config = { matcher: ["/admin/:path*", "/cashier/:path*", "/warehouse/:path*"] }