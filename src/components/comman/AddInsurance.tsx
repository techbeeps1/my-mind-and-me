"use client";


import {  useState } from "react";
import { addInsurance } from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";

export default function AddInsurance() {

  const [landingData, setLandingData] = useState(false);

  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });




  type FormDataType = {
    user_id: string;
    insurance_name: string;
    policy_number: string;
    coverage_details: string;
    notes: string;
    start_date: string;
    end_date: string;

  };
  const [formData, setFormData] = useState<FormDataType>({
    user_id: MMMUserData?.id || "",
    insurance_name: "",
    policy_number: "",
    coverage_details: "",
    notes: "",
    start_date: "",
    end_date: ""

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };








const validateForm = (data: FormDataType): string => {
  // Insurance Name
  if (!data.insurance_name.trim()) {
    return "Insurance name is required";
  }
  if (data.insurance_name.trim().length < 3 || data.insurance_name.trim().length > 50) {
    return "Insurance name must be between 3 to 50 characters";
  }

  // Policy Number
  if (!data.policy_number.trim()) {
    return "Policy number is required";
  }
  if (!/^[a-zA-Z0-9]+$/.test(data.policy_number)) {
    return "Policy number must be alphanumeric (no special characters)";
  }
  if (data.policy_number.length < 6 || data.policy_number.length > 20) {
    return "Policy number must be between 6 to 20 characters";
  }

  // Coverage Details
  if (!data.coverage_details.trim()) {
    return "Coverage details are required";
  }
  if (
    data.coverage_details.trim().length < 10 ||
    data.coverage_details.trim().length > 250
  ) {
    return "Coverage details must be between 10 to 250 characters";
  }

 if(data.notes.trim() && (data.notes.trim().length < 5 || data.notes.trim().length > 200)){
        return "Notes must be between 5 to 200 characters if provided";
  } 
  // Dates
  if (!data.start_date.trim()) {
    return "Start date is required";
  }
  if (!data.end_date.trim()) {
    return "End date is required";
  }
  if (new Date(data.start_date) > new Date(data.end_date)) {
    return "Start date cannot be later than end date";
  }

 

  return "";
};

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (validationErrors) {
      toastTBS.error(validationErrors)
      return;
    }


    if (landingData) return;
    setLandingData(true);

    const data = JSON.stringify( formData);

    try {
      const res = await addInsurance(data)
      if (res.status) {

        toastTBS.success("Insurance added successfully");

      setFormData({
        user_id: MMMUserData?.id || "",
        insurance_name: "", 
        policy_number: "",
        coverage_details: "",
        notes: "",
        start_date: "",
        end_date: ""
      });
  
        setTimeout(() => {
          setLandingData(false);

        }, 1500);
      }
      else {
        toastTBS.error("Failed to add insurance");
        setTimeout(() => {
          setLandingData(false);
        }, 1500);
      }

    } catch (err) {
      console.error(err);
      toastTBS.error("An error occurred while adding insurance");
    }
  };


  return (
    <>

        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Add Insurance
            </h2>
            <form onSubmit={handleSave}>
              <div className="w-245  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
                <div className="flex justify-between mb-7.5 items-center gap-4 text-white ">
                  <div className="flex items-center gap-2.5 relative z-0">

                  </div>

                
                    <div className="flex gap-2">

                      <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        {landingData ? (<LoadingSpin width={2} height={11} />) : "Save"}
                      </button>
                  
                    </div>
                

                </div>


                <div className="mt-5">

                  <div className="flex md:gap-5 gap-3.75 md:flex-row justify-evenly flex-wrap ">
                    <div className="w-100">
                      <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                        Insurance name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="insurance_name"
                    
                        value={formData.insurance_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Insurance Name"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                      />
                    </div>
                    <div className="w-100">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Policy Number <span className="text-red-500">*</span>
                      </label>
                      <input
                 
                        value={formData.policy_number}
                        onChange={handleChange}
                        type="text"
                        name="policy_number"
                        placeholder="Policy Number"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                    <div className="w-100">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Coverage Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                      
                        value={formData.coverage_details }
                        onChange={handleChange}
                        
                        name="coverage_details"
                        placeholder="Coverage Details"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                    <div className="w-100">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Notes
                      </label>
                      <textarea                     
                        value={formData.notes}
                        onChange={handleChange}                        
                        name="notes"
                        placeholder="Notes"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>

                    <div className="w-100">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        
                        value={formData.start_date}
                        onChange={handleChange}
                        type="date"
                        name="start_date"
                        placeholder="Start Date"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                    <div className="w-100">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        
                        value={formData.end_date}
                        onChange={handleChange}
                        type="date"
                        name="end_date"
                        placeholder="End Date"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>

    </>
  );
}



