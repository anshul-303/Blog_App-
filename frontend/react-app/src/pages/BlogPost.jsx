import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { checkAuth } from "../api/authApi/authApi";
import { useRole } from "../contexts/roleContexts.jsx";
import { ArrowLeft, ThumbsUp, ThumbsDown, Send } from "lucide-react";

export default function BlogPost() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { role, setRole } = useRole();
  const url = import.meta.env.VITE_APP_API_URL;
  const { id } = useParams();

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
              How RTX-6090 will change the world of fast computing.
            </p>
            <p className="font-semi text-[1.3rem] text-zinc-500">
              A brief overview of how microprocessors and graphic cards play
              important role in AI powering.
            </p>
            <img
              src={"/image_placeholder.jpg"}
              alt="Head preview"
              className="w-[80%] h-[60%] object-cover transition-transform duration-300 hover:scale-[1.02] rounded-sm py-6"
            />
            <div className="flex gap-5">
              <p className="font-semi text-[1.1rem] text-zinc-500">
                👤 Rohit D'Souza
              </p>
              <p className="font-semi text-[1.1rem] text-zinc-500 ">
                📅 10 June,2026
              </p>
            </div>
            <div className="font text-[1.1rem] text-white whitespace-pre-line pb-6">
              The release of the NVIDIA RTX 6090 marks a turning point in how
              developers approach artificial intelligence. What once required
              expensive cloud infrastructure can now be done locally with
              unprecedented speed and efficiency. For years, training machine
              learning models was limited by hardware constraints.
              <br />
              <br />
              Developers had to rely heavily on cloud platforms, often dealing
              with latency, high costs, and limited control. With the RTX 6090,
              that barrier is starting to disappear. One of the biggest
              advantages of this GPU is its ability to handle large-scale AI
              workloads. Whether you're working with large language models,
              computer vision systems, or real-time inference engines, the
              performance gains are significant. Tasks that previously took
              hours can now be completed in minutes. Another major shift is in
              accessibility.
              <br />
              <br />
              Students and independent developers can now experiment with
              advanced AI models without needing enterprise-level resources.
              This democratization of AI could lead to a surge in innovation, as
              more people are able to build and test ideas locally. However,
              it’s not all perfect. High-end GPUs like the RTX 6090 are still
              expensive, and optimizing code to fully utilize such hardware
              requires a deep understanding of parallel computing and memory
              management.
              <br />
              <br />
              Simply having powerful hardware is not enough—you need to know how
              to use it effectively. From a development perspective, frameworks
              like PyTorch and TensorFlow are already evolving to take full
              advantage of next-generation GPUs. Features like mixed precision
              training and hardware acceleration are becoming standard. Looking
              ahead, the combination of powerful GPUs and smarter AI frameworks
              will redefine what individual developers can achieve. We are
              moving toward a future where building advanced AI systems is not
              limited to big tech companies but is accessible to anyone with the
              right skills and tools.
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
              <div className="w-full p-2 flex gap-4 ">
                <p className="w-10 flex justify-center items-center h-10 border rounded-full bg-zinc-800 ">
                  JM
                </p>
                <div className="flex justify-center items-start flex-col gap-0.5 ">
                  <p className="font-bold text-sm text-zinc-200">
                    Jeremy Wilson{" "}
                    <span className="text-sm  text-zinc-600 ml-2">
                      19/10/2020
                    </span>
                  </p>
                  <p className="text-zinc-300">
                    One of most insightful blogs in recent times which I have
                    read! border border-zinc-800
                  </p>
                </div>
              </div>

              <div className="w-full  p-2 flex gap-4 ">
                <p className="w-10 flex justify-center items-center h-10  border rounded-full bg-zinc-800 ">
                  JM
                </p>
                <div className="flex justify-center items-start flex-col gap-0.5 ">
                  <p className="font-bold text-sm text-zinc-200">
                    Jeremy Wilson{" "}
                    <span className="text-sm  text-zinc-600 ml-2">
                      19/10/2020
                    </span>
                  </p>
                  <p className="text-zinc-300">
                    One of most insightful blogs in recent times which I have
                    border border-zinc-800 border border-zinc-800 read!
                  </p>
                </div>
              </div>

              <div className="w-full  p-2 flex gap-4 ">
                <p className="w-10 flex justify-center items-center h-10  border rounded-full bg-zinc-800 ">
                  JM
                </p>
                <div className="flex justify-center items-start flex-col gap-0.5 ">
                  <p className="font-bold text-sm text-zinc-200">
                    Jeremy Wilson{" "}
                    <span className="text-sm  text-zinc-600 ml-2">
                      19/10/2020
                    </span>
                  </p>
                  <p className="text-zinc-300">
                    One of most insightful blogs in recent times which I have
                    read!
                  </p>
                </div>
              </div>
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
