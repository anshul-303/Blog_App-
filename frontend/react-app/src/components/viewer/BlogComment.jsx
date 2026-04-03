export default function BlogComment({
  commentBody,
  commentAuthor,
  commentDate,
}) {
  return (
    <>
      <div className="w-full p-2 flex gap-4  ">
        <p className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-white font-semibold p-4 md:p-0">
          JM
        </p>
        <div className="flex justify-center items-start flex-col gap-0.5 ">
          <p className="font-bold text-sm text-zinc-200">
            {commentAuthor}{" "}
            <span className="text-sm  text-zinc-600 ml-2">{commentDate}</span>
          </p>
          <p className="text-zinc-300">{commentBody}</p>
        </div>
      </div>
    </>
  );
}
