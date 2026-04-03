export default function BlogComment() {
  return (
    <>
    <div className="w-full p-2 flex gap-4 ">
      <p className="w-10 flex justify-center items-center h-10  border rounded-full bg-zinc-800 ">
        JM
      </p>
      <div className="flex justify-center items-start flex-col gap-0.5 ">
        <p className="font-bold text-sm text-zinc-200">
          Jeremy Wilson{" "}
          <span className="text-sm  text-zinc-600 ml-2">19/10/2020</span>
        </p>
        <p className="text-zinc-300">
          One of most insightful blogs in recent times which I have border
          border-zinc-800 border border-zinc-800 read!
        </p>
      </div>
    </div>
    </>
  );
}
