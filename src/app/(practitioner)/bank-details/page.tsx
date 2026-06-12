"use client";

import WrapperBanner from "@/components/WraperBanner";

import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { deleteBankAccount, GetBankDetails, UpdateBankDetails } from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import DeleteModal from "@/components/comman/DeleteModal";

import { useProfile } from "@/services/ProfileContext";

export default function PractitionerBankDetals() {
     const { MMMUserData } = useProfile();
  const [isEdit, setisEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [landingData, setLandingData] = useState(false);
  const [landing, setLanding] = useState(true);

  type FormDataType = {
    user_id: string;
    bank_name: string;
    branch_number: string;
    account_number: string;
    first_name: string;
    last_name: string;
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    id_number: string;
  };
  const [formData, setFormData] = useState<FormDataType>({
    user_id: MMMUserData?.id || "",
    bank_name: "",
    branch_number: "",
    account_number: "",
    first_name: "",
    last_name: "",
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    id_number: "",
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  useEffect(() => {
    if (!MMMUserData?.id) return;
    GetBankDetails(MMMUserData?.id)
      .then((data) => {
        setLanding(false);
        if (data.status && data.data) {
        setFormData(data.data);
   
         if(data.data.stripe_account_id) {
          setisEdit(true);
         }
        }  
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData?.id]);

  const validateForm = (data: FormDataType): string => {
    // Trim all values once
    const first_name = data.first_name.trim();
    const last_name = data.last_name.trim();
    const bank = data.bank_name.trim();
    const account = data.account_number.trim();
    const branch = data.branch_number.trim();

    // Regex
    const nameRegex = /^[A-Za-z\s]{2,50}$/; // only letters + spaces
    const bankRegex = /^.{2,50}$/; // any characters (2–50)
    const accountRegex = /^[A-Za-z0-9]{5,25}$/; // alphanumeric only
    const branchRegex = /^[A-Za-z0-9]{6,20}$/; // alphanumeric only

    // First Name
    if (!first_name) return "First name is required";
    if (!nameRegex.test(first_name)) {
      return "First name must be 2–50 characters and contain only letters";
    }

    // Last Name
    if (!last_name) return "Last name is required";
    if (!nameRegex.test(last_name)) {
      return "Last name must be 2–50 characters and contain only letters";
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
function DeleteAccount() {
  if (!MMMUserData?.id) return;
  deleteBankAccount(MMMUserData?.id).then((res) => {

    if (res.status) {
      setShowDeleteModal(false);
      toastTBS.success("Bank details deleted successfully");
      setFormData({
        user_id: MMMUserData?.id || "",
        bank_name: "",
        branch_number: "",
        account_number: "",
        first_name: "",
        last_name: "",
        line1: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        id_number: "",
      });
      setisEdit(false);
    }else{
      toastTBS.error("Failed to delete bank details");
    }
  }).catch((err) => {
    console.error(err);
    toastTBS.error("Failed to delete bank details");
  })
}

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (validationErrors) {
      toastTBS.error(validationErrors);
      return;
    }

    if (landingData) return;
    setLandingData(true);

    const data = JSON.stringify({
      user_id: MMMUserData?.id || "",
      bank_data: formData,
    });

    try {
      const res = await UpdateBankDetails(data);
      if (res.status) {
        toastTBS.success("Bank details updated successfully");
        setisEdit(true);
        setTimeout(() => {
          setLandingData(false);
        }, 1500);
      } else {
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
                  <div className="flex items-center gap-2.5 relative z-0"></div>

                  {isEdit ? (
                    <button
                    type="button"
                      onClick={() => {setShowDeleteModal(true) }}
                      className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,#fc4a4a_0%,#ff6b6b_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition hover:bg-[linear-gradient(90deg,#ff6b6b_0%,#fc4a4a_100%)]"
                    >
                      <GoDotFill className="md:h-3 md:w-3 h-2 w-2" /> Delete 
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        {landingData ? (
                          <LoadingSpin width={2} height={11} />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex md:gap-5 gap-3.75 flex-col">
                    <div className="flex md:gap-5 gap-3.75 flex-col md:flex-row">
                      <div className="w-full">
                        <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                          Beneficiary First Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="first_name"
                          readOnly={isEdit}
                          value={formData.first_name}
                          onChange={handleChange}
                          type="text"
                          placeholder="Beneficiary First Name"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                          Beneficiary Last Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="last_name"
                          readOnly={isEdit}
                          value={formData.last_name}
                          onChange={handleChange}
                          type="text"
                          placeholder="Beneficiary Last Name"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                        />
                      </div>
                    </div>

                    <div className="flex md:gap-5 gap-3.75 flex-col md:flex-row">
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

                       <div className="flex md:gap-5 gap-3.75 flex-col md:flex-row">
                      <div className="w-full">
                        <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                          Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                          readOnly={isEdit}
                          value={formData.line1}
                          onChange={handleChange}
                          type="text"
                          name="line1"
                          placeholder="Address Line 1"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          readOnly={isEdit}
                          value={formData.city}
                          onChange={handleChange}
                          type="text"
                          name="city"
                          placeholder="City"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          readOnly={isEdit}
                          value={formData.state}
                          onChange={handleChange}
                          type="text"
                          name="state"
                          placeholder="State"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        />
                      </div>
                    </div>


                       <div className="flex md:gap-5 gap-3.75 flex-col md:flex-row">
                      <div className="w-full">
                        <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                          Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          readOnly={isEdit}
                          value={formData.postal_code}
                          onChange={handleChange}
                          type="text"
                          name="postal_code"
                          placeholder="Postal Code"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          readOnly={isEdit}
                          value={formData.country}
                          onChange={handleChange}
                          type="text"
                          name="country"
                          placeholder="Country"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                          National ID Number  <span className="text-red-500">*</span>
                        </label>
                        <input
                          readOnly={isEdit}
                          value={formData.id_number}
                          onChange={handleChange}
                          type="text"
                          name="id_number"
                          placeholder="National ID Number"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          type="delete"
          callback={(confirm) => {
            if (confirm) {
              DeleteAccount();
            }
          }}
        />
      </WrapperBanner>
    </>
  );
}
