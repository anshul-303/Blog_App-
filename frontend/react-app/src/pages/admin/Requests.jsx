import { Link } from "react-router-dom";

export default function Requests() {
  return (
    <div className="justify-center flex flex-col items-center h-screen w-screen text-center text-[2em] bg-zinc-900 text-white">
      <p>Requests Page</p>
      <p className="underline">
        <Link to={"/menu"}>Menu</Link>{" "}
      </p>
    </div>
  );
}
