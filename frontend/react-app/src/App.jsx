import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import { Toaster } from "react-hot-toast";
import MenuPage from "./pages/MenuPage.jsx";
import NotAllowed from "./pages/NotAllowed.jsx";
import CreateBlog from "./pages/author/CreateBlog.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/author/Dashboard.jsx";
import Submissions from "./pages/admin/Submissions.jsx";
import Requests from "./pages/admin/Requests.jsx";
import Users from "./pages/admin/Users.jsx";
import BlogListAdmin from "./pages/admin/BlogListAdmin.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import EditDraft from "./pages/author/EditDraft.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster
          toastOptions={{
            // Default style for all toasts
            style: {
              background: "#fff",
              color: "#333",
              border: "1px solid #e2e8f0", // Light grey border for a premium feel
              padding: "16px",
              borderRadius: "10px",
            },
            // Customize the icons' colors specifically
            success: {
              iconTheme: {
                primary: "#10B981", // Emerald green tick
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444", // Bright red cross
                secondary: "#fff",
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-draft/:id" element={<EditDraft />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/submissions" element={<Submissions />} />
          <Route path="/admin/requests" element={<Requests />} />
          <Route path="/admin/blogs" element={<BlogListAdmin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/403" element={<NotAllowed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
