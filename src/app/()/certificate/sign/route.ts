import { NextRequest, NextResponse } from "next/server";
import { generateJWT } from "@/functions/auth";

export async function POST(req: NextRequest) {
  return NextResponse.json({ token: await generateJWT(await req.json()) });
}
