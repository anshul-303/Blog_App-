import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.jsx";
import { checkAuth } from "../../api/authApi/authApi.js";
import { useRole } from "../../contexts/roleContexts.jsx";
import AdminSubmissionCard from "../../components/admin/AdminSubmissionCard.jsx";
import { getSubmissions, getAdminSummary } from "../../api/authApi/adminApi.js";

export default function Submissions() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;

  //All the useStates below contain the data which is the infromation required for this page.
  const [submissionsCount, setSubmissionsCount] = useState(null);
  const [pending, setPending] = useState(null);
  const [rejected, setRejected] = useState(null);
  const [published, setPublished] = useState(null);
  const [blogSubmissions, setBlogSubmissions] = useState([]);

  useEffect(() => {
    const callfunc = async () => {
      const data = await getSubmissions();
      // console.log(data.submissions);

      setBlogSubmissions(data.submissions);
      const temp = await getAdminSummary();
      // console.log(temp)
      setSubmissionsCount(temp.submissions);
      setPending(temp.pending);
      setPublished(temp.published);
      setRejected(temp.rejected);
    };
    callfunc();
  }, []);

  useEffect(() => {
    const callfunc = async () => {
      const temp = await getAdminSummary();
      // console.log(temp)
      setSubmissionsCount(temp.submissions);
      setPending(temp.pending);
      setPublished(temp.published);
      setRejected(temp.rejected);
    };
    callfunc();
  }, [blogSubmissions]);

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
    if (role !== "admin" && role) {
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
        <div className="w-screen md:h-[4vw] h-[4vh] flex justify-center items-center text-white text-[1.5em] bg-zinc-900 border-b-[1px] border-zinc-600">
          <p className=" w-[97.5%] flex justify-center items-center">
            Submissions
          </p>
        </div>
        <div className="w-full  py-4 flex flex-col">
          <div className="border-[4px] border-zinc-700 rounded-lg w-[95vw] md:w-[97vw] md:min-h-[22.5vh] h-[25vh] gap-4 flex flex-col ml-3 py-2">
            <p className="pl-5 font-bold uppercase tracking-widest text-zinc-200">
              Summary
            </p>
            <div className="w-full md:h-full h-[70%] flex gap-4 flex-wrap md:justify-center justify-start items-center pl-2">
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[23%] flex flex-col justify-center items-center gap-2 border rounded-lg border-zinc-700 border-[3px] rounded-lg ">
                <p className="font-bold text-xs md:text-sm uppercase tracking-widest text-zinc-200">
                  Submissions
                </p>
                <p className="text-3xl font-bold text-white">
                  {submissionsCount === null ? "-" : submissionsCount}
                </p>
              </div>
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[24%] flex flex-col justify-center items-center gap-2 border rounded-lg border-zinc-700 border-[3px] rounded-lg ">
                <p className="font-bold text-xs md:text-sm uppercase tracking-widest text-yellow-500">
                  Pending
                </p>
                <p className="text-3xl font-bold text-white">
                  {pending === null ? "-" : pending}
                </p>
              </div>
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[24%] flex flex-col justify-center items-center gap-2 border rounded-lg border-zinc-700 border-[3px] rounded-lg ">
                <p className="font-bold text-xs md:text-sm uppercase tracking-widest text-emerald-400">
                  Published
                </p>
                <p className="text-3xl font-bold text-white">
                  {published === null ? "-" : published}
                </p>
              </div>
              <div className="h-[50%] w-[47%] md:h-[90%] md:w-[24%] flex flex-col justify-center items-center gap-2 border rounded-lg border-zinc-700 border-[3px] rounded-lg ">
                <p className="font-bold text-xs md:text-sm uppercase tracking-widest text-rose-600">
                  Rejected
                </p>
                <p className="text-3xl font-bold text-white">
                  {rejected === null ? "-" : rejected}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[100vw] h-1 my-3">
            <div className=" ml-3 w-[95vw] md:w-[97vw] h-[1px] border-t rounded-lg border-zinc-600"></div>
          </div>

          {blogSubmissions.length === 0 && (
            <>
              <div className="w-[100vw] min-h-[50vh] flex flex-col gap-5 justify-center items-center ">
                <p className="text-3xl font-semi-bold text-white">
                  No pending blogs!
                </p>
              </div>
            </>
          )}

          {blogSubmissions.length > 0 && (
            <div
              className="w-[100vw] min-h-[60vh] 
          
           flex flex-col gap-5 justify-start pl-3"
            >
              {blogSubmissions.map((element, index) => (
                <AdminSubmissionCard
                  key={element.blogId}
                  blogId={element.blogId}
                  index={index}
                  title={element.title}
                  authorName={element.authorName}
                  setBlogSubmissions={setBlogSubmissions}
                  createdAt={new Date(element.createdAt).toLocaleDateString(
                    "en-GB",
                  )}
                />
              ))}
            </div>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
}
