import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_END } from "@/services/api";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = request.cookies.get("MMMAT")?.value;
  const tokenR = request.cookies.get("MMMRT")?.value;
  const userData = JSON.parse(request.cookies.get("MMMDT")?.value || "{}");

  if (url.pathname == "/login" || url.pathname == "/sign-up") {
    return NextResponse.next();
  }

  if (!userData.role) {
    //return NextResponse.redirect(new URL("/login", request.url));
  }

  async function genToken() {
    try {
      const res = await fetch(`${AUTH_END}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenR }),
      });
      const data = await res.json();
      if (data.success) {
        const response = NextResponse.next();
        response.cookies.set("MMMAT", data.access_token, {
          httpOnly: true,
          secure: true,
          path: "/",
        });
        return response;
      } else {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    } catch (err) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  const role = userData?.role;
  const referrer = [
    "/change-password",
    "/dashboard",
    "/add-refer",
    "/referral-history",
    "/my-profile",
  ];

  if (
    role == "referrer" &&
    !referrer.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const patients = [
    "/resources-videos",
    "/my-purchases",
    "/reflection-questions",
    "/change-password",
    "/dashboard",
    "/booking-history",
    "/book-a-appointment",
    "/insurance",
    "/medical-history",
    "/my-profile",
    "/progress",
  ];

    if (
    role == "patients" &&
    !patients.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  const practitioners = [
    "/change-password",
    "/dashboard",
    "/booking-history",
    "/appointment-history",
    "/bank-details",
    "/bio",
    "/patients-progress",
    "/payments",
    "/my-profile",
    "/schedule",
    "/verification-status",
    "/referral-history",  
  ];

    if (
    role == "practitioner" &&
    !practitioners.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token) {
    try {
      const res = await fetch(`${AUTH_END}/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      if (res.status == 200) {
        return NextResponse.next();
      } else if (res.status == 401) {
        return genToken();
      } else {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    } catch (err) {
      url.pathname = "/login";

      return NextResponse.redirect(url);
      console.log(err);
    }
  } else if (!tokenR) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (!token && tokenR) {
    return genToken();
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/booking-history",
    "/change-password",
    "/complete-profile",
    "/add-refer",
    "/my-profile",
    "/book-a-appointment",
    "/insurance",
    "/medical-history",
    "/progress",
    "/appointment-history",
    "/bank-details",
    "/bio",
    "/patients-progress",
    "/payments",
    "/schedule",
    "/verification-status",
    "/referral-history",
    "/orders/:path*",
  ],
};
