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
