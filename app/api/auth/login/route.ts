import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Dummy admin credentials
  if (email === "admin@demo.com" && password === "Admin@123") {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}
