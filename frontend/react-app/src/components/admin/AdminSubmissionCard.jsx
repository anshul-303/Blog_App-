import { updateBlogStatus } from "../../api/authApi/adminApi";

export default function AdminSubmissionCard({
  title,
  index,
  authorName,
  createdAt,
  blogId,
  setBlogSubmissions,
}) {
  return (
    <div className="w-[95vw] md:w-[97vw] md:h-[14vh] h-[16vh] border border-zinc-700 items-center md:items-start rounded-sm flex flex-col md:flex-row gap-2 py-2 px-6 bg-zinc-900">
      <div className="md:w-[80vw] md:h-[11vh] flex flex-col justify-center md:gap-0 gap-1">
        <p className="text-xl font-bold text-zinc-200 text-center md:text-start">
          {title}
        </p>
        <div className="md:text-[1em] text-sm text-zinc-600 flex gap-1 font-medium justify-center md:justify-start">
          <p>{authorName} ·</p>
          <p>{createdAt}</p>
        </div>
      </div>
      <div className="w-[80vw] h-[20vh] md:w-[15vw] md:h-[11vh] flex md:justify-end justify-center items-center gap-2 ">
        <button
          onClick={() => {
            updateBlogStatus(blogId, "published", setBlogSubmissions);
          }}
          className=" w-[30vw] h-[10vw] md:w-[8vh] md:h-[8vh] border rounded-lg bg-emerald-400 text-emerald-700 flex justify-center items-center 
                transition-all duration-200 ease-in-out
                hover:bg-emerald-500 hover:scale-105 hover:shadow-md
                active:scale-95 active:shadow-inner"
        >
          ✓
        </button>
        <button
          onClick={() => {
            updateBlogStatus(blogId, "rejected", setBlogSubmissions);
          }}
          className="w-[30vw] h-[10vw] md:w-[8vh] md:h-[8vh] border rounded-lg bg-rose-400 text-rose-700 flex justify-center items-center 
                transition-all duration-200 ease-in-out
                hover:bg-rose-500 hover:scale-105 hover:shadow-md
                active:scale-95 active:shadow-inner"
        >
          X
        </button>
      </div>
    </div>
  );
}
