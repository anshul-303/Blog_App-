import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="text-white bg-zinc-800 overflow-hidden">
      <Navbar />
      <div className="w-full md:h-[60vh] h-[50vh] border bg-zinc-900 justify-center items-start flex flex-col px-6 gap-5">
        <p className="text-xl text-zinc-600 font-bold"><Sparkles className="w-5 h-5 inline pb-1"/> Platform for ideas</p>
        <div>
          <p className="text-7xl text-zinc-200 font-bold">Stories that shape</p>
          <p className="text-7xl text-zinc-600 font-bold">
            the future of tech.
          </p>
        </div>
        <p className="md:w-[50vw] w-[79vw] text-xl text-zinc-600 font-semibold  ">
          Discover thoughtful perspectives on software architecture, design systems, and the craft of building exceptional products.
        </p>
      </div>
      <div className="w-full h-[100vh] flex justify-center items-center "></div>
    </div>
  );
}
