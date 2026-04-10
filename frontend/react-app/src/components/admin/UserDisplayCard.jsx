import React from "react";

const UserDisplayCard = ({ userId, name, role, email }) => {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase();
  };

  // Role color styling
  const roleStyles = {
    admin: "bg-zinc-700 text-zinc-200",
    author: "bg-green-900 text-green-400",
    viewer: "bg-zinc-800 text-zinc-400",
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-7 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-all duration-200">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-300">
          {getInitials(name)}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h2 className="text-white font-semibold text-lg">{name}</h2>
          <p className="text-zinc-400 text-sm">{email}</p>
        </div>
      </div>

      {/* Role Badge */}
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
          roleStyles[role] || "bg-zinc-800 text-zinc-400"
        }`}
      >
        {role}
      </div>
    </div>
  );
};

export default UserDisplayCard;