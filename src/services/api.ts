
//import axios from "axios";
export const AUTH_END  = "http://54.89.179.53:8001/v1/auth";
export const BACKEND = "http://54.89.179.53:8000/v1/admin";

export const adminApiPath = "/api/admin";
export const authApiPath = "/api/auth";
// API paths for LOCAL


export const imagePath = "https://api.autopartsxchange.co.za/8000/image/"; 

 
// // user profiles
// export async function getDashBoard() {
//   const res = await fetch(`${adminApiPath}/dashboard/view-counts`  );
//    if (!res.ok) throw new Error("Failed to fetch Dashboard data");
//   return res.json();
// }


//login
export async function sendResetLink( email:string ) {
  const res = await fetch(`${authApiPath}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  if (!res.ok) { throw new Error("Failed to send reset link");}
  return await res.json();
}

