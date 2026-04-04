import toast from "react-hot-toast";
const URL = import.meta.env.VITE_APP_API_URL;

export async function AddBlogToDB(
  title,
  summary,
  blogBody,
  headImageURL,
  action,
  navigate,
) {
  try {
    if (!title || !summary || !headImageURL || !blogBody || !action) {
      toast.error("All fields are mandatory!");
      return;
    }
    const res = await fetch(`${URL}/author/`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: action,
        blogBody: blogBody,
        headImageURL: headImageURL,
        title: title,
        summary: summary,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data.message);
      navigate("/home");
      return;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return AddBlogToDB(
          title,
          summary,
          blogBody,
          headImageURL,
          action,
          navigate,
        );
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function getDrafts() {
  try {
    const res = await fetch(`${URL}/author/drafts`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.drafts);
      return await data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getDrafts();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function getSubmitted() {
  try {
    const res = await fetch(`${URL}/author/submitted`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.submitted);
      return await data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getSubmitted();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}
