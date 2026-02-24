"use client";

import WrapperBanner from "@/app/components/WraperBanner";
import { FaRegUser } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

/* =========================
   Types
========================= */

type FileData = {
  file: File;
  preview: string;
};

type FilesState = {
  hpcsa: FileData | null;
  bhf: FileData | null;
  mps: FileData | null;
  cpd: FileData | null;
};

type FileKey = keyof FilesState;

/* =========================
   Component
========================= */

export default function PractitionerProfile() {
  const [files, setFiles] = useState<FilesState>({
    hpcsa: null,
    bhf: null,
    mps: null,
    cpd: null,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: FileKey) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed (JPG, PNG)");
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [key]: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  const UploadBox = ({
    label,
    required,
    fileKey,
  }: {
    label: string;
    required?: boolean;
    fileKey: FileKey;
  }) => (
    <div>
      <label className="block text-sm font-medium text-teal-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <label className="relative flex flex-col items-center  justify-center border-2 border-dashed border-teal-300 rounded-lg p-6 bg-teal-50 text-center cursor-pointer hover:bg-teal-100 transition">
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={(e) => handleFileChange(e, fileKey)}
        />

        {files[fileKey] ? (
          <div className="flex flex-col items-center">
            <Image
              src={files[fileKey]!.preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
            <p className="text-sm text-gray-600">{files[fileKey]!.file.name}</p>
          </div>
        ) : (
          <>
            <p className="text-teal-700 font-medium">Click to upload</p>
            <p className="text-sm text-gray-500">JPG or PNG</p>
          </>
        )}
      </label>
    </div>
  );

  return (
    <WrapperBanner>
      <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
        <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit">
          <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)] w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
            Practitioner Profile
          </h2>

          <div className="w-245 max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
          <div className="space-y-6">
  <h3 className="text-[22px] font-bold text-primary text-center">
    Personal Info
  </h3>

  {/* Full Name */}
  <label className="block text-sm font-semibold leading-6 text-primary mb-2">
    Full Name
  </label>
  <div className="flex items-center gap-[12px] bg-primary/8 rounded-md px-4 py-2.5 ">
    <FaRegUser className="h-4 w-4 text-primary" />
    <input
      type="text"
      placeholder="Full Name"
      required
      className="w-full text-primary text-sm placeholder:text-primary bg-transparent outline-none"
    />
  </div>

  {/* Qualifications */}
  <label className="block text-sm font-semibold leading-6 text-primary mb-2">
    Qualifications
  </label>
  <div className="flex items-center gap-[12px] bg-primary/8 rounded-md px-4 py-2.5 ">
    <FaRegUser className="h-4 w-4 text-primary" />
    <input
      type="text"
      placeholder="Qualifications"
      required
      className="w-full text-primary text-sm placeholder:text-primary bg-transparent outline-none"
    />
  </div>

  {/* License number */}
  <label className="block text-sm font-semibold leading-6 text-primary mb-2">
    License number
  </label>
  <div className="flex items-center gap-[12px] bg-primary/8 rounded-md px-4 py-2.5">
    <FaRegUser className="h-4 w-4 text-primary" />
    <input
      type="text"
      placeholder="License number"
      required
      className="w-full text-primary text-sm placeholder:text-primary bg-transparent outline-none"
    />
  </div>
</div>

            {/* Verification Section */}
            <h3 className="text-xl font-semibold text-teal-800 text-center mt-6 mb-8">
              Verification Document
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <UploadBox label="HPCSA / SACSS" required fileKey="hpcsa" />
                <UploadBox label="BHF" fileKey="bhf" />
                <UploadBox label="MPS" fileKey="mps" />
                <UploadBox label="CPD" fileKey="cpd" />
              </div>

              <div className="space-y-8">
                {[1, 2, 3, 4].map((_, i) => (
                  <input
                    key={i}
                    type="date"
                    className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-12">
              <button className="px-10 py-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </WrapperBanner>
  );
}
