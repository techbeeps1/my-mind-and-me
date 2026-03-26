/* eslint-disable @typescript-eslint/no-explicit-any */
//import axios from "axios";

export const BACKEND = "http://54.89.179.53:8000/v1/admin";
export const AUTH_END  = "http://54.89.179.53:8001/v1/auth";
export const REF_END = "http://54.89.179.53:8002/v1/referrer";
export const PATIENT_END = "http://54.89.179.53:8003/v1/patient";
export const PRACTITIONER_END = "http://54.89.179.53:8004/v1/practitioner";

export const adminApiPath = "/api/admin";
export const authApiPath = "/api/auth";
export const refApiPath = "/api/referrer";
export const paApiPath = "/api/patient";
export const prApiPath = "/api/practitioner";
// API paths for LOCAL



export const imagePath = "http://54.89.179.53:8000/image/"; 



// Practitioner profiles
export async function GetverificationDOcs(UserId:string) {
  const res = await fetch(`${prApiPath}/view-documents/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch practitioner Documents");
  return res.json();
}



// practitioner profile edit
export async function PractitionerProfileEdit( data:any ) {
  const res = await fetch(`${PRACTITIONER_END}/profile`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) { throw new Error("Failed to edit practitioner profile");}
  return await res.json();
}


// Practitioner profiles
export async function GetPractitionerProfile(UserId:string) {
  const res = await fetch(`${prApiPath}/profile/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch practitioner profile");
  return res.json();
}


// get referral-history
export async function GetReferralHistory(userid:string) {
  const res = await fetch(`${refApiPath}/allreferrals/${userid}`);
   if (!res.ok) throw new Error("Failed to fetch referral history");
  return res.json();
}

// add Referrer
export async function AddReferrerFun( data:any ) {
  const res = await fetch(`${REF_END}/create-referral`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) { throw new Error("Failed to add referrer");}
  return await res.json();
}


// get all practitioners
export async function GetAllPractitioner() {
  const res = await fetch(`${prApiPath}/all`);
   if (!res.ok) throw new Error("Failed to fetch practitioner profile");
  return res.json();
}

// get all patients
export async function GetAllPatient() {
  const res = await fetch(`${paApiPath}/all`);
   if (!res.ok) throw new Error("Failed to fetch patient profile");
  return res.json();
}
 
// referral profiles
export async function referralProfile(UserId:string) {
  const res = await fetch(`${refApiPath}/profile/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch referral profile");
  return res.json();
}


// referral profile edit
export async function referralProfileEdit( data:any ) {
  const res = await fetch(`${REF_END}/profile`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) { throw new Error("Failed to edit referral profile");}
  return await res.json();
}


//send reset link
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

