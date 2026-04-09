import { NextRequest, NextResponse } from "next/server";
import { AUTH_END } from "@/services/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenParam = searchParams.get("token");

  
  const res = await fetch(`${AUTH_END}/verify-email?token=${tokenParam}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}