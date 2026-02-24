import { Link } from "react-router-dom";

export default function CreateBlog() {
  return (
    <div className="justify-center flex flex-col items-center h-screen w-screen text-center text-[2em] bg-zinc-900 text-white">
      <p>Create Blog Page.</p>
      <p className="underline">
        <Link to={"/menu"}>Back to Menu.</Link>{" "}
      </p>
    </div>
  );
}
