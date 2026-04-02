/* eslint-disable @typescript-eslint/no-explicit-any */
//import axios from "axios";

export const BACKEND = "http://54.89.179.53:8000/v1/admin";
export const AUTH_END  = "http://54.89.179.53:8001/v1/auth";
export const REF_END = "http://54.89.179.53:8002/v1/referrer";
export const PATIENT_END = "http://54.89.179.53:8003/v1/patient";
export const PRACTITIONER_END = "http://54.89.179.53:8004/v1/practitioner";
export const BOOKING_END = "http://54.89.179.53:8006/v1/booking";

export const adminApiPath = "/api/admin";
export const authApiPath = "/api/auth";
export const refApiPath = "/api/referrer";
export const paApiPath = "/api/patient";
export const prApiPath = "/api/practitioner";
export const bookingApiPath = "/api/booking";
// API paths for LOCAL



export const imagePath = "http://54.89.179.53:8000/image/"; 

// get celender booking by month
export async function getBookingbyMonth( UserId:string, date:string ) {
  const res = await fetch(`${bookingApiPath}/booking-count/${UserId}/${date}`);
   if (!res.ok) throw new Error("Failed to fetch calendar booking");
  return res.json();
}


// booking status change
export async function changeBookingStatus( data:any ) {
  const res = await fetch(`${bookingApiPath}/status`, {   
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) { throw new Error("Failed to change booking status");}
  return await res.json();
}


// booking history
export async function GetBookinglistbydate(UserId:string, date:string) {
  const res = await fetch(`${bookingApiPath}/history/${UserId}/${date}`);
   if (!res.ok) throw new Error("Failed to fetch booking history");
  return res.json();
}


// booking history
export async function GetBookingHistory(UserId:string) {
  const res = await fetch(`${bookingApiPath}/history/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch booking history");
  return res.json();
}


// get Slots manage settings
export async function getSlotManageSettings( UserId:string ) {
  const res = await fetch(`${bookingApiPath}/view-slots/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch slot manage settings");
  return res.json();
} 




// create booking
export async function createBooking( data:any ) {
  const res = await fetch(`${bookingApiPath}/create`, {   
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) { throw new Error("Failed to send reset link");}
  return await res.json();
}


// get slots
export async function getSlots( data:any ) {
  const res = await fetch(`${bookingApiPath}/slots`, {
    method: "POST",
    body: data,
    headers: {
       "Content-Type": "application/json",
    },  
  });
  if (!res.ok) { throw new Error("Failed to fetch slots");}
  return await res.json();
}


// practitioner Slot manage
export async function slotManageAPI( data:any ) {
  const res = await fetch(`${bookingApiPath}/manage-slots`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
       "Content-Type": "application/json",
    },  
  });
  if (!res.ok) { throw new Error("Failed to manage slots");}
  return await res.json();
}




// practitioner UpdateBankDetails
export async function addInsurance( data:any ) {
  const res = await fetch(`${paApiPath}/insurance`, {
    method: "POST",
    body: data,
    headers: {
       "Content-Type": "application/json",
    },  
  });
  if (!res.ok) { throw new Error("Failed to add insurance");}
  return await res.json();
}


// patient medical-history
export async function Getmedicalhistory(UserId:string) {
  const res = await fetch(`${paApiPath}/medical-history/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch patient medical history");
  return res.json();
}

// patient Insurance
export async function GetInsuranceData(UserId:string) {
  const res = await fetch(`${paApiPath}/insurance/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch patient insurance data");
  return res.json();
}


// patient profile edit
export async function patientProfileEdit( data:any ) {
  const res = await fetch(`${PATIENT_END}/profile`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) { throw new Error("Failed to edit patient profile");}
  return await res.json();
}
 


// patient profiles
export async function patientProfile(UserId:string) {
  const res = await fetch(`${paApiPath}/profile/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch patient profile");
  return res.json();
}


// practitioner update Bio
export async function UpdatepractitionerBio( data:any ) {
  const res = await fetch(`${prApiPath}/bio/update`, {
    method: "POST",
    body: data,
    headers: {
       "Content-Type": "application/json",
    },  
  });
  if (!res.ok) { throw new Error("Failed to edit practitioner profile");}
  return await res.json();
}


// Practitioner Bio
export async function GetpractitionerBio(UserId:string) {
  const res = await fetch(`${prApiPath}/bio/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch practitioner bio");
  return res.json();
}

 
// practitioner UpdateBankDetails
export async function UpdateBankDetails( data:any ) {
  const res = await fetch(`${prApiPath}/bank_details/update`, {
    method: "POST",
    body: data,
    headers: {
       "Content-Type": "application/json",
    },  
  });
  if (!res.ok) { throw new Error("Failed to edit practitioner profile");}
  return await res.json();
}

// Practitioner Bank Details
export async function GetBankDetails(UserId:string) {
  const res = await fetch(`${prApiPath}/bank-details/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch practitioner bank details");
  return res.json();
}

// Practitioner profiles
export async function GetverificationDOcs(UserId:string) {
  const res = await fetch(`${prApiPath}/view-documents/${UserId}`);
   if (!res.ok) throw new Error("Failed to fetch practitioner Documents");
  return res.json();
}



// practitioner profile edit
export async function PractitionerProfileEdit( data:any ) {
  const res = await fetch(`${prApiPath}/profile`, {
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

