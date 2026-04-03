"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../Datepicker.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  createBooking,
  getpractitionerList,
  getSlotManageSettings,
  getSlots,
  paymentStatusUpdate
} from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import WrapperBanner from "@/components/WraperBanner";
import DemoPaymentGateway from "@/components/DemoPaymentGateway";


type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

type DayConfig = {
  start: string;
  end: string;
  fee: string;
  enabled: boolean;
};

type PaymentResponse = {
  txnId: string;
  date: string;
  method: string;
  status: string;
  amount: string;

};
type FormDataType = {
  patient_id: string;
  practitioner_id: string;
  full_name: string;
  date: string;
  slot: string;
  fee: string;
};

type practitionerListType = {
  id: string;
  full_name: string;
  unique_id: string;
}


type DaysObject = Record<DayName, DayConfig>;

const dayMap: Record<DayName, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const StepProgress = ({ step }: { step: number }) => {
  const steps = [1, 2, 3];
  return (
    <div className="flex px-5 items-center justify-between w-full max-w-xl mx-auto mb-10">
      {steps.map((item, index) => {
        const isCompleted = step > item;
        const isActive = step === item;
        return (
          <div
            key={item}
            className={`flex items-center ${index !== steps.length - 1 ? "w-full" : ""}`}
          >
            <div
              className={`text-xs font-black flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all
                ${isCompleted ? "bg-primary border-primary text-white" : ""}
                ${isActive ? "border-primary text-primary" : ""}
                ${!isCompleted && !isActive ? "border-gray-300 text-gray-400" : ""}
              `}
            >
              {isCompleted ? "✓" : ""}
              {isActive && !isCompleted && (
                <div className="w-3 h-3 bg-primary rounded-full text-xs font-black"></div>
              )}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] transition-all
                  ${step > item ? "bg-primary" : "bg-gray-300"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

interface BookingCreateDatatype {
  id: number;
  success:boolean;
}

export default function Booking_a_appointment() {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [bookingCfrm, setBookingCfrm] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [landingData, setLandingData] = useState(false);
  const [londing, setLanding] = useState(true);
  const [offweekDays, setOffweekDays] = useState<number[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [paymentGateways, setPaymentGateways] = useState(false);
  const [bookingcreatedata, setbookingcreatedata] = useState<BookingCreateDatatype>();
  const [practitionerList, setpractitionersList] = useState<practitionerListType[]>();
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    patient_id: MMMUserData?.id || "",
    practitioner_id: "",
    full_name: MMMUserData?.user_name || "",
    date: new Date().toISOString().split("T")[0],
    slot: "",
    fee: "",

  });

  useEffect(() => {

    getpractitionerList(MMMUserData.id).then((res) => {
      if (res.success) {
        setpractitionersList(res.data)
      }
    }).catch((err) => {
      console.error(err);
    });

  }, [MMMUserData.id])


  const options =
    practitionerList?.map((item) => ({
      value: item.id,
      label: `${item.full_name} || PR${item.unique_id}`,
    })) || [];

  const [dayFees, setDayFees] = useState<Record<DayName, number>>({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });

  function setFeesFromAPI(days: DaysObject) {
    const updatedFees: Record<DayName, number> = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };
    (Object.keys(days) as DayName[]).forEach((day) => {
      updatedFees[day] = Number(days[day].fee);
    });
    setDayFees(updatedFees);
  };

  function getFeeByDate(dateStr: string): number {
    const date = new Date(dateStr);
    const dayIndex = date.getDay();
    const dayMap: DayName[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayMap[dayIndex];

    return dayFees[dayName] || 0;
  };

  const validateStep = (step: number, data: FormDataType) => {
    const errors: string[] = [];
    if (step === 1) {
      if (!data.practitioner_id) {
        errors.push("Please select a practitioner");
      }
    }
    if (step === 2) {
      if (!data.date && !selectedDate) {
        errors.push("Please select a date");
        return errors;
      }
      if (!data.slot && !selectedTime) {
        errors.push("Please select a time slot");
        return errors;
      }
    }
    return errors;
  };


  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function nextStep() {
    const errors = validateStep(step, formData);
    if (errors.length > 0) {
      errors.forEach((err) => toastTBS.error(err));
      return;
    }
    setStep((prev) => prev + 1);
    if (step === 1) {
      getData();


    }
    if (step === 2) {
      setFormData((prev) => ({
        ...prev,
        fee: getFeeByDate(selectedDate ? formatDateLocal(selectedDate) : "").toString(),
      }));
    }
  }



  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    const formatedDate = date ? formatDateLocal(date) : "";
    const selectedDateStr = selectedDate
      ? formatDateLocal(selectedDate)
      : "";
    if (formatedDate != selectedDateStr) {
      getSlotData(formatedDate);
    }
    setSelectedTime(null);
    setFormData((prev) => ({
      ...prev,
      date: date ? formatDateLocal(date) : "",
    }));
  };

  const handleTimeSelect = (slot: string) => {
    setSelectedTime(slot);

    setFormData((prev) => ({
      ...prev,
      slot,
    }));
  };

  const getOffWeekDays = (days: DaysObject): number[] => {
    return (Object.keys(days) as DayName[])
      .filter((day) => !days[day].enabled)
      .map((day) => dayMap[day]);
  };

  function getData() {
    getSlotManageSettings(formData.practitioner_id)
      .then((data) => {
        setLanding(false);
        if (data.success) {
          setBlockedDates(data.holidays)
          const offweekDays1 = getOffWeekDays(data.days);
          setOffweekDays(offweekDays1);
          setFeesFromAPI(data.days);
          if (!data.holidays.includes(selectedDate ? formatDateLocal(selectedDate) : "")) {
            getSlotData(selectedDate ? formatDateLocal(selectedDate) : "")
          }

        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getSlotData(date: string) {

    const data = JSON.stringify({ date, user_id: formData.practitioner_id });
    setSlotLoading(true);
    getSlots(data).then((data) => {
      if (data.success) {
        setTimeSlots(data.slots);
        setFormData((prev) => ({
          ...prev,
          fee: getFeeByDate(date).toString(),
        }));

        setSlotLoading(false);
      }

    }).catch((err) => {
      toastTBS.error("Error fetching slots:" + err.message);
      setSlotLoading(false);
    });

  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data to be submitted:", formData);

    if (landingData) return;
    setLandingData(true);
    try {
      const res = await createBooking(formData);
      if (res.success) {
        //  toastTBS.success("Booking created successfully");
        setPaymentGateways(true);
        setbookingcreatedata(res)
        //router.push("dashboard");
        setTimeout(() => {
          setLandingData(false);
        }, 1500);
      } else {
        toastTBS.error("Failed to create booking");
        setTimeout(() => {
          setLandingData(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      toastTBS.error("An error occurred while creating booking");
    }
  };

  function paymentstatus(data: PaymentResponse) {
    if (data.status === "success") {
      setBookingCfrm(true);
      setPaymentGateways(false)
      const payload = {
        booking_id: bookingcreatedata?.id ?? 0,
        status: "booked",
        reason: ""
      }
      paymentStatusUpdate(payload).then((res) => {
        console.log(res)
      })
    }
  }

  if (londing && step === 2) {
    return (
      <WrapperBanner>
        <div
          className=" bg-cover bg-center bg-no-repeat min-h-screen "
          style={{ backgroundImage: "url('/banner-bg.jpg')" }}
        >
          <div className="flex-1 flex justify-center items-center h-[70vh]">
            <LoadingSpin />

          </div>
        </div>
      </WrapperBanner>
    );
  }

  if (paymentGateways && step === 3) {
    return (
      <WrapperBanner>
        <div
          className=" bg-cover bg-center bg-no-repeat min-h-screen "
          style={{ backgroundImage: "url('/banner-bg.jpg')" }}
        >
          <div className="flex-1 flex justify-center items-center h-[70vh]">
            <DemoPaymentGateway data={formData} callback={paymentstatus} />
          </div>
        </div>
      </WrapperBanner>
    );
  }




  return (
    <>
      <WrapperBanner>
        <div
          className=" bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner-bg.jpg')" }}
        >
          <div className="flex-1 flex justify-center md:p-7.5 px-5 py-7.5">
            <div className="w-full bg-white rounded-[10px] shadow-xl h-fit ">
              <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-2.25 mb-2.5">
                Book a Appointment
              </h2>
              <div>
                <StepProgress step={step} />
              </div>
              <form onSubmit={handleSave}>
                <div className=" md:mb-11.25 mb-7.5 px-5">
                  {step === 1 && (
                    <>
                      <div className="w-full max-w-md mx-auto">
                        <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                          Select Practitioner
                        </h2>

                        <div className="w-full">
                          <Select
                            options={options}
                            value={
                              options?.find(opt => opt.value === formData.practitioner_id) || null
                            }
                            onChange={(selected) =>
                              setFormData({
                                ...formData,
                                practitioner_id: selected?.value || "",
                              })
                            }
                            placeholder="Select Practitioner"
                            isSearchable
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                borderColor: state.isFocused ? "#25716e" : "#e5e7eb", // focus color
                                boxShadow: state.isFocused ? "0 0 0 1px #25716e" : "none",
                                "&:hover": {
                                  borderColor: state.isFocused ? "#25716e" : "#d1d5db",
                                },
                              }),
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {step === 2 && (


                    <div className="mt-5">
                      <div className="flex flex-col lg:flex-row gap-8 md:p-6 p-0">
                        {/* Calendar Section */}
                        <div className="bg-white lg:shadow rounded-xl lg:p-4 p-0 w-full lg:w-1/2">
                          <h3 className="text-lg font-semibold mb-3 text-primary">
                            Select Date
                          </h3>

                          <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            weekStartsOn={1}
                            disabled={[blockedDates.map(date => new Date(date)),
                            { dayOfWeek: offweekDays }
                            ]}
                            className="rounded-md border md:p-5 p-2 w-full"
                          />
                        </div>


                        {/* Time Slots Section */}
                        <div className="bg-white lg:shadow lg:rounded-xl lg:p-4 w-full lg:w-1/2">
                          <h3 className="text-lg font-semibold mb-3 text-primary">
                            Select preferred time slot
                          </h3>
                          {slotLoading ? (
                            <div className="flex justify-center items-center h-32">
                              <LoadingSpin color="bg-primary" width={5} height={30} />
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-3 lg:bg-none  lg:p-0 p-3.75 lg:rounded-0 rounded-xl">
                              {timeSlots.map((slot, index) => (
                                <button
                                  type="button"
                                  key={index}
                                  onClick={() => handleTimeSelect(slot)}
                                  className={` border border-primary text-primary cursor-pointer duration-400 rounded-lg p-2 text-sm font-semibold ${selectedTime === slot
                                    ? "bg-primary text-white"
                                    : "bg-primary/8 hover:bg-primary hover:text-white"
                                    }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}




                  {step === 3 && (
                    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">


                      {bookingCfrm ? (
                        <>
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                              <span className="text-green-600 text-3xl font-bold">✓</span>
                            </div>
                          </div>


                          <h2 className="text-2xl font-bold text-primary mb-2 text-center">
                            Booking Confirmed!
                          </h2>

                          <p className="text-gray-500 text-sm mb-5 text-center">
                            Your appointment has been successfully booked.
                          </p>
                        </>
                      ) : (

                        <h3 className="text-xl font-bold text-primary mb-5">
                          Booking Summary
                        </h3>
                      )}


                      {/* Content */}
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Practitioner Name</span>
                          <span className="font-semibold text-gray-800">
                            {formData.practitioner_id ? "Dr. John Doe" : "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Date</span>
                          <span className="font-semibold text-gray-800">
                            {selectedDate ? selectedDate.toLocaleDateString() : "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Time</span>
                          <span className="font-semibold text-gray-800">
                            {selectedTime || "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Appointment Fee</span>
                          <span className="font-semibold text-gray-800">
                            {formData.fee ? `R ${formData.fee}` : "R 0"}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t my-4"></div>

                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">
                          Amount to Pay
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {formData.fee ? `R ${formData.fee}` : "R 0"}
                        </span>
                      </div>
                    </div>
                  )}
                  {!bookingCfrm && (
                    <div className="flex justify-center mt-10 gap-2">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                        >
                          Back
                        </button>
                      )}

                      {step < 3 && (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                        >
                          Next
                        </button>
                      )}

                      {step === 3 && (
                        <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                          {landingData ? (
                            <LoadingSpin width={2} height={11} />
                          ) : (
                            "Book Now"
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

      </WrapperBanner>
    </>
  );
}
