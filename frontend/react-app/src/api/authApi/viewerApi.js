import toast from "react-hot-toast";
const URL = import.meta.env.VITE_APP_API_URL;

export async function getBlogbyId(id) {
  try {
    const res = await fetch(`${URL}/viewer/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      //   console.log(data.blogData)
      return await data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getBlogbyId(id);
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function getCommentsById(id) {
  try {
    const res = await fetch(`${URL}/viewer/comments/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.rows)
      return await data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getCommentsById(id);
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function addComment(commentBody, blogId, setUserComment) {
  try {
    if (commentBody === "") {
      toast.error("The comment cannot be empty!");
      return;
    }
    const res = await fetch(`${URL}/viewer/comments/${blogId}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentBody: commentBody }),
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.rows);
      setUserComment("");
      return await data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return addComment(commentBody, blogId, setUserComment);
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function getReactionsById(
  id,
  setLikes,
  setDislikes,
  setUserReaction,
) {
  try {
    const res = await fetch(`${URL}/viewer/reactions/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.message);
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setUserReaction(data.userReaction);
      // return await data;
      return;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getReactionsById(id, setLikes, setDislikes, setUserReaction);
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function alterUserReaction(
  id,
  userReaction,
  setLikes,
  setDislikes,
  setUserReaction,
) {
  try {
    const res = await fetch(`${URL}/viewer/reactions/${id}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userReaction: userReaction }),
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.rows);
      getReactionsById(id, setLikes, setDislikes, setUserReaction);
      return;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return alterUserReaction(
          id,
          userReaction,
          setLikes,
          setDislikes,
          setUserReaction,
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

export async function getPublishedBlogs() {
  try {
    const res = await fetch(`${URL}/viewer/published`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.blogsList);
      return await data;
      return;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getPublishedBlogs();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}



export async function getRoleChangeRequests(setRoleChangeRequests) {
  try {
    const res = await fetch(`${URL}/viewer/role-change`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.requests);
      setRoleChangeRequests(data.requests);
      return await data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getRoleChangeRequests();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}



export async function roleChangeRequest(setRoleChangeRequests) {
  try {
    const res = await fetch(`${URL}/viewer/role-change`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      getRoleChangeRequests(setRoleChangeRequests);
      return;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return roleChangeRequest();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}