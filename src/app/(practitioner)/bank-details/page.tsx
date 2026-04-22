"use client";

import WrapperBanner from "@/components/WraperBanner";

import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { GetBankDetails, UpdateBankDetails } from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";

export default function PractitionerBankDetals() {
  const [isEdit, setisEdit] = useState(true);

  const [landingData, setLandingData] = useState(false);
  const [landing, setLanding] = useState(true);
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });




  type FormDataType = {
    user_id: string;
    bank_name: string;
    branch_number: string;
    account_number: string;
    beneficiary_name: string;

  };
  const [formData, setFormData] = useState<FormDataType>({
    user_id: MMMUserData?.id || "",
    bank_name: "",
    branch_number: "",
    account_number: "",
    beneficiary_name: "",

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };





  useEffect(() => {
    GetBankDetails(MMMUserData?.id).then((data) => {
      setLanding(false)
      setFormData(data.data);


    }).catch((err) => {
      console.error(err);
    });
  }, [MMMUserData?.id]);




 const validateForm = (data: FormDataType): string => {
  // Trim all values once
  const beneficiary = data.beneficiary_name.trim();
  const bank = data.bank_name.trim();
  const account = data.account_number.trim();
  const branch = data.branch_number.trim();

  // Regex
  const nameRegex = /^[A-Za-z\s]{2,50}$/; // only letters + spaces
  const bankRegex = /^.{2,50}$/; // any characters (2–50)
  const accountRegex = /^[A-Za-z0-9]{5,25}$/; // alphanumeric only
  const branchRegex = /^[A-Za-z0-9]{6,20}$/; // alphanumeric only

  // Beneficiary Name
  if (!beneficiary) return "Beneficiary name is required";
  if (!nameRegex.test(beneficiary)) {
    return "Beneficiary name must be 2–50 characters and contain only letters";
  }

  // Bank Name
  if (!bank) return "Bank name is required";
  if (!bankRegex.test(bank)) {
    return "Bank name must be between 2–50 characters";
  }

  // Account Number
  if (!account) return "Account number is required";
  if (!accountRegex.test(account)) {
    return "Account number must be 5–25 characters (alphanumeric only)";
  }

  // Branch Number
  if (!branch) return "Branch number is required";
  if (!branchRegex.test(branch)) {
    return "Branch number must be 6–20 characters (alphanumeric only)";
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

    const data = JSON.stringify({
      user_id: MMMUserData?.id || "",
      bank_data: formData
    });

    try {
      const res = await UpdateBankDetails(data)
      if (res.status) {

        toastTBS.success("Bank details updated successfully");
        setisEdit(true);
        setTimeout(() => {
          setLandingData(false);

        }, 1500);
      }
      else {
        toastTBS.error("Failed to update bank details");
        setTimeout(() => {
          setLandingData(false);
        }, 1500);
      }

    } catch (err) {
      console.error(err);
      toastTBS.error("An error occurred while updating bank details");
    }
  };

  if (landing) {
    return (
      <WrapperBanner>
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </WrapperBanner>
    );
  }
  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Bank Details
            </h2>
            <form onSubmit={handleSave}>
              <div className="w-245  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
                <div className="flex justify-between mb-7.5 items-center gap-4 text-white ">
                  <div className="flex items-center gap-2.5 relative z-0">

                  </div>

                  {isEdit ? (<button onClick={() => setisEdit(false)} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                    <GoDotFill className="md:h-3 md:w-3 h-2 w-2" /> Edit
                  </button>) : (
                    <div className="flex gap-2">

                      <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        {landingData ? (<LoadingSpin width={2} height={11} />) : "Save"}
                      </button>
                      <button onClick={() => setisEdit(true)} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        Cancel
                      </button>
                    </div>
                  )}

                </div>


                <div className="mt-5">

                  <div className="flex md:gap-5 gap-3.75 flex-col">
                    <div className="w-full">
                      <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                        Beneficiary Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="beneficiary_name"
                        readOnly={isEdit}
                        value={formData.beneficiary_name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Beneficiary Name"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        readOnly={isEdit}
                        value={formData.bank_name}
                        onChange={handleChange}
                        type="text"
                        name="bank_name"
                        placeholder="Bank Name"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        readOnly={isEdit}
                        value={formData.account_number}
                        onChange={handleChange}
                        type="text"
                        name="account_number"
                        placeholder="Account Number"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Branch Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        readOnly={isEdit}
                        value={formData.branch_number}
                        onChange={handleChange}
                        type="text"
                        name="branch_number"
                        placeholder="Branch Number"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}



