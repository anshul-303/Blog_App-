export function RoleChangeRequestCard({
  resolvedAt,
  createdAt,
  resolvedBy,
  requestId,
}) {
  return (
    <>
      <div
        className="w-[95vw] mx-auto mt-2 flex justify-between px-6 py-5 
                        bg-zinc-800 border border-zinc-700 rounded-xl 
                        text-white text-sm md:text-base 
                        transform transition duration-200 ease-out
                        hover:-translate-y-1 hover:scale-[1.01] hover:bg-zinc-700/70 hover:shadow-md
                        active:scale-[0.98] active:translate-y-0"
      >
        <p className="text-center w-[20%] font-bold">{requestId}</p>
        <p className="text-center w-[20%] font-bold">{resolvedBy}</p>
        <p className="text-center w-[20%] font-bold">{createdAt}</p>
        <p className="text-center w-[20%] font-bold">{resolvedAt}</p>
      </div>
    </>
  );
}
