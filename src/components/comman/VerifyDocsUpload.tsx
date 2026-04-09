"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import { toastTBS } from "@/lib/toast";
import { IoIosDocument } from "react-icons/io";
import LoadingSpin from "../LoadingSpin";

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

/* ================= Upload Box ================= */

function UploadBox({
  label,
  required,
  fileKey,
  setFiles,
  files,
}: {
  label: string;
  required?: boolean;
  fileKey: FileKey;
  setFiles: React.Dispatch<React.SetStateAction<FilesState>>;
  files: FilesState;
}) {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  const maxSize = 1 * 1024 * 1024; // 1MB

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      toastTBS.error("Only JPG, PNG or PDF allowed");
      return false;
    }

    if (file.size > maxSize) {
      toastTBS.error("File size must be less than 1MB");
      return false;
    }

    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: FileKey) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ VALIDATION
    if (!validateFile(file)) {
      e.target.value = "";
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

  // 🧹 Cleanup object URLs (prevent memory leak)
  useEffect(() => {
    return () => {
      Object.values(files).forEach((fileData) => {
        if (fileData?.preview) {
          URL.revokeObjectURL(fileData.preview);
        }
      });
    };
  }, [files]);

  const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

  return (
    <div>
      <label className="block text-sm font-semibold text-primary mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-primary/33 rounded-lg p-3.75 bg-primary/8 text-center cursor-pointer hover:border-primary duration-300">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={(e) => handleFileChange(e, fileKey)}
        />

        {files[fileKey] ? (
          <div className="flex flex-col items-center">
            {imageTypes.includes(files[fileKey]!.file.type) ? (
              <Image
                src={files[fileKey]!.preview}
                alt="preview"
                width={32}
                height={32}
                className="w-25 h-25 object-cover rounded-md mb-2"
              />
            ) : (
              <IoIosDocument className="w-15 h-15 text-primary" />
            )}

            <p className="text-sm text-gray-600 w-full text-center">
              {files[fileKey]!.file.name}
            </p>
          </div>
        ) : (
          <div className="flex gap-3.75 items-start">
            <div className="bg-primary p-2.5 rounded-md border-2 border-primary/50">
              <FiUpload className="text-white text-[20px]" />
            </div>
            <div>
              <p className="text-primary font-medium">Click to upload</p>
              <p className="text-[12px] text-primary/50">
                JPG, PNG or PDF (Max 1MB)
              </p>
            </div>
          </div>
        )}
      </label>
    </div>
  );
}

/* ================= Main Component ================= */

export default function VerifyDocsUpload() {
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<FilesState>({
    hpcsa: null,
    bhf: null,
    mps: null,
    cpd: null,
  });

  const [exDate, setExDate] = useState({
    hpcsa: null,
    bhf: null,
    mps: null,
    cpd: null,
  });

  const handleDate = (e: ChangeEvent<HTMLInputElement>, key: FileKey) => {
    setExDate((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ Expiry validation
    for (const key of Object.keys(files)) {
      const fileKey = key as FileKey;

      if (files[fileKey] && !exDate[fileKey]) {
        toastTBS.error(
          `Please select expiry date for ${fileKey.toUpperCase()}`,
        );
        return;
      }
      if (!files[fileKey] && exDate[fileKey]) {
        toastTBS.error(`Please upload document for ${fileKey.toUpperCase()}`);
        return;
      }
    }

    // ✅ File validation again (safety)
    for (const key of Object.keys(files)) {
      const fileKey = key as FileKey;

      if (files[fileKey]) {
        const file = files[fileKey]!.file;

        if (file.size > 1 * 1024 * 1024) {
          toastTBS.error(`${fileKey.toUpperCase()} must be less than 1MB`);
          return;
        }

        if (
          !["image/jpeg", "image/png", "application/pdf"].includes(file.type)
        ) {
          toastTBS.error(`${fileKey.toUpperCase()} must be JPG, PNG or PDF`);
          return;
        }
      }
    }

    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      const fileKey = key as FileKey;
      if (files[fileKey]) {
        formData.append(`${fileKey}_file`, files[fileKey]!.file);
      }
    });

    Object.keys(exDate).forEach((key) => {
      const dateKey = key as FileKey;
      if (exDate[dateKey]) {
        formData.append(`${dateKey}_expiry`, exDate[dateKey]!);
      }
    });
    if ([...formData.entries()].length <= 0) {
      toastTBS.error("Please upload at least one document.");
      return;
    }

    if (loading) return;
    setLoading(true);
    formData.append("user_id", MMMUserData?.id);
    fetch("/api/practitioner/verification_documents", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toastTBS.success("Documents uploaded successfully!");

          setFiles({
            hpcsa: null,
            bhf: null,
            mps: null,
            cpd: null,
          });

          setExDate({
            hpcsa: null,
            bhf: null,
            mps: null,
            cpd: null,
          });

          e.currentTarget.reset();
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
      <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit">
        <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)] w-full text-primary md:text-[25px] text-[20px] py-3 font-semibold md:mb-11.25 mb-7.5">
          Upload Document
        </h2>

        <div className="w-245 max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
          <form onSubmit={handleSubmit}>
            <div className="max-w-135 mx-auto space-y-8">
              {(["hpcsa", "bhf", "mps", "cpd"] as FileKey[]).map((key) => (
                <div
                  key={key}
                  className="flex items-center justify-between w-full gap-10"
                >
                  <div className="w-full">
                    <UploadBox
                      label={key.toUpperCase()}
                      fileKey={key}
                      files={files}
                      setFiles={setFiles}
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) => handleDate(e, key)}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className="cursor-pointer px-10 py-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                {loading ? <LoadingSpin width={4} height={15} /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
