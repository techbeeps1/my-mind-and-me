
export default function ReadMoreButton ({ text = "", title = "", limit = 40, setdata, setdataTitle }: { text:string ,title:string  ,limit:number,setdata?: React.Dispatch<React.SetStateAction<string>>, setdataTitle?: React.Dispatch<React.SetStateAction<string>>}) {
  if (!text) return null;

  const isLong = text.length > limit;
  const shortText = text.slice(0, limit);

  return (
    <span>
      {shortText}
      {isLong && (
        <>
          ...
          <span
            onClick={() => {
              setdata?.(text);
              setdataTitle?.(title);
            }}
            className="ml-2 text-gray-400 cursor-pointer"
          >
            Read More
          </span>
        </>
      )}
    </span>
  );
};

