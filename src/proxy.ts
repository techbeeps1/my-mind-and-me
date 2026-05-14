import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_END } from "@/services/api";
import { console } from "inspector";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = request.cookies.get("MMMAT")?.value;
  const tokenR = request.cookies.get("MMMRT")?.value;
  const userData = JSON.parse(request.cookies.get("MMMDT")?.value || "{}");

  if (
    url.pathname == "/login" ||
    url.pathname == "/sign-up" ||
    url.pathname == "/forgot-password"
  ) {
    if (userData?.id) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }

  if (url.pathname.startsWith("/refresh")) {
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
        const response = NextResponse.json({
          success: true,
          user:data.user,
        });

        response.cookies.set("MMMAT", data.access_token, {
          httpOnly: true,
          secure: true,
          path: "/",
        });

        response.cookies.set("MMMDT", JSON.stringify(data.user), {
          httpOnly: true,
          secure: true,
          path: "/",
        });

        return response;
      } else {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { success: false, message: "Server error" },
        { status: 500 },
      );
    }
  }

  if (
    userData?.is_completed == false &&
    !url.pathname.startsWith("/complete-profile")
  ) {
    return NextResponse.redirect(new URL("/complete-profile", request.url));
  }
   if(url.pathname.startsWith("/complete-profile")) {
    return NextResponse.next();
  } 
  
  if (
    userData?.is_verified == false &&
    userData?.role === "practitioner" &&
    !url.pathname.startsWith("/verification-pending")
  ) {
    return NextResponse.redirect(new URL("/verification-pending", request.url));
  } 
  
  else if (
    userData.is_verified !== false &&
    url.pathname.startsWith("/verification-pending")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
      console.log(data);
      if (data.success) {
        const response = NextResponse.next();
        response.cookies.set("MMMAT", data.access_token, {
          httpOnly: true,
          secure: true,
          path: "/",
        });
        response.cookies.set("MMMDT", JSON.stringify(data.user), {
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
      console.log(err);
    }
  }

  const role = userData?.role;
  const referrer = [
    "/change-password",
    "/dashboard",
    "/add-refer",
    "/referral-history",
    "/my-profile",
    "/complete-profile",
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
    "/complete-profile",
    "/referrals",
  ];

  if (
    role == "patient" &&
    !patients.some((route) => url.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  const practitioners = [
    "/change-password",
    "/dashboard",
    "/booking-history",
    "/bank-details",
    "/bio",
    "/patients-progress",
    "/payments",
    "/my-profile",
    "/schedule",
    "/verification-status",
    "/referral-history",
    "/complete-profile",
    "/verification-pending",
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
    "/refresh",
    "/login",
    "/sign-up",
    "/forgot-password",
    "/verification-pending",
    "/referrals"
  ],
};
