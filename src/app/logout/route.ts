import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        (await cookies()).delete("access_token")
        console.log("Deleted")
        return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
    } catch (e) {
        return NextResponse.json("Logout unsuccessful " + e, {status: 401})
    }
}