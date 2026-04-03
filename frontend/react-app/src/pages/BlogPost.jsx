import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { checkAuth } from "../api/authApi/authApi";
import { useRole } from "../contexts/roleContexts.jsx";
import { ArrowLeft, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import BlogComment from "../components/viewer/BlogComment.jsx";
import { getBlogbyId, getCommentsById } from "../api/authApi/viewerApi.js";

export default function BlogPost() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();

  //useStates for this blo post page.
  const [blogData, setBlogData] = useState([]);
  const [comments, setComments] = useState([]);

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
    if (role !== "viewer" && role !== "author" && role) {
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

  useEffect(() => {
    const getBlog = async () => {
      const data = await getBlogbyId(id);
      //   console.log(data.blogData);
      setBlogData(data.blogData);
    };
    getBlog();
  }, []);

  useEffect(() => {
    const getBlogComments = async () => {
      const data = await getCommentsById(id);
      setComments(data.rows);
    };
    getBlogComments();
  }, []);

  return (
    <div className="text-white bg-zinc-800 overflow-hidden">
      <Navbar />
      <div className="w-full h-10vh bg-zinc-900 flex px-6 flex justify-start items-center py-3">
        <button
          className="border rounded-lg bg-zinc-800 font-bold text-center px-4 py-2 text-zinc-600 flex-justify-center items-center"
          onClick={() => {
            navigate("/home");
          }}
        >
          <ArrowLeft className="inline pb-1" />
          Back
        </button>
      </div>
      <div className="px-1 py-3 max-w-full min-h-[50vh] bg-zinc-900 flex flex-col justify-center items-center ">
        <div className="w-[97.5%] min-h-[50vh] flex flex-col  justify-top py-5 items-center text-white">
          <div className="flex  flex-col justify-top w-[80%] md:w-[60%]  gap-3">
            <p className="font-bold text-[2.5rem] text-white">
              {blogData.length !== 0 && blogData[0].title}
            </p>
            <p className="font-semi text-[1.3rem] text-zinc-500">
              {blogData.length !== 0 && blogData[0].summary}
            </p>
            <img
              src={
                (blogData.length !== 0 && blogData[0].headImageUrl) ||
                "/image_placeholder.jpg"
              }
              alt="Head preview"
              className="w-[80%] h-[60%] object-cover transition-transform duration-300 hover:scale-[1.02]  py-6 "
            />
            <div className="flex gap-5">
              <p className="font-semi text-[1.1rem] text-zinc-500">
                👤 {blogData.length !== 0 && blogData[0].author}
              </p>
              <p className="font-semi text-[1.1rem] text-zinc-500 ">
                📅{" "}
                {blogData.length !== 0 &&
                  new Date(blogData[0].createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="font text-[1.1rem] text-white whitespace-pre-line pb-6">
              {blogData.length !== 0 && blogData[0].body}
            </div>
            <div className="w-full py-3 border-y border-y-zinc-800 flex items-center text-md font-bold text-zinc-600 gap-7">
              <p className="flex justify-center items-center px-6 py-2 border-zinc-700 rounded-lg bg-zinc-800 hover:text-white transition duration-400 ">
                <ThumbsUp className="inline pb-1" />
                &nbsp;43
              </p>
              <p className="flex justify-center items-center px-6 py-2 border-zinc-700 rounded-lg bg-zinc-800 hover:text-white transition duration-400 ">
                <ThumbsDown className="inline pt-1" />
                &nbsp; 7
              </p>
            </div>
            <p className="w-full py-5 font-semibold text-whitw text-2xl items-center">
              Comments (1)
            </p>
            <div className="w-full justify-start flex items-center gap-2 bg-zinc-900">
              <input
                type="text"
                className="w-[83%] md:w-[90%] bg-zinc-800 text-white px-4 py-4 text-lg rounded-lg"
                placeholder="Add a comment..."
              />
              <button className="md:w-[8%] text-white px-4 py-4 text-xl font-bold rounded-sm flex justify-center items-center bg-zinc-600 active:bg-zinc-800 transition duration-300 hover:bg-zinc-700">
                <Send />
              </button>
            </div>
            <div className="w-full py-4 flex flex-col justify-center items-center">
              {comments.map((element, index) => (
                <BlogComment
                  key={element.commentId}
                  index={index}
                  commentBody={element.comment}
                  commentAuthor={element.commentAuthor}
                  commentDate={new Date(
                    element.commentDate,
                  ).toLocaleDateString("en-GB")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-t-zinc-700 w-full h-[8vh] justify-center flex items-center font-bold text-lg text-zinc-700 bg-zinc-900">
        ©Anshul Patil • All rights reserved, 2026
      </footer>
      {/* <div className="w-full bg-zinc-900 h-[100vh]"></div> */}
    </div>
  );
}
