
//import axios from "axios";
export const AUTH_END  = "http://localhost:8001/v1/auth";
export const BACKEND = "https://api.autopartsxchange.co.za/8000/v1/admin";
export const adminApiPath = "/api/admin";
export const authApiPath = "/api/auth";
// API paths for LOCAL


export const imagePath = "https://api.autopartsxchange.co.za/8000/image/"; 

 
// user profiles
export async function getDashBoard() {
  const res = await fetch(`${adminApiPath}/dashboard/view-counts`  );
   if (!res.ok) throw new Error("Failed to fetch Dashboard data");
  return res.json();
}

export async function login(data:{email:string, password:string}) {
  const res = await fetch(`${authApiPath}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data}),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }
  return res.json();
}
