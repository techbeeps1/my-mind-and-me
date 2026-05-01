"use client";
import { MdKeyboardArrowLeft,MdKeyboardArrowRight } from "react-icons/md";
interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  page,
  totalPages,
  setPage,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center flex-col flex-wrap gap-3 mb-4">


      <div className="flex items-center gap-2 p-2 rounded-md "> 
        {/* Previous */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`flex justify-center items-center w-10 h-10  rounded-md text-xl font-medium transition
            ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:opacity-90 cursor-pointer"
            }`}
        >
          <MdKeyboardArrowLeft />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(
            Math.max(page - 3, 0),
            Math.min(page + 2, totalPages)
          )
          .map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 rounded-md text-sm font-semibold transition
                ${
                  page === pageNumber
                    ? "bg-primary text-white cursor-not-allowed"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
            >
              {pageNumber}
            </button>
          ))}

        {/* Next */}
        <button
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={page === totalPages}
          className={`flex justify-center items-center w-10 h-10 rounded-md text-xl font-medium transition
            ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:opacity-90 cursor-pointer"
            }`}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
            <div className="text-sm text-primary font-medium">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}