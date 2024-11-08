import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {

        const url = req.nextUrl.clone();
        url.pathname = "/"; // Asegúrate de que coincide con tu página de inicio de sesión
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"], // Protege las rutas de admin
};


