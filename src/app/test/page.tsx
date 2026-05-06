"use client";

import { useEffect, useMemo, useState } from "react";

import Select, {
  MultiValue,
  SingleValue,
  StylesConfig,
} from "react-select";

import {
  FaSearch,
  FaUserAlt,
  FaGlobe,
  FaBrain,
  FaMagic,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

// -----------------------------------
// TYPES
// -----------------------------------

type Practitioner = {
  id: number;
  full_name: string;
  gender: string;
  qualifications: string;
  languages: string[];
  special_interests: string[];
  modalities: string[];
};

type OptionType = {
  value: string;
  label: string;
};

// -----------------------------------
// COMPONENT
// -----------------------------------

export default function PractitionerListingPage() {

  // -----------------------------------
  // PRACTITIONERS
  // -----------------------------------

  const [practitioners, setPractitioners] = useState<
    Practitioner[]
  >([]);

  // Selected Practitioner
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner | null>(null);

  useEffect(() => {
    setPractitioners([
      {
        id: 1,
        full_name: "Gurjeet",
        gender: "male",
        qualifications: "Clinical Psychologist",
        languages: ["English", "Hindi"],
        special_interests: ["Anxiety"],
        modalities: ["CBT"],
      },
      {
        id: 2,
        full_name: "Sarah Johnson",
        gender: "female",
        qualifications: "Trauma Therapist",
        languages: ["Dutch", "German"],
        special_interests: ["Depression"],
        modalities: ["DBT"],
      },
      {
        id: 3,
        full_name: "John Doe",
        gender: "male",
        qualifications: "Mental Wellness Expert",
        languages: ["English"],
        special_interests: ["Trauma"],
        modalities: ["Psychodynamic"],
      },
    ]);
  }, []);

  // -----------------------------------
  // FILTER STATES
  // -----------------------------------

  const [search, setSearch] = useState<string>("");

  const [genderFilter, setGenderFilter] =
    useState<OptionType | null>(null);

  const [languageFilter, setLanguageFilter] =
    useState<OptionType[]>([]);

  const [interestFilter, setInterestFilter] =
    useState<OptionType[]>([]);

  const [modalitiesFilter, setModalitiesFilter] =
    useState<OptionType[]>([]);

  // -----------------------------------
  // OPTIONS
  // -----------------------------------

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

  // -----------------------------------
  // FILTER LOGIC
  // -----------------------------------

  const filteredPractitioners = useMemo(() => {
    return practitioners.filter((item) => {

      // Search
      const matchSearch = item.full_name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Gender
      const matchGender =
        !genderFilter ||
        item.gender === genderFilter.value;

      // Languages
      const matchLanguages =
        languageFilter.length === 0 ||
        languageFilter.some((lang) =>
          item.languages.includes(lang.value)
        );

      // Interests
      const matchInterest =
        interestFilter.length === 0 ||
        interestFilter.some((interest) =>
          item.special_interests.includes(
            interest.value
          )
        );

      // Modalities
      const matchModalities =
        modalitiesFilter.length === 0 ||
        modalitiesFilter.some((mod) =>
          item.modalities.includes(mod.value)
        );

      return (
        matchSearch &&
        matchGender &&
        matchLanguages &&
        matchInterest &&
        matchModalities
      );
    });
  }, [
    practitioners,
    search,
    genderFilter,
    languageFilter,
    interestFilter,
    modalitiesFilter,
  ]);

  // -----------------------------------
  // CLEAR FILTERS
  // -----------------------------------

  const clearFilters = (): void => {
    setSearch("");
    setGenderFilter(null);
    setLanguageFilter([]);
    setInterestFilter([]);
    setModalitiesFilter([]);
  };

  // -----------------------------------
  // SELECT STYLE
  // -----------------------------------

  const customSelectStyle: StylesConfig<
    OptionType,
    true
  > = {
    control: (base, state) => ({
      ...base,
      minHeight: "55px",
      borderRadius: "18px",
      borderColor: state.isFocused
        ? "#14b8a6"
        : "#e5e7eb",
      boxShadow: "none",

      "&:hover": {
        borderColor: "#14b8a6",
      },
    }),

    multiValue: (base) => ({
      ...base,
      background:
        "linear-gradient(90deg,#14b8a6,#0891b2)",
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

  return (

    
    <div className="min-h-screen bg-[#f5f8fb]">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* FILTERS */}
        <div className="bg-white rounded-[30px] shadow-lg p-6 md:p-8 mb-10 border border-gray-100 relative">

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
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full h-[55px] rounded-2xl border border-gray-200 pl-12 pr-4 outline-none focus:border-teal-500"
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
                onChange={(
                  selected: SingleValue<OptionType>
                ) =>
                  setGenderFilter(selected)
                }
                styles={
                  customSelectStyle as StylesConfig<
                    OptionType,
                    false
                  >
                }
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
                onChange={(
                  selected: MultiValue<OptionType>
                ) =>
                  setLanguageFilter([
                    ...selected,
                  ])
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
                onChange={(
                  selected: MultiValue<OptionType>
                ) =>
                  setInterestFilter([
                    ...selected,
                  ])
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
                onChange={(
                  selected: MultiValue<OptionType>
                ) =>
                  setModalitiesFilter([
                    ...selected,
                  ])
                }
                styles={customSelectStyle}
                placeholder="Select Modalities"
              />
            </div>

                        <div className="flex items-end absolute top-3 right-3">

              <button
                onClick={clearFilters}
                className="w-10 h-[35px] rounded-2xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2"
              >
                <FaTimes />
           
              </button>
            </div>
          </div>
        </div>

        {/* RESULT */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Practitioners List
            </h2>


          </div>
        </div>

        <div className="space-y-4">

          {filteredPractitioners.length > 0 ? (
            filteredPractitioners.map((item) => {

              const isSelected =
                selectedPractitioner?.id ===
                item.id;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    setSelectedPractitioner(
                      item
                    )
                  }
                  className={`cursor-pointer rounded-3xl border p-5 transition-all duration-300
                  
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
                      </div>

                      <div>

                        <h3 className="text-xl font-bold text-gray-800">
                          {item.full_name}
                        </h3>

                        <p className="text-gray-500 capitalize">
                          {item.gender}
                        </p>

                        <p className="text-gray-700 mt-1">
                          {
                            item.qualifications
                          }
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-wrap gap-6">

                      {/* LANGUAGES */}
                      <div>

                        <div className="flex items-center gap-2 mb-2">
                          <FaGlobe className="text-teal-600" />

                          <span className="font-semibold text-gray-700">
                            Languages
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">

                          {item.languages.map(
                            (lang) => (
                              <span
                                key={lang}
                                className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm"
                              >
                                {lang}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* INTEREST */}
                      <div>

                        <div className="flex items-center gap-2 mb-2">
                          <FaBrain className="text-purple-600" />

                          <span className="font-semibold text-gray-700">
                            Interests
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">

                          {item.special_interests.map(
                            (interest) => (
                              <span
                                key={interest}
                                className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
                              >
                                {interest}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* MODALITIES */}
                      <div>

                        <div className="flex items-center gap-2 mb-2">
                          <FaMagic className="text-cyan-600" />

                          <span className="font-semibold text-gray-700">
                            Modalities
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">

                          {item.modalities.map(
                            (mod) => (
                              <span
                                key={mod}
                                className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm"
                              >
                                {mod}
                              </span>
                            )
                          )}
                        </div>
                      </div>
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
    </div>
  );
}