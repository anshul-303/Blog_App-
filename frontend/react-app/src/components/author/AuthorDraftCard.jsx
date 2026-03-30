export default function AuthorDraftCard({ title, summary }) {
  return (
    <div className="md:min-h-[13vh] min-h-[10vh] md:w-[97vw] w-[95vw] border rounded-lg border-[2px] border-zinc-700 bg-zinc-800 py-2 flex flex-col md:flex-row justify-between items-center px-4 md:gap-0 gap-2">
      <div className="w-[90vw] md:w-[70vw] md:h-[11vh] flex flex-col justify-center md:gap-1 gap-2  px-2 md:px-0">
        <p className="text-xl font-semibold text-zinc-200 text-center md:text-start">
          {title}
        </p>
        <p className="md:text-[1em] text-sm text-zinc-500 flex gap-1 font-medium justify-center md:justify-start md:text-start text-center">
          {summary}
        </p>
      </div>

      <div className="w-[80vw] md:w-[25vw] h-[6vh] md:h-[11vh] flex md:justify-end justify-center items-center gap-2 ">
        <button
          className=" w-[45vw] h-[4vh] md:w-[11vw] md:h-[9vh] border rounded-lg bg-gray-900 text-white flex justify-center items-center 
                          transition-all duration-200 ease-in-out
                          hover:bg-gray-400 hover:scale-105 hover:shadow-md
                          active:scale-95 active:shadow-inner hover:text-black"
        >
          Edit Draft
        </button>
        <button
          className=" w-[45vw] h-[4vh] md:w-[11vw] md:h-[9vh] border rounded-lg bg-white font-semibold  text-zinc-900 flex justify-center items-center 
                          transition-all duration-200 ease-in-out
                          hover:bg-zinc-900 hover:scale-105 hover:shadow-md hover:text-white
                          active:scale-95 active:shadow-inner"
        >
          Submit Draft
        </button>
      </div>
    </div>
  );
}
