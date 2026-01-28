import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold">BlogIT</div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li className="underline">
          <Link to="/home">Home</Link>
        </li>
        <li className="underline">
          <Link to="/my-blogs">My Blogs</Link>
        </li>
        <li className="underline">
          <Link to="/create-blog">Create</Link>
        </li>
        <li className="underline">
          <Link to="/menu">Menu</Link>
        </li>
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
            <Link to="/menu">Menu</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
