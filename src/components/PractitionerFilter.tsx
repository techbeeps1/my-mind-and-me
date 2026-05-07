"use client";

import { useEffect, useState } from "react";

import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { useProfile } from "@/services/ProfileContext";
import { FaSearch, FaUserAlt, FaGlobe, FaBrain, FaMagic } from "react-icons/fa";
import Pagination from "./comman/Pagination";
import { GetPractitionerFilter, imagePath } from "@/services/api";
import Image from "next/image";

type Practitioner = {
  id: string;
  full_name: string;
  gender: string;
  qualifications: string;
  languages: string[];
  special_interests: string[];
  modalities: string[];
  profile_image?: string;
};

type OptionType = {
  value: string;
  label: string;
};

type SessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  afterSelect: (selected: { id: string; full_name: string } | null) => void;
};
export default function PractitionerFilter({
  isOpen,
  onClose,
  afterSelect,
}: SessionModalProps) {
  const { MMMUserData } = useProfile();
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner | null>(null);

  const [search, setSearch] = useState<string>("");

  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [genderFilter, setGenderFilter] = useState<OptionType | null>(null);

  const [languageFilter, setLanguageFilter] = useState<OptionType[]>([]);

  const [interestFilter, setInterestFilter] = useState<OptionType[]>([]);

  const [modalitiesFilter, setModalitiesFilter] = useState<OptionType[]>([]);

  const genderOptions: OptionType[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const languageOptions: OptionType[] = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Dutch", label: "Dutch" },
    { value: "German", label: "German" },
  ];

  const interestOptions: OptionType[] = [
    { value: "Anxiety", label: "Anxiety" },
    { value: "Depression", label: "Depression" },
    { value: "Trauma", label: "Trauma" },
  ];

  const modalitiesOptions: OptionType[] = [
    { value: "CBT", label: "CBT" },
    { value: "DBT", label: "DBT" },
    {
      value: "Psychodynamic",
      label: "Psychodynamic",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    console.log(practitioners);
  }, [practitioners]);

  useEffect(() => {
    if (selectedPractitioner) {
      afterSelect({
        id: selectedPractitioner.id,
        full_name: selectedPractitioner.full_name,
      });
      onClose();
    }
  }, [selectedPractitioner]);

  useEffect(() => {
    const playload = {
      user_id: MMMUserData?.id || "",
      name: debouncedSearch,
      special_interest: interestFilter.map((opt) => opt.value),
      modality: modalitiesFilter.map((opt) => opt.value),
      language: languageFilter.map((opt) => opt.value),
      gender: genderFilter?.value || "",
      page: page,
      limit: 10,
    };

    GetPractitionerFilter(playload)
      .then((res) => {
        if (res.success) {
          setPractitioners(res.data);
          setTotalPages(res.total_pages);
        } else {
          setPractitioners([]);
          setTotalPages(1);
        }
      })
      .catch((err) => {
        console.log("error fetching practitioners ", err);
      });

    console.log("fetching data for page ", playload);
  }, [
    page,
    debouncedSearch,
    genderFilter,
    languageFilter,
    interestFilter,
    modalitiesFilter,
    MMMUserData
  ]);

  const clearFilters = (): void => {
    setSearch("");
    setGenderFilter(null);
    setLanguageFilter([]);
    setInterestFilter([]);
    setModalitiesFilter([]);
  };

  const customSelectStyle: StylesConfig<OptionType, boolean> = {
    control: (base, state) => ({
      ...base,
      fontSize: "14px",
      minHeight: "45px",
      borderRadius: "10px",
      borderColor: state.isFocused ? "#14b8a6" : "#e5e7eb",
      boxShadow: "none",

      "&:hover": {
        borderColor: "#25716eab",
      },
    }),
    option(base, props) {
      return {
        ...base,
        fontSize: "14px",
        backgroundColor: props.isFocused ? "#14b8a6" : "transparent",
        color: props.isFocused ? "#fff" : "#000",
        cursor: "pointer",
      };
    },

    multiValue: (base) => ({
      ...base,
      background: "linear-gradient(90deg,#14b8a6,#0891b2)",
      borderRadius: "999px",
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "#fff",
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: "#fff",

      ":hover": {
        backgroundColor: "transparent",
        color: "#fff",
      },
    }),
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative my-12.5 overflow-y-auto overflow-x-hidden custom-scroll">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
        >
          ✕
        </button>

        <div className="pb-2 w-[80vw] bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
          <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-5 mb-1.5">
            Practitioners List
          </h2>
          <div className="min-h-screen">
            {/* MAIN */}
            <div className="max-w-7xl mx-auto px-5 py-5">
              {/* FILTERS */}
              <div className="bg-white rounded-[10px] shadow-sm px-5 py-5 mb-5 border border-gray-100 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 ">
                  {/* SEARCH */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Search Practitioner
                    </label>

                    <div className="relative">
                      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

                      <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-[45px] rounded-[10px] border border-gray-200 pl-12 pr-4 outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* GENDER */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Gender
                    </label>

                    <Select<OptionType, false>
                      options={genderOptions}
                      value={genderFilter}
                      onChange={(selected: SingleValue<OptionType>) =>
                        setGenderFilter(selected)
                      }
                     styles={customSelectStyle}
                      placeholder="Select Gender"
                      isClearable
                    />
                  </div>

                  {/* CLEAR */}

                  {/* LANGUAGES */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Languages
                    </label>

                    <Select<OptionType, true>
                      isMulti
                      options={languageOptions}
                      value={languageFilter}
                      onChange={(selected: MultiValue<OptionType>) =>
                        setLanguageFilter([...selected])
                      }
                      styles={customSelectStyle}
                      placeholder="Select Languages"
                    />
                  </div>

                  {/* INTEREST */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Special Interest
                    </label>

                    <Select<OptionType, true>
                      isMulti
                      options={interestOptions}
                      value={interestFilter}
                      onChange={(selected: MultiValue<OptionType>) =>
                        setInterestFilter([...selected])
                      }
                      styles={customSelectStyle}
                      placeholder="Select Interests"
                    />
                  </div>

                  {/* MODALITIES */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Modalities
                    </label>

                    <Select<OptionType, true>
                      isMulti
                      options={modalitiesOptions}
                      value={modalitiesFilter}
                      onChange={(selected: MultiValue<OptionType>) =>
                        setModalitiesFilter([...selected])
                      }
                      styles={customSelectStyle}
                      placeholder="Select Modalities"
                    />
                  </div>

                  <div className="flex items-end absolute top-3 right-3">
                    <div
                      onClick={clearFilters}
                      className="px-2 py-1 rounded-2xl bg-primary text-white text-sm hover:bg-primary/90 transition"
                    >
                      Reset
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {practitioners.length > 0 ? (
                  practitioners.map((item) => {
                    const isSelected = selectedPractitioner?.id === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPractitioner(item)}
                        className={`cursor-pointer rounded-xl border px-4 py-2 transition-all duration-300
                  
                  ${
                    isSelected
                      ? "border-teal-500 bg-teal-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-md"
                  }
                  `}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          {/* LEFT */}
                          <div className="flex items-center gap-5">
                            {item.profile_image ? (
                            <div className={`h-16 w-16 rounded-2xl`}>
                              <Image
                                src={
                                  imagePath + item.profile_image ||
                                  "/default-profile.png"
                                }
                                alt={item.full_name}
                                width={100}
                                height={100}
                                className="h-full w-full object-cover rounded-2xl"
                              />
                            </div>
                            ):(
                            <div
                              className={`h-16 w-16 rounded-2xl flex items-center justify-center text-white text-2xl
                        
                        ${
                          isSelected
                            ? "bg-teal-600"
                            : "bg-gradient-to-r from-cyan-500 to-teal-500"
                        }
                        `}
                            >
                              <FaUserAlt />
                            </div>)
                  }

                            <div>
                              <h3 className="text-md font-semibold text-gray-700">
                                {item.full_name}
                              </h3>

                              <p className="text-gray-400 text-sm capitalize">
                                {item.gender}
                              </p>

                              <p className="text-gray-400 text-sm">
                                {item.qualifications}
                              </p>
                            </div>
                          </div>

                          {/* RIGHT */}
                          <div className="flex flex-wrap gap-x-5 gap-y-2 justify- ">
                            {/* LANGUAGES */}
                            {item?.languages?.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <FaGlobe className="text-teal-600" />

                                  <span className="font-semibold text-gray-700">
                                    Languages
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  {item?.languages?.map((lang) => (
                                    <div key={lang}>
                                      <span className="px-2 py-1 rounded-full bg-teal-100 text-teal-700 text-xs">
                                        {lang}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item?.special_interests?.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <FaBrain className="text-purple-600" />

                                  <span className="font-semibold text-gray-700">
                                    Interests
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  {item?.special_interests.map((interest) => (
                                    <div key={interest}>
                                      <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                                        {interest}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* MODALITIES */}
                            {item?.modalities?.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <FaMagic className="text-cyan-600" />

                                  <span className="font-semibold text-gray-700">
                                    Modalities
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  {item?.modalities.map((mod) => (
                                    <div key={mod}>
                                      <span className="px-2 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs">
                                        {mod}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-3xl border border-gray-200 py-20 text-center">
                    <FaSearch className="mx-auto text-4xl text-gray-300 mb-5" />

                    <h2 className="text-2xl font-bold text-gray-700">
                      No Practitioner Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Try changing your filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
