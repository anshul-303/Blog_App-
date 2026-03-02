import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRole } from "../contexts/roleContexts.jsx";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { role, setRole } = useRole();

  return (
    // <nav className="fixed w-full bg-black text-white px-6 py-4 flex items-center justify-between">
    // <nav className="sticky top-0 z-50 w-full bg-black text-white px-6 py-4 flex items-center justify-between">
    <nav className=" w-full bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold">BlogIT</div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 font-medium text-[1.1em] text-zinc-500">
        {role === "author" && (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li className="">
              <Link to="/my-blogs"> My Blogs</Link>
            </li>
            <li className="pr-2">
              <Link to="/create-blog">Create</Link>
            </li>
            <li className="">
              <Link to="/blogs/liked">
                <span className="text-rose-600">♡ </span> Liked Blogs
              </Link>
            </li>
            <li className="">
              <Link to="/menu">Menu</Link>
            </li>
          </>
        )}

        {role === "admin" && (
          <>
            <li className="underline">
              <Link to="/admin/users">All Users</Link>
            </li>
            <li className="underline">
              <Link to="/admin/blogs">All blogs</Link>
            </li>

            <li className="underline">
              <Link to="/admin/requests">Admin Requests</Link>
            </li>
            <li className="underline">
              <Link to="/menu">Menu</Link>
            </li>
          </>
        )}

        {role === "viewer" && (
          <>
            <li className="underline">
              <Link to="/home">Home</Link>
            </li>
            <li className="underline">
              <Link to="/blogs/liked">Liked Blogs</Link>
            </li>
            <li className="underline">
              <Link to="/menu">Menu</Link>
            </li>
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
                <Link to="/my-blogs">My Blogs</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/create-blog">Create</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/blogs/liked">Liked Blogs</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/menu">Menu</Link>
              </li>
            </>
          )}

          {role === "viewer" && (
            <>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/home">Home</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/blogs/liked">Liked Blogs</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/menu">Menu</Link>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/admin/users">All Users</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/admin/blogs">All blogs</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/admin/requests">Admin Requests</Link>
              </li>
              <li className="underline" onClick={() => setOpen(false)}>
                <Link to="/menu">Menu</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
