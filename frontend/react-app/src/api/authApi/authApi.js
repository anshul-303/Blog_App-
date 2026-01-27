import toast from "react-hot-toast";

const URL = import.meta.env.VITE_APP_API_URL;

export async function SignupUser(
  firstName,
  lastName,
  email,
  password,
  navigate,
) {
  try {
    const res = await fetch(`${URL}/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log();
      toast.success(data.message);
      navigate("/login");
    } else {
      throw Error("Internal server error!");
    }
  } catch (error) {
    console.log("Error detected! : ", error);
    toast.error(data.message);
  }
}

export async function LoginUser(
  email,
  password,
  navigate,
  setIsAuthenticated,
  setRole,
) {
  try {
    const res = await fetch(`${URL}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(data.message);
      setIsAuthenticated(true);
      setRole(data.role);
      navigate("/menu");
    } else {
      throw Error("Internal server error!");
    }
  } catch (error) {
    console.log("Error detected! : ", error);
    toast.error(data.message);
  }
}

export async function LogoutUser(navigate, setIsAuthenticated, setRole) {
  try {
    const res = await fetch(`${URL}/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(data.message);
      setIsAuthenticated(false);
      setRole("");
      navigate("/login");
    } else {
      throw Error("Internal server error!");
    }
  } catch (error) {
    console.log("Error detected! : ", error);
    toast.error(data.message);
  }
}

export async function checkAuth(navigate, setIsAuthenticated, setRole) {
  const res = await fetch(`${URL}/auth/check-auth`, {
    credentials: "include",
    method: "GET",
  });
  if (res.ok) {
    const data = await res.json();
    setRole(data.role);
    setIsAuthenticated(true);
    return;
  } else if (res.status === 401 || res.status === 403) {
    //Case 1: The refresh token exists but accesstoken expires (response is from verifyJwt)
    //Case 2: The refresh and access token both dont exist(response is from getNewAccessTOken)
    const newres = await fetch(`${URL}/auth/refresh`, {
      credentials: "include",
      method: "GET",
    });

    if (newres.ok) {
      return checkAuth(navigate, setIsAuthenticated, setRole);
    } else {
      navigate("/login");
      return;
    }
  }
}
