import { Link } from "react-router-dom";
import { ThumbsUp, FileSpreadsheet, MessageCircle } from "lucide-react";
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
import {
  getAllAuthorArticles,
  getAuthorStatistics,
  getDrafts,
  getSubmitted,
} from "../../api/authApi/authorApi.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  //UseStates
  const [publishedCount, setPublishedCount] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);

  const [draftsList, setDraftsList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [submissionsList, setSubmissionsList] = useState([]);

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

  useEffect(() => {
    const callApi = async () => {
      const data = await getDrafts();
      setDraftsList(data.drafts);
    };
    callApi();
  }, []);

  useEffect(() => {
    const getSubmissions = async () => {
      const data = await getSubmitted();
      setSubmissionsList(data.submitted);
    };
    getSubmissions();
  }, []);

  useEffect(() => {
    const getAuthorStats = async () => {
      const data = await getAuthorStatistics();
      setCommentsCount(data.totalComments);
      setLikesCount(data.totalLikes);
      setPublishedCount(data.publishedBlogs);
    };
    getAuthorStats();
  }, []);

  useEffect(() => {
    const getAllArticles = async () => {
      const data = await getAllAuthorArticles();
      setArticlesList(data.blogsList);
    };
    getAllArticles();
  }, []);

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
          <p className="text-3xl font-bold text-white">{publishedCount}</p>

          <p className="text-1xl font-semibold text-zinc-500">Published</p>
        </div>
        <div className="w-[32vw] md:h-[23vh] h-[18vh] bg-zinc-800 flex flex-col justify-center items-center gap-1 border border-[3px] rounded-lg border-zinc-800">
          <ThumbsUp className="w-9 h-9 font-bold mb-5 text-zinc-500" />
          <p className="text-3xl font-bold text-white">{likesCount}</p>

          <p className="text-1xl font-semibold text-zinc-500">Likes</p>
        </div>
        <div className="w-[32vw] md:h-[23vh] h-[18vh] bg-zinc-800 flex flex-col justify-center items-center gap-1 border border-[3px] rounded-lg border-zinc-800">
          <MessageCircle className="w-9 h-9 font-bold mb-5 text-zinc-500" />
          <p className="text-3xl font-bold text-white">{commentsCount}</p>

          <p className="text-1xl font-semibold text-zinc-500">Comments</p>
        </div>
      </div>
      <div className="w-full md:min-h-[25vh] min-h-[20vh] bg-zinc-900 flex flex-col justify-start items-start py-1 px-2 md:px-3 md:py-2 gap-2  ">
        <p className="py-2 text-zinc-700 uppercase font-semibold text-md pl-2 md:pl-1">
          D r a f t s
        </p>
        {draftsList.length === 0 && (
          <>
            <div className="w-[95vw] md:w-[97vw] h-[8vh] md:min-h-[10vh] flex flex-col gap-5 justify-center items-center border border-zinc-700 rounded-sm border-[3px]">
              <p className="text-3xl font-semi-bold text-zinc-400">
                No drafts!
              </p>
            </div>
          </>
        )}
        {draftsList.map((element) => (
          <AuthorDraftCard
            key={element.blogId}
            blogId={element.blogId}
            title={element.title}
            summary={element.summary}
          />
        ))}
      </div>

      <div className="w-full pt-3 md:min-h-[40vh] min-h-[45vh] bg-zinc-900 flex flex-col justify-start items-start px-4 px-5 gap-2 ">
        <p className="py-2 text-zinc-700 uppercase font-semibold text-md pl-2 md:pl-2">
          A L L &nbsp; A R T I C L E S
        </p>
        <div className="flex gap-3 flex-wrap justify-start">
          {articlesList.map((element, index) => (
            <AuthorPublishedCard
              key={element.blogId}
              blogId={element.blogId}
              title={element.title}
              summary={element.summary}
              author={element.authorName}
              likesCount={element.likeCount}
              commentsCount={element.commentCount}
              status={element.status}
              createdAt={new Date(element.createdAt).toLocaleDateString(
                "en-GB",
              )}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:min-h-[45vh] min-h-[45vh] bg-zinc-900 flex flex-col justify-start items-start px-5 gap-2 pb-4">
        <p className="pb-2 text-zinc-700 uppercase font-semibold text-md pl-2 pt-5 md:pl-2">
          S U B M I S S I O N S
        </p>
        {submissionsList.length === 0 && (
          <>
            <div className="w-[95vw] md:w-[97vw] h-[8vh] md:min-h-[10vh] flex flex-col gap-5 justify-center items-center border border-zinc-700 rounded-sm border-[3px]">
              <p className="text-3xl font-semi-bold text-zinc-400">
                No submissions yet!
              </p>
            </div>
          </>
        )}
        <div className="flex gap-3 flex-wrap justify-start">
          {submissionsList.map((element) => (
            <AuthorSubmissionCard
              key={element.blogId}
              blogId={element.blogId}
              title={element.title}
              summary={element.summary}
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

      {/* <div className="w-screen h-[100vh] bg-zinc-800"></div> */}
    </div>
  );
}
