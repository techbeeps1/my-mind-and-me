import { NextResponse } from "next/server";
import { AUTH_END } from "@/services/api";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${AUTH_END}/login` ,{
    method: "POST",
    body: JSON.stringify(body),
    headers:{ "Content-Type": "application/json" }
  });

  const data = await res.json();

  if(data.detail){
    const response = NextResponse.json(data,{ status: 401 });
      return response;
  }
  const response = NextResponse.json(data.user);
  if(data.user.role !== "admin"){
  response.cookies.set("MMMAT", data.access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  response.cookies.set("MMMRT", data.refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  response.cookies.set("MMMDT",JSON.stringify( data.user), {
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

  return response;
}
