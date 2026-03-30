import { Link } from "react-router-dom";
import {
  ThumbsUp,
  FileSpreadsheet,
  MessageCircle,
  User,
  Calendar,
} from "lucide-react";
import { FilePen } from "lucide-react";
import Navbar from "../../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.jsx";
import { checkAuth } from "../../api/authApi/authApi.js";
import { useRole } from "../../contexts/roleContexts.jsx";
import AuthorDraftCard from "../../components/author/AuthorDraftCard.jsx";
import AuthorPublishedCard from "../../components/author/AuthorPublishedCard.jsx";
import AuthorSubmissionCard from "../../components/author/AuthorSubmissionCard.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const callCheckAuthAPI = async () => {
      await checkAuth(navigate, setIsAuthenticated, setRole);
    };
    if (!isAuthenticated) {
      callCheckAuthAPI();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Guard: Role-based access
    if (role !== "author" && role) {
      navigate("/403");
      return;
    }
    const fetchtrial = async () => {
      const res = await fetch(`${url}/test`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        const newres = await fetch(`${url}/auth/refresh`, {
          credentials: "include",
        });
        if (newres.ok) {
          fetchtrial();
        } else {
          throw Error("The access token is not there.");
        }
      }
    };

    fetchtrial();
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="text-white bg-zinc-800 overflow-hidden">
      <Navbar />
      <div className="w-full md:h-[10vh] h-[7vh] bg-zinc-900 flex justify-between items-center pl-5 pr-5 md:pr-10 ">
        <p className="text-xl md:text-2xl font-bold text-white">
          Author Dashboard
        </p>
        <button
          onClick={() => navigate("/create-blog")}
          className="text-zinc-900 font-semibold bg-white border rounded-lg border-[2px] py-1 md:py-2 px-3 md:px-8 hover:bg-zinc-100 active:bg-zinc-300"
        >
          <FilePen className="text-black inline font-bold mr-2" />
          New Article
        </button>
      </div>
      <div className="w-full md:min-h-[25vh] min-h-[20vh] bg-zinc-900 flex justify-center items-center py-1 px-2 md:px-3 md:py-2 gap-3">
        <div className="w-[32vw] md:h-[23vh] h-[18vh] bg-zinc-800 flex flex-col justify-center items-center gap-1 border border-[3px] rounded-lg border-zinc-800">
          <FileSpreadsheet className="w-9 h-9 font-bold mb-5 text-zinc-500" />
          <p className="text-3xl font-bold text-white">19</p>

          <p className="text-1xl font-semibold text-zinc-500">Published</p>
        </div>
        <div className="w-[32vw] md:h-[23vh] h-[18vh] bg-zinc-800 flex flex-col justify-center items-center gap-1 border border-[3px] rounded-lg border-zinc-800">
          <ThumbsUp className="w-9 h-9 font-bold mb-5 text-zinc-500" />
          <p className="text-3xl font-bold text-white">89</p>

          <p className="text-1xl font-semibold text-zinc-500">Likes</p>
        </div>
        <div className="w-[32vw] md:h-[23vh] h-[18vh] bg-zinc-800 flex flex-col justify-center items-center gap-1 border border-[3px] rounded-lg border-zinc-800">
          <MessageCircle className="w-9 h-9 font-bold mb-5 text-zinc-500" />
          <p className="text-3xl font-bold text-white">38</p>

          <p className="text-1xl font-semibold text-zinc-500">Comments</p>
        </div>
      </div>
      <div className="w-full md:min-h-[25vh] min-h-[20vh] bg-zinc-900 flex flex-col justify-start items-start py-1 px-2 md:px-3 md:py-2 gap-2  ">
        <p className="py-2 text-zinc-700 uppercase font-semibold text-md pl-2 md:pl-1">
          D r a f t s
        </p>
        <AuthorDraftCard />
      </div>

      <div className="w-full pt-3 md:min-h-[40vh] min-h-[45vh] bg-zinc-900 flex flex-col justify-start items-start px-4 px-5 gap-2 ">
        <p className="py-2 text-zinc-700 uppercase font-semibold text-md pl-2 md:pl-2">
          A L L &nbsp; A R T I C L E S
        </p>
        <div className="flex gap-3 flex-wrap justify-start">
          <AuthorPublishedCard />
          <AuthorPublishedCard />
        </div>
      </div>

      <div className="w-full md:min-h-[45vh] min-h-[45vh] bg-zinc-900 flex flex-col justify-start items-start px-5 gap-2 pb-4">
        <p className="pb-2 text-zinc-700 uppercase font-semibold text-md pl-2 md:pl-2">
          S U B M I S S I O N S
        </p>
        <div className="flex gap-3 flex-wrap justify-start">
          <AuthorSubmissionCard />
          <AuthorSubmissionCard />
        </div>
      </div>

      {/* <div className="w-screen h-[100vh] bg-zinc-800"></div> */}
    </div>
  );
}
