import { NextResponse } from "next/server";
import { authApiPath } from "@/services/api";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${authApiPath}/auth/reset-password` ,{
    method: "POST",
    body: JSON.stringify(body),
    headers:{ "Content-Type": "application/json" }
  });

  const data = await res.json();
  const response = NextResponse.json(data);
  return response;
}
