export default function TagSelector({ selected, setSelected, options, edit= false,columnCount=0 }: { selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>; options: string[]; edit?: boolean; columnCount?: number }) {

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };
  return (

    <div className={`grid  ${columnCount>0 ? `grid-cols-2` : "grid-cols-4"}  gap-4`}>
      {options.map((item, index) => {
        const isActive = selected.includes(item);
        return (
          <div
            key={index}
            onClick={() => { if (!edit) { toggle(item); } }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg  transition
                ${isActive
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100 text-gray-500"
              } ${!edit ? "hover:bg-gray-300 cursor-pointer " : ""}
              `}
          >
            {/* Checkbox */}
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded
                  ${isActive
                  ? "bg-green-600 border-green-600"
                  : "border-gray-400"
                }
                `}
            >
              {isActive && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium">{item}</span>
          </div>
        );
      })}
    </div>

  );
}