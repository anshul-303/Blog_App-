import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";
import { checkAuth } from "../api/authApi/authApi.js";
import { useRole } from "../contexts/roleContexts.jsx";
import { Sparkles } from "lucide-react";
import AuthorArticleCard from "../components/author/AuthorArticleCard.jsx";
import { getPublishedBlogs } from "../api/authApi/viewerApi.js";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  //Usestates which are used in this blog
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      console.log("Hello world!");
      const data = await getPublishedBlogs();
      setBlogs(data.blogsList);
    };
    getBlogs();
  }, []);

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
    if (role !== "author" && role !== "viewer" && role) {
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
      <div className="border-y border-y-zinc-700 w-full md:h-[60vh] h-[50vh] bg-zinc-900 justify-center items-start flex flex-col px-6 gap-5">
        <p className="text-2xl md:text-xl text-zinc-600 font-bold">
          <Sparkles className="w-5 h-5 inline pb-1" /> Platform for ideas
        </p>
        <div>
          <p className=" text-5xl md:text-7xl text-zinc-200 font-bold mb-2 md:m-0">
            Stories that shape
          </p>
          <p className="text-5xl md:text-7xl text-zinc-600 font-bold">
            the future of tech.
          </p>
        </div>
        <p className="md:w-[50vw] w-[79vw] text-lg md:text-xl text-zinc-600 font-semibold  ">
          Discover thoughtful perspectives on software architecture, design
          systems, and the craft of building exceptional products.
        </p>
      </div>
      <div className="w-full md:min-h-[70vh] min-h-[70vh] bg-zinc-900 flex flex-col justify-start items-start pt-1 px-4 md:px-3 md:pt-3 pb-4 gap-4  ">
        <p className="py-2 text-zinc-700 uppercase font-semibold text-md pl-2 md:pl-1">
          L a t e s t &nbsp;a r t i c l e s
        </p>
        <div className="w-full flex flex-wrap md:flex-row flex-col justify-start items-start gap-3">
          {blogs.map((element, index) => (
            <AuthorArticleCard
              key={element.blogId}
              index={index}
              blogId={element.blogId}
              title={element.title}
              author={element.Author}
              summary={element.summary}
              likeCount={element.likeCount}
              commentCount={element.commentCount}
              createdAt={new Date(element.createdAt).toLocaleDateString(
                "en-GB",
              )}
            />
          ))}
        </div>
      </div>
      <footer className="border-t border-t-zinc-700 w-full h-[8vh] justify-center flex items-center font-bold text-lg text-zinc-700 bg-zinc-900">
        ©Anshul Patil • All rights reserved, 2026
      </footer>
      {/* <div className="w-full h-[100vh] flex justify-center items-center "></div> */}
    </div>
  );
}
