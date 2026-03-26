"use client";
import DoctorProfileComplete from "@/components/comman/DoctorProfileComplete";
import PatientsProfileComplete from "@/components/comman/PatientsProfileComplete";

import PractitionerProfileComplete from "@/components/comman/PractitionerProfileComplete";
import { useState } from "react";

export default function CompleteProfile() {
      const [MMMUserData] = useState(() => {
        if (typeof window === "undefined") return null;
        const data = localStorage.getItem("MMMDT");
        return data ? JSON.parse(data) : null;
      });
    
     
      if(MMMUserData.role === "practitioner"){
    return <PractitionerProfileComplete/>
      }
      else if(MMMUserData.role === "referrer"){
        return <DoctorProfileComplete/>
      }
      else if(MMMUserData.role === "patient"){
        return <PatientsProfileComplete/>
      }


  }
  