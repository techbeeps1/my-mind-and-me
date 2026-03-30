// export const runtime = "nodejs";

// import { google } from "googleapis";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { date, hour, email, name } = body;

//     if (!date || hour === undefined) {
//       return new Response(JSON.stringify({ error: "Missing fields" }), {
//         status: 400,
//       });
//     }

//     // ✅ Fix private key
//     const privateKey = process.env.GOOGLE_PRIVATE_KEY
//       ?.replace(/\\n/g, "\n")
//       .trim();

//     // ✅ Auth (NO subject)
//     const auth = new google.auth.JWT({
//       email: process.env.GOOGLE_CLIENT_EMAIL,
//       key: privateKey,
//       scopes: ["https://www.googleapis.com/auth/calendar"],
//     });

//     await auth.authorize();

//     const calendar = google.calendar({ version: "v3", auth });

//     // ⏰ Start & End time
//     const startDateTime = new Date(`${date}T${hour}:00:00`);
//     const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour

//     // 📅 Event create
//     const event = await calendar.events.insert({
//       calendarId: process.env.CALENDAR_ID || "primary",
//       requestBody: {
//   summary: `Meeting with ${name}`,
//   description: "Booked via website",
//   email: email,

//   start: {
//     dateTime: startDateTime.toISOString(),
//   },
//   end: {
//     dateTime: endDateTime.toISOString(),
//   },
// },
//       conferenceDataVersion: 1,
//     });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         eventId: event.data.id,
//         meetLink: event.data.hangoutLink,
//         link: event.data.htmlLink
//       }),
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("BOOK ERROR:", error);

//     return new Response(
//       JSON.stringify({
//         error: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }



import { google } from "googleapis";
import { getOAuthClient } from "@/lib/google";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, hour, email } = body;

    // 👉 FETCH USER TOKENS FROM DB
    const user = {
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
      expiryDate: parseInt(process.env.EXPTIME || "0"),
    };

    const oauth2Client = getOAuthClient();


     oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
      expiry_date: user.expiryDate,
    });

        oauth2Client.on("tokens", (tokens) => {
        console.log("New tokens:", tokens);

      /**
       * 👉 DB update karo
       * if (tokens.access_token) update accessToken
       * if (tokens.expiry_date) update expiryDate
       */
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const start = new Date(`${date}T${hour}:00:00+05:30`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: "Meeting",
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },

        attendees: email ? [{ email }] : [],

        conferenceData: {
          createRequest: {
            requestId: new Date().getTime().toString(),
          },
        },
      },
      conferenceDataVersion: 1,
    });

    return new Response(
      JSON.stringify({
        success: true,
        eventId: event.data.id,
        meetLink: event.data.hangoutLink,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("BOOK ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}