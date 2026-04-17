"use client";


export default function ReadMorePopup({setOpenReadMore, openReadMore, openReadMoreTitle}: {setOpenReadMore: React.Dispatch<React.SetStateAction<string>>, openReadMore: string, openReadMoreTitle: string}) {




if (!openReadMore) return null;

  return (
    <>
  <div className="fixed inset-0 z-50 flex items-center justify-center">
  
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpenReadMore("")}
        />
        <div className="relative max-w-xl w-full" >
          <button
            onClick={() => setOpenReadMore("")}
            className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
          >
            ✕
          </button>
  
                    <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
                      <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-5 mb-1.5">
                        {openReadMoreTitle}
                      </h2>
              
                      <div className="md:px-12.5 px-5 md:pb-12.5 pb-5 rounded-xl ">
  
                        <div className="overflow-x-auto rounded-lg  bg-white">
                          <div className="w-full text-left py-4 text-sm text-primary font-semibold px-4">
                            {openReadMore}
                          </div>
                        </div>
                      </div>
            
                    </div>
                  
  
  
        </div>
      </div>
 

    </>
  );
}



