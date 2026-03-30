import { google } from "googleapis";
import { getOAuthClient } from "@/lib/google";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return new Response(JSON.stringify({ error: "Event ID required" }), {
        status: 400,
      });
    }

    // 👉 DB se user tokens lao (real case me)
    const user = {
      accessToken: process.env.ACCESS_TOKEN,
      refreshToken: process.env.REFRESH_TOKEN,
      expiryDate: parseInt(process.env.EXPTIME || "0"),
    };

    const oauth2Client = getOAuthClient();

    // ✅ tokens set karo
    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
      expiry_date: user.expiryDate,
    });

    // 🔥 auto refresh + DB update
    oauth2Client.on("tokens", (tokens) => {
      console.log("New tokens:", tokens);

      /**
       * 👉 DB update karo:
       * if (tokens.access_token) update accessToken
       * if (tokens.expiry_date) update expiryDate
       */
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    // 🗑️ DELETE EVENT
    await calendar.events.delete({
      calendarId: process.env.CALENDAR_ID || "primary",
      eventId: eventId,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Event deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}