import { ThumbsUp, MessageCircle, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthorArticleCard({
  blogId,
  title,
  author,
  summary,
  likeCount,
  commentCount,
  createdAt,
}) {
  return (
    <div className="bg-zinc-800 md:w-[31vw] md:min-h-[26vh] in-h-[18vh] w-[93vw] mr-4 md:m-0 flex flex-col justify-start items-start p-6 border border-zinc-700 rounded-lg border-[2px] gap-3">
      <p className=" text-2xl md:text-2xl font-semibold text-zinc-200 ">
        <Link to={`/blogs/${blogId}`} className="hover:underline">
          {title}
        </Link>
      </p>
      <p className=" md:text-[1em] text-sm text-zinc-500 flex gap-1  justify-center ">
        {summary}
      </p>
      <div className="flex gap-4">
        <p className="inline text-md text-zinc-600 flex">
          <User className="w-4 h-4 inline" />{" "}
          <span className="font-semibold text-sm text-zinc-400">{author}</span>
        </p>{" "}
        <p className="inline text-md text-zinc-600 flex">
          <Calendar className="w-4 h-4 inline" />
          <span className="font-semibold text-sm text-zinc-400">
            &nbsp;{createdAt}
          </span>
        </p>
        <p className="inline text-md text-zinc-600 flex">
          <ThumbsUp className="w-4 h-4 inline" />
          <span className="font-semibold text-sm text-zinc-400">
            &nbsp;{likeCount}
          </span>
        </p>
        <p className="inline text-md text-zinc-600 flex">
          <MessageCircle className="w-4 h-4 inline" />
          <span className="font-semibold text-sm text-zinc-400">
            &nbsp;{commentCount}
          </span>
        </p>
      </div>
    </div>
  );
}
