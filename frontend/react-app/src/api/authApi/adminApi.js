const URL = import.meta.env.VITE_APP_API_URL;

export async function getSubmissions() {
  try {
    const res = await fetch(`${URL}/admin/submissions`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.message);
      return data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getSubmissions();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function updateBlogStatus(blogId, status, setBlogSubmissions) {
  try {
    const res = await fetch(`${URL}/admin/submissions`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: blogId,
        status: status,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      //Here we fetch the new updated data to find the updated set of blogs after approving/rejecting some blog
      const blogSubmissions = await getSubmissions();
      // console.log(data.submissions);
      setBlogSubmissions(blogSubmissions.submissions);
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return updateBlogStatus(blogId, status, setBlogSubmissions);
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function getAdminSummary() {
  try {
    const res = await fetch(`${URL}/admin/submissions/summary`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data.message);
      return await data;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getAdminSummary();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function getAdminRoleChangeRequests() {
  try {
    const res = await fetch(`${URL}/admin/requests`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.rows);
      return await data;
      // return ;
    } else if (res.status === 401 || res.status === 403) {
      //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
      //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
      const newres = await fetch(`${URL}/auth/refresh`, {
        credentials: "include",
        method: "GET",
      });

      if (newres.ok) {
        return getAdminRoleChangeRequests();
      } else {
        navigate("/login");
        return;
      }
    }
  } catch (error) {
    console.log("Error detected : ", error);
  }
}

export async function handleAdminRoleChangeRequests(
  setRequestList,
  action,
  viewerId,
  requestId,
) {
  try {
    const res = await fetch(`${URL}/admin/requests`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: action,
        viewerId: viewerId,
        requestId: requestId,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      // console.log(data.message);

      const res2 = await getAdminRoleChangeRequests();
     
      setRequestList(res2.rows);
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
        return handleAdminRoleChangeRequests(
          setRequestList,
          action,
          viewerId,
          requestId,
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

//API call to decline or accept the user's request to be an author
