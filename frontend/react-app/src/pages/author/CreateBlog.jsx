import Navbar from "../../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.jsx";
import { checkAuth } from "../../api/authApi/authApi.js";
import { useRole } from "../../contexts/roleContexts.jsx";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  //Below are the states for the blog content
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState();
  const [headimageUrl, setHeadImageUrl] = useState("");

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
    <>
      <div className="text-white bg-zinc-800 overflow-hidden">
        <Navbar />
        <div className="max-w-screen md:h-[4vw] h-[4vh] flex justify-center items-center text-white text-[1.5em] bg-zinc-900 border-b-[1px] border-zinc-600">
          <p className=" w-[97.5%] flex justify-center items-center">
            Create a Blog
          </p>
        </div>
        <div className="w-full flex flex-col py-4 ">
          <div className="p-1  max-w-full min-h-[50vh] bg-zinc-800 flex justify-center items-center border-white border-zinc-700">
            <div className="w-[97.5%] min-h-[50vh] flex flex-col py-3 px-7 text-[1.25em] border border-white text-white rounded-sm gap-2 pb-5 ">
              <p className="w-[97.5%] text-[1.4em] font-bold uppercase tracking-widest text-zinc-200">
                Blog details
              </p>

              <div className="w-full flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  /* Exact same layout/sizing as your original */
                  className="
                    w-[97.5%] p-4 rounded-sm text-[1em]
                    bg-zinc-900 text-white placeholder-zinc-600
                    border border-zinc-800
                    focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10
                    hover:border-zinc-700 transition-all duration-200 
                  "
                  placeholder="Post Title..."
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                  Summary
                </label>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => {
                    setSummary(e.target.value);
                  }}
                  /* Exact same layout/sizing as your original */
                  className="
                    w-[97.5%] p-4 rounded-sm
                    bg-zinc-900 text-white placeholder-zinc-600
                    border border-zinc-800
                    focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10
                    hover:border-zinc-700 transition-all duration-200
                  "
                  placeholder="Short summary of the post..."
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
                  Body
                </label>{" "}
                <textarea
                  type="text"
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                  placeholder="Enter the body of the blog..."
                  // className="min-w-[97.5%] min-h-[20vh] border bg-zinc-700 rounded-sm p-4"
                  className="w-[97.5%] min-h-[20vh] p-4 rounded-sm
                      /* High-End Monochrome Theme */
                      bg-zinc-900 text-white placeholder-zinc-600
                      border border-zinc-800
                      /* Focus States */
                      focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10
                      /* Interaction */
                      hover:border-zinc-700 transition-all duration-200"
                />
              </div>
              {/* <div className="w-[97.5%] flex flex-col md:flex-row  border-white rounded-sm  justify-center items-center">
                <div className=" w-[95%] h-[50vh] sm:w-[70%] sm:h-[60vh] flex flex-col justify-top items-center rounded-sm gap-5 sm:py-4">
                  <label className="text-xl font-bold uppercase tracking-widest text-zinc-500 ml-1">
                    Head image
                  </label>
                  <textarea
                    value={headimageUrl}
                    onChange={(e) => {
                      setHeadImageUrl(e.target.value);
                    }}
                    className="w-full h-[70%] sm:w-[95%] sm:min-h-[45vh] p-2 rounded-sm
                    bg-zinc-900 text-white placeholder-zinc-600
                    border border-zinc-800
                    focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10
                    hover:border-zinc-700 transition-all duration-200 "
                    placeholder="Enter the head image URL..."
                  />
                </div>
                <div className="flex justify-center items-center sm:w-[35%] sm:h-[55vh] border border-zinc-700 p-1 rounded-sm border-[3px] ">
                  <img
                    src="https://images.pexels.com/photos/5867948/pexels-photo-5867948.jpeg"
                    className="w-[98%] h-[98%] rounded-sm "
                  />
                </div>
              </div> */}

              <div className="w-[97.5%] flex flex-col lg:flex-row gap-6 p-4 lg:p-1">
                {/* INPUT CARD */}
                <div className="w-full lg:w-[60%] bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 sm:p-6 flex flex-col gap-4">
                  <label className="text-sm sm:text-base font-semibold uppercase tracking-wider text-zinc-400">
                    Head Image URL
                  </label>

                  <textarea
                    value={headimageUrl}
                    onChange={(e) => setHeadImageUrl(e.target.value)}
                    placeholder="Paste image URL here..."
                    className="
                        w-full min-h-[160px] sm:min-h-[50vh]
                        p-3 sm:p-4 rounded-md
                        bg-zinc-900 text-white placeholder-zinc-600
                        border border-zinc-800
                        focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10
                        transition-all duration-200
                      "
                  />
                </div>

                {/* PREVIEW CARD */}
                <div className="w-full lg:w-[40%] bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 sm:p-6 flex flex-col gap-3 justify-center items-center">
                  <span className="text-sm sm:text-base font-semibold uppercase tracking-wider text-zinc-400">
                    Preview
                  </span>

                  <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border border-zinc-700 bg-zinc-950 flex items-center justify-center">
                    <img
                      src={
                        headimageUrl ||
                        "/image_placeholder.jpg"
                      }
                      alt="Head preview"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-1 max-w-full min-h-[50vh] bg-zinc-800 flex justify-center items-center  border-t-[2px] border-white border-zinc-700">
            <div
              className="w-[97.5%] min-h-[50vh] flex justify-center items-center border border-white text-white rounded-sm"
              alt="This is an image"
            >
              Preview div
            </div>
          </div>
        </div>
        <div className="max-w-screen md:h-[4vw] h-[4vh] flex justify-center items-center text-white text-[1.5em] bg-zinc-900 border-b-[1px] border-zinc-600">
          <p className=" w-[97.5%] flex justify-center items-center">
            The submit and draft options
          </p>
        </div>
      </div>
    </>
  );
}
