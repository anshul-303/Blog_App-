import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRole } from "../contexts/roleContexts.jsx";
import { useAuth } from "../contexts/authContext.jsx";
import { BookOpen, LogOut } from "lucide-react";
import { LogoutUser } from "../api/authApi/authApi.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const url = import.meta.env.VITE_APP_API_URL;

  return (
    // <nav className="fixed w-full bg-black text-white px-6 py-4 flex items-center justify-between">
    // <nav className="sticky top-0 z-50 w-full bg-black text-white px-6 py-4 flex items-center justify-between">
    <nav className=" w-full bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-xl font-bold"
        onClick={() => {
          navigate("/home");
        }}
      >
        Chronicle{" "}
        <BookOpen className="inline w-7 h-7 font-bold pb-0.5 text-size-xl" />
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 font-medium text-[1.1em] text-zinc-500">
        {role === "author" && (
          <>
            <li className="underline">
              <Link to="/home">Home</Link>
            </li>
            <li className="underline">
              <Link to="/dashboard"> Dashboard</Link>
            </li>
            <li className="underline">
              <Link to="/create-blog">Create</Link>
            </li>
            <button
              className="border rounded-sm text-zinc-400 bg-zinc-800 px-4 active:bg-zinc-700 hover:bg-zinc-900 transition duration-700"
              onClick={() => {
                LogoutUser(navigate, setIsAuthenticated, setRole);
              }}
            >
              <LogOut className="inline w-5 h-5 pb-1" /> Logout
            </button>
          </>
        )}

        {role === "admin" && (
          <>
            <li className="underline">
              <Link to="/admin/users">Users</Link>
            </li>
            <li className="underline">
              <Link to="/admin/submissions">Submissions</Link>
            </li>

            <li className="underline">
              <Link to="/admin/requests">Requests</Link>
            </li>
            <button
              className="border rounded-sm text-zinc-400 bg-zinc-800 px-4 active:bg-zinc-700 hover:bg-zinc-900 transition duration-700"
              onClick={() => {
                LogoutUser(navigate, setIsAuthenticated, setRole);
              }}
            >
              <LogOut className="inline w-5 h-5 pb-1" /> Logout
            </button>
          </>
        )}

        {role === "viewer" && (
          <>
            <li className="underline">
              <Link to="/home">Home</Link>
            </li>
            <li className="underline">
              <Link to="/menu">Menu</Link>
            </li>
            <button
              className="border rounded-sm text-zinc-400 bg-zinc-800 px-4 active:bg-zinc-700 hover:bg-zinc-900 transition duration-700"
              onClick={() => {
                LogoutUser(navigate, setIsAuthenticated, setRole);
              }}
            >
              <LogOut className="inline w-5 h-5 pb-1" /> Logout
            </button>
          </>
        )}
      </ul>

      {/* Hamburger (Mobile) */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-2/3 bg-black p-6 transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button className="mb-6" onClick={() => setOpen(false)}>
          ✕
        </button>

        <ul className="flex flex-col gap-6 text-lg">
          {role === "author" && (
            <>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/home">Home</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/create-blog">Create</Link>
              </li>
              <button
                className="border rounded-sm text-zinc-400 bg-zinc-800  px-2 md:px-4 active:bg-zinc-700 hover:bg-zinc-900 transition duration-700"
                onClick={() => {
                  LogoutUser(navigate, setIsAuthenticated, setRole);
                }}
              >
                <LogOut className="inline w-5 h-5 pb-1" /> Logout
              </button>
            </>
          )}

          {role === "viewer" && (
            <>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/home">Home</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/menu">Menu</Link>
              </li>
              <button
                className="border rounded-sm text-zinc-400 bg-zinc-800 px-4 active:bg-zinc-700 hover:bg-zinc-900 transition duration-700"
                onClick={() => {
                  LogoutUser(navigate, setIsAuthenticated, setRole);
                }}
              >
                <LogOut className="inline w-5 h-5 pb-1" /> Logout
              </button>
            </>
          )}

          {role === "admin" && (
            <>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/admin/users">Users</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/admin/submissions">Submissions</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/admin/requests">Requests</Link>
              </li>
              <button
                className="border rounded-sm text-zinc-400 bg-zinc-800 px-2 md:px-4 active:bg-zinc-700 hover:bg-zinc-900 transition duration-700"
                onClick={() => {
                  LogoutUser(navigate, setIsAuthenticated, setRole);
                }}
              >
                <LogOut className="inline w-5 h-5 pb-1" /> Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
