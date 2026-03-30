import { google } from "googleapis";
import { getOAuthClient } from "@/lib/google";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import { BOOKING_END } from "@/services/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return new Response("No code found", { status: 400 });
    }

    const oauth2Client = getOAuthClient();

    const tokens = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens.tokens);

    // 👇 GET USER INFO
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();
    const email = userInfo.data.email;
    const token = req.cookies.get("MMMAT")?.value;
    const MMMDT = req.cookies.get("MMMDT")?.value;
    const userID = JSON.parse(MMMDT || "{}").id;

    const headers = new Headers(req.headers);
    headers.delete("host");
    headers.delete("content-length");
    headers.set("content-type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);

    const payload = {
      user_id: userID,
      access_token: tokens.tokens.access_token,
      refresh_token: tokens.tokens.refresh_token,
      expiry_time: ""+tokens.tokens.expiry_date+"",
      email: email,
    };

   const response = await fetch(BOOKING_END + "/google/auth", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
      const result = await response.json();
      if(result.success) {
        return NextResponse.redirect(new URL('/schedule', req.url));
      
      }else {
        return new Response("Failed to connect Google Calendar", { status: 500 });
      }
  
  
  } catch (err) {
    console.error(err);
    return new Response("Error connecting Google", { status: 500 });
  }
}