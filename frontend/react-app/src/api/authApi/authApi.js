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

