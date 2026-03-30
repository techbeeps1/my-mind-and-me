import { getOAuthClient } from "@/lib/google";

export async function GET() {
  const oauth2Client = getOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/userinfo.email", 
    "https://www.googleapis.com/auth/userinfo.profile"],
    prompt: "consent",
  });

  return Response.redirect(url);
}