// import { google } from "googleapis";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const date = searchParams.get("date");

//     if (!date) {
//       return new Response(JSON.stringify({ error: "Date is required" }), {
//         status: 400,
//       });
//     }

//     // ✅ Fix private key format
//     const privateKey = process.env.GOOGLE_PRIVATE_KEY
//   ?.replace(/\\n/g, "\n")
//   .replace(/"/g, "")
//   .trim();

//     if (!privateKey) {
//       throw new Error("Private key missing");
//     }

//     // ✅ Auth
//   const auth = new google.auth.JWT({
//   email: process.env.GOOGLE_CLIENT_EMAIL,
//   key: privateKey,
//   scopes: ["https://www.googleapis.com/auth/calendar"],
 
// });
//     console.log("EMAIL:", process.env.GOOGLE_CLIENT_EMAIL);
// console.log("KEY EXISTS:", !!process.env.GOOGLE_PRIVATE_KEY);
// console.log("KEY LENGTH:", process.env.GOOGLE_PRIVATE_KEY?.length);
// console.log("FORMATTED KEY:\n", privateKey);
//     await auth.authorize();

//     const calendar = google.calendar({ version: "v3", auth });

//     // ✅ Get busy slots
//     const busyRes = await calendar.freebusy.query({
//       requestBody: {
//         timeMin: `${date}T00:00:00Z`,
//         timeMax: `${date}T23:59:59Z`,
//         items: [{ id: process.env.CALENDAR_ID || "primary" }],
//       },
//     });

//     const busySlots =
//       busyRes.data.calendars?.[process.env.CALENDAR_ID || "primary"]?.busy || [];

//     // ✅ Generate slots (10 AM - 5 PM)
//     const allSlots: number[] = [];
//     for (let hour = 10; hour < 17; hour++) {
//       allSlots.push(hour);
//     }

//     // ✅ Filter available slots
//   const availableSlots = allSlots.filter((slot) => {
//   const slotStart = new Date(`${date}T${slot}:00:00`);
//   const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

//   return !busySlots.some((b: any) => {
//     const busyStart = new Date(b.start);
//     const busyEnd = new Date(b.end);

//     // overlap check
//     return slotStart < busyEnd && slotEnd > busyStart;
//   });
// });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         date,
//         slots: availableSlots,
//       }),
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("ERROR:", error);

//     return new Response(
//       JSON.stringify({
//         error: error.message || "Internal Server Error",
//       }),
//       { status: 500 }
//     );
//   }
// }





import { google } from "googleapis";
import { getOAuthClient } from "@/lib/google";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return new Response(JSON.stringify({ error: "Date is required" }), {
        status: 400,
      });
    }

    // 👉 DB se user tokens lao
    const user = {
      accessToken: process.env.ACCESS_TOKEN,
      refreshToken: process.env.REFRESH_TOKEN,
      expiryDate: parseInt(process.env.EXPTIME || "0"),
    };

    const oauth2Client = getOAuthClient();

    // ✅ Set user tokens
    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
      expiry_date: user.expiryDate,
    });

    // 🔥 Auto refresh + DB update
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

    // ✅ Get busy slots (USER calendar)
    const busyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: `${date}T00:00:00Z`,
        timeMax: `${date}T23:59:59Z`,
        items: [{ id: "primary" }], // ✅ user calendar
      },
    });

    const busySlots =
      busyRes.data.calendars?.["primary"]?.busy || [];

    // ✅ Generate slots (10–17)
    const allSlots: number[] = [];
    for (let hour = 10; hour < 17; hour++) {
      allSlots.push(hour);
    }

    // ✅ Overlap logic (correct)
    const availableSlots = allSlots.filter((slot) => {
      const slotStart = new Date(`${date}T${slot}:00:00+05:30`);
      const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

      return !busySlots.some((b: any) => {
        const busyStart = new Date(b.start);
        const busyEnd = new Date(b.end);

        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });

    return new Response(
      JSON.stringify({
        success: true,
        date,
        slots: availableSlots,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}