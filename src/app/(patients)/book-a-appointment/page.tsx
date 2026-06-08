"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../Datepicker.css";
import {  useState } from "react";
import { MdEventRepeat } from "react-icons/md";
import {
  createBooking,
  getLastAppointmentPractitioner,
  getSlotManageSettings,
  getSlots,
  imagePath,
} from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import WrapperBanner from "@/components/WraperBanner";

import PractitionerFilter from "@/components/PractitionerFilter";
import OrderCreate from "@/components/payment/OrderCreate";
import { FaUserDoctor } from "react-icons/fa6";

import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";

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

type FormDataType = {
  patient_id: string;
  practitioner_id: string;
  last_booking_id?: string;
  full_name: string;
  date: string;
  slot: string;
  fee: string;
  practitioner_name: string;
  appointment_type: string;
};

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
  id: string;
  success: boolean;
}

type lastBookingPractitionerType = {
  
            booking_id: string,
            booking_date: string,
            slot: string,
            practitioner_name: string,
            practitioner_id: string,
            profile_image: string
        }
export default function Booking_a_appointment() {
  const [filteropen, setFilterOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [landingData, setLandingData] = useState(false);
  const [londing, setLanding] = useState(true);
  const [offweekDays, setOffweekDays] = useState<number[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [paymentGateways, setPaymentGateways] = useState(false);
  const [lastAppointmentPractitioner, setLastAppointmentPractitioner] = useState<lastBookingPractitionerType[]>([]);
  const [bookingcreatedata, setbookingcreatedata] =
    useState<BookingCreateDatatype>();



 
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
    practitioner_name: "",
    appointment_type: "",
  });

  const [dayFees, setDayFees] = useState<Record<DayName, number>>({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });

  function getpractitionersFromLastBooking(){
    setLanding(true);
getLastAppointmentPractitioner(MMMUserData?.id).then((data) => { 
  if (data.success) { 
setLanding(false);
    setLastAppointmentPractitioner(data.data);
  } else {  
   setLanding(false);
    toastTBS.error("Failed to fetch last appointment practitioner");
  }
    
  })
  }

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
  }

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
  }

  const validateStep = (step: number, data: FormDataType) => {
    const errors: string[] = [];
    if (step === 1) {
      if (!data.practitioner_id) {
        if(data.appointment_type === "follow-up"){
        errors.push("Please select a previous appointment to continue with the follow-up");
        }else{
errors.push("Please select a practitioner");
        }
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
        fee: getFeeByDate(
          selectedDate ? formatDateLocal(selectedDate) : "",
        ).toString(),
      }));
    }
  }




  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    const formatedDate = date ? formatDateLocal(date) : "";
    const selectedDateStr = selectedDate ? formatDateLocal(selectedDate) : "";
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
    setnotavailable("");
    setTimeSlots([]);
    getSlotManageSettings(formData.practitioner_id)
      .then((data) => {
        setLanding(false);
        if (data.success) {
          setBlockedDates(data.holidays);
          const offweekDays1 = getOffWeekDays(data.days);
          setOffweekDays(offweekDays1);
          setFeesFromAPI(data.days);

          if (
            !data.holidays.includes(
              selectedDate ? formatDateLocal(selectedDate) : "",
            )
          ) {
            getSlotData(selectedDate ? formatDateLocal(selectedDate) : "");
          }
        } else {
          setOffweekDays([1, 2, 3, 4, 5, 6, 0]);

          setnotavailable(
            "Practitioner has not set availability yet. Please check back later.",
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }


  
  const [notavailable, setnotavailable] = useState("");
  function getSlotData(date: string) {
    setnotavailable("");
    const data = JSON.stringify({ date, user_id: formData.practitioner_id });
    setSlotLoading(true);
    getSlots(data)
      .then((data) => {
        if (data.success) {
          setTimeSlots(data.slots);
          setFormData((prev) => ({
            ...prev,
            fee: getFeeByDate(date).toString(),
          }));
          if (data.slots.length === 0) {
            setnotavailable("No slots available for the selected date.");
            setTimeSlots([]);
          }
        } else {
          setnotavailable("No slots available for the selected date.");
          setTimeSlots([]);
        }
        setSlotLoading(false);
      })
      .catch((err) => {
        toastTBS.error("Error fetching slots:" + err.message);
        setSlotLoading(false);
      });
  }


  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (landingData) return;
    setLandingData(true);
    try {
      const res = await createBooking(formData);
      if (res.success) {
        setPaymentGateways(true);
        setbookingcreatedata(res);
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
          className="bg-cover bg-center bg-no-repeat min-h-screen "
          style={{ backgroundImage: "url('/banner-bg.jpg')" }}
        >
          <div className="flex-1 flex justify-center md:p-7.5 px-5 py-7.5">
            <div className="w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)] rounded-[10px] shadow-xl h-fit ">
              <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-2.25 mb-2.5">
                Payment Summary
              </h2>
              {bookingcreatedata?.success && (
                <OrderCreate
                  closeModal={() => setPaymentGateways(false)}
                  BookingCreateData={bookingcreatedata}
                  data={formData}
                />
              )}
            </div>
          </div>
        </div>
      </WrapperBanner>
    );
  }

  return (
    <>
      <WrapperBanner>
        <div
          className="bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner-bg.jpg')" }}
        >
          <div className="flex-1 flex justify-center md:p-7.5 px-5 py-7.5">
            <div className="w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)] rounded-[10px] shadow-xl h-fit ">
              <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-2.25 mb-2.5">
                Book a Appointment
              </h2>

              {!formData.appointment_type ? (
                <div className="max-w-4xl mx-auto min-h-[500px] p-5">
                  <div className="text-center mb-12">
                    <h2 className="w-full text-primary md:text-[20px] text-[16px] leading-9 mb-3 font-semibold">
                      Choose the appointment type to continue
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* First Consultation */}

                    <div
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          appointment_type: "first-consultation",
                        }))
                      }
                      className={`
        relative overflow-hidden
        rounded-[32px]
        border
        p-8
        text-left
        transition-all duration-300
        hover:-translate-y-1
        bg-[#25716e14]
        cursor-pointer
        
        ${
          formData.appointment_type === "first-consultation"
            ? "border-primary shadow-2xl ring-4 ring-primary/10"
            : "border-slate-200 hover:border-slate-300"
        }
      `}
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-primary flex items-center justify-center text-3xl">
                          <FaUserDoctor className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary">
                          First Consultation
                        </h3>
                      </div>

                      <p className="mt-3 text-slate-500">
                        Meet with a practitioner for an initial assessment and
                        treatment plan.
                      </p>

                      {formData.appointment_type === "first-consultation" && (
                        <div className="absolute top-6 right-6">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Follow Up */}

                    <div
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          appointment_type: "follow-up",
                        }))
                        getpractitionersFromLastBooking();
                      }
                      }
                      className={`
        relative overflow-hidden
        rounded-[32px]
        border
        p-8
        text-left
        transition-all duration-300
        hover:-translate-y-1
        bg-[#25716e14]
        cursor-pointer
        ${
          formData.appointment_type === "follow-up"
            ? "border-primary shadow-2xl ring-4 ring-primary/10"
            : "border-slate-200 hover:border-slate-300"
        }
      `}
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-primary flex items-center justify-center text-3xl">
                          <MdEventRepeat className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary">
                          Follow-up
                        </h3>
                      </div>

                      <p className="mt-3 text-slate-500">
                        Continue your care and review progress with your
                        practitioner.
                      </p>

                      {formData.appointment_type === "follow-up" && (
                        <div className="absolute top-6 right-6">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <StepProgress step={step} />
                  </div>
                  <form onSubmit={handleSave}>
                    <div className=" md:mb-11.25 mb-7.5 px-5">
                      {step === 1 &&
                        (formData.appointment_type === "first-consultation" ? (
                          <>
                            <PractitionerFilter
                              isOpen={filteropen}
                              onClose={() => setFilterOpen(false)}
                              afterSelect={(selected) =>
                                setFormData({
                                  ...formData,
                                  practitioner_id: selected?.id || "",
                                  practitioner_name: selected
                                    ? selected.full_name
                                    : "",
                                })
                              }
                            />

                            <div className="w-full max-w-md mx-auto">
                              <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                                Select Practitioner
                              </h2>
                              <div
                                className="w-full"
                                onClick={() => setFilterOpen(true)}
                              >
                                <div className="border border-gray-300 rounded-lg p-2 text-gray-500 cursor-pointer">
                                  {formData.practitioner_name
                                    ? formData.practitioner_name
                                    : "Click to select practitioner"}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <h2 className="w-full text-primary md:text-[18px] text-[14px] leading-9 mb-3 font-semibold text-center">
                              Select priviously consulted appointment to
                              continue with the follow-up
                            </h2>
                            {londing ? (
                              <div className="flex justify-center items-center h-32">
                                 <LoadingSpin color="bg-primary"  />
                              </div>
                            ) : (
                            <div className="space-y-3 w-full max-w-3xl mx-auto">
                              {lastAppointmentPractitioner.map((session) => (
                                <div
                                  onClick={() => {
                                    
                                    setFormData((prev) => ({
                                      ...prev,
                                      practitioner_id: session.practitioner_id,
                                      practitioner_name: session.practitioner_name,
                                    }));


                                  }}
                                  key={session.practitioner_id}
                                  className={`group relative overflow-hidden bg-gradient-to-r from-white to-slate-50 rounded-[10px] p-2 hover:-translate-y-1 hover:shadow-xl border border-2 cursor-pointer transition-all ${
                                    formData.practitioner_id === session.practitioner_id
                                      ? "border-primary shadow-2xl"
                                      : "border-slate-200 hover:border-slate-300"
                                  }`}
                                >
                                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                                    <div className="flex items-center gap-5">
                                      {session.profile_image ? (
                                        <Image
                                          className="h-13 w-13 object-cover rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500"
                                          src={
                                            imagePath +
                                            session.profile_image
                                          }
                                          width={52}
                                          height={52}
                                          alt="Patient Image"
                                        />
                                      ) : (
                                        <div
                                          className={`h-13 w-13 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500 `}
                                        >
                                          <FaUserAlt />
                                        </div>
                                      )}

                                      <div>
                                        <h3 className="text-md font-bold text-slate-900">
                                          {session.practitioner_name}
                                        </h3>

                                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            {session.booking_date}
                                          </span>

                                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            {session.slot}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              { lastAppointmentPractitioner.length == 0 && (<>
                                <div className="text-center text-gray-500 py-3">
                                  No previous appointments found.
                                </div>
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => {  
                                    setFormData((prev) => ({
                                      ...prev,
                                      appointment_type: "first-consultation",
                                    }));   

                                      setTimeout(() => {
                                        setStep(1); 
                                      }, 500);
                                  }}
                                    className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                                  > Book a first consultation instead
                                  </button>
                                </div>
                              </>
                              )}
                            </div>
                            )}
                          </>
                        ))}
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
                                disabled={[
                                  { before: new Date() },
                                  blockedDates.map((date) => new Date(date)),
                                  { dayOfWeek: offweekDays },
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
                                  <LoadingSpin
                                    color="bg-primary"
                                    width={5}
                                    height={30}
                                  />
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-3 lg:bg-none  lg:p-0 p-3.75 lg:rounded-0 rounded-xl">
                                  {timeSlots.map((slot, index) => (
                                    <button
                                      type="button"
                                      key={index}
                                      onClick={() => handleTimeSelect(slot)}
                                      className={` border border-primary text-primary cursor-pointer duration-400 rounded-lg p-2 text-sm font-semibold ${
                                        selectedTime === slot
                                          ? "bg-primary text-white"
                                          : "bg-primary/8 hover:bg-primary hover:text-white"
                                      }`}
                                    >
                                      {slot}
                                    </button>
                                  ))}
                                </div>
                              )}

                              {notavailable && (
                                <div
                                  className={` text-red-600  duration-400 rounded-lg  text-sm font-semibold `}
                                >
                                  {notavailable}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="w-full max-w-md mx-auto bg-primary/8 rounded-2xl  shadow-lg p-6">
                          <h3 className="text-xl font-bold text-primary mb-5">
                            Booking Summary
                          </h3>

                          {/* Content */}
                          <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Practitioner Name</span>
                              <span className="font-semibold text-gray-800">
                                {formData.practitioner_name
                                  ? formData.practitioner_name
                                  : "N/A"}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span>Date</span>
                              <span className="font-semibold text-gray-800">
                                {selectedDate
                                  ? selectedDate.toLocaleDateString()
                                  : "N/A"}
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

                        {step < 3  && (
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
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
