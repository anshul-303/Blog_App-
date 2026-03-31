import { User, Calendar } from "lucide-react";

export default function AuthorSubmissionCard({ title, summary, createdAt }) {
  return (
    <div className="bg-zinc-800 md:w-[47vw] md:min-h-[21.5vh] min-h-[14vh] w-[93vw] flex flex-col justify-start items-start p-6 border border-zinc-700 rounded-lg border-[2px] gap-2">
      <p className="text-3xl font-semibold text-zinc-200 ">{title}</p>
      <p className="md:text-[1em] text-lg text-zinc-500 flex gap-1  justify-center ">
        {summary}
      </p>
      <div className="flex gap-4">
        <p className="inline text-md text-zinc-600 flex">
          <Calendar className="w-4 h-4 inline" />
          <span className="font-semibold text-sm text-zinc-400">
            &nbsp;{createdAt}
          </span>
        </p>
      </div>
    </div>
  );
}
