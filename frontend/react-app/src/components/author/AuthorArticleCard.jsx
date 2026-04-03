import { ThumbsUp, MessageCircle, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthorArticleCard() {
  return (
    <div className="bg-zinc-800 md:w-[31vw] md:min-h-[26vh] in-h-[18vh] w-[93vw] mr-4 md:m-0 flex flex-col justify-start items-start p-6 border border-zinc-700 rounded-lg border-[2px] gap-3">
      <p className=" text-2xl md:text-2xl font-semibold text-zinc-200 ">
        <Link to={`/blogs/1`} className="hover:underline">This is the title</Link>
        


      </p>
      <p className=" md:text-[1em] text-sm text-zinc-500 flex gap-1  justify-center ">
        This is the summary
      </p>
      <div className="flex gap-4">
        <p className="inline text-md text-zinc-600 flex">
          <User className="w-4 h-4 inline" />{" "}
          <span className="font-semibold text-sm text-zinc-400">
            Sarah Chen
          </span>
        </p>{" "}
        <p className="inline text-md text-zinc-600 flex">
          <Calendar className="w-4 h-4 inline" />
          <span className="font-semibold text-sm text-zinc-400">
            &nbsp;28 March, 2026
          </span>
        </p>
        <p className="inline text-md text-zinc-600 flex">
          <ThumbsUp className="w-4 h-4 inline" />
          <span className="font-semibold text-sm text-zinc-400">&nbsp;40</span>
        </p>
        <p className="inline text-md text-zinc-600 flex">
          <MessageCircle className="w-4 h-4 inline" />
          <span className="font-semibold text-sm text-zinc-400">&nbsp;4</span>
        </p>
      </div>
    </div>
  );
}
