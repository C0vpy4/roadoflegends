import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { supabase } from "./app/utils/supabase";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/auth/:path*",
};
