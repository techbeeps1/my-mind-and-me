"use client";

import MyDoctorProfile from "@/components/profile/MyDoctorProfile";
import MyPatientProfile from "@/components/profile/MyPatientProfile";
import MyPractitionerProfile from "@/components/profile/MyPractitionerProfile";

import {useProfile} from "@/services/ProfileContext"

export default function MyProfile() {
  const { MMMUserData } = useProfile();


 
return (
  <>
    {MMMUserData?.role === "practitioner" && <MyPractitionerProfile />}
    {MMMUserData?.role === "patient" && <MyPatientProfile />}
    {MMMUserData?.role === "referrer" && <MyDoctorProfile />}
  </>
);

  
}
