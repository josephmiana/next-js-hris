import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "./helpers/jose-verify"

// This function can be marked 'async' if using 'await' inside
export async function middleware(request: NextRequest){

    const path = request.nextUrl.pathname;
    const isPublicPath = [
    '/login', '/forgotpassword', '/verification', '/verifyemail'
    ].includes(path);
    const employeeOnlyPaths = ['/dashboard',
    '/time',
    '/payslip',
    '/201files',
    '/coe',
    '/aboutme',
    '/coefile',
].includes(path)
    const adminOnlyPaths = ['/admin',
    '/addemployee',
    '/searchemployee',
    '/approveemployee',
    '/process',
    '/report',].includes(path);

    const token = request.cookies.get('token')?.value || '';
    let isAdmin = false;
    if(token){
        const payload = await verify(token, process.env.TOKEN_SECRET!);
        isAdmin = payload.isAdmin;
    }
    console.log(`ISADMIN ${isAdmin}`)
    console.log(`Current path: ${path}`);
    console.log(`Token value: ${token}`);

    // If they're on a public path and have a valid token:
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/time', request.nextUrl));
    }

    // If they're trying to access non-public pages without a token:
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If they're trying to access admin-only paths and is not admin:
    if (adminOnlyPaths && token && !isAdmin) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }  

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/verifyemail',
        '/dashboard',
        '/time',
        '/payslip',
        '/201files',
        '/coe',
        '/aboutme',
        '/coefile',
        '/admin',
        '/addemployee',
        '/searchemployee',
        '/approveemployee',
        '/process',
        '/report',
        '/verification'
    ]
}
