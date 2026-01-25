import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("The signup button is clicked!");
  };

  return (
    <div className="w-screen min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="pt-2 pb-5 gap-4 min-h-[50vh] w-[80vw] md:min-h-[40vh] md:w-[60vw] lg:min-h-[75vh] lg:w-[30vw] border border-[6px] border-zinc-800 rounded-lg flex items-center flex-col justify-top "
      >
        <h4 className="text-[2rem] font-bold tracking-tight text-white text-center ">
          Sign Up
        </h4>
        <div className="h-auto w-[95%] flex flex-col justify-center items-center  p-1 gap-2">
          <label className="text-[1em]">First Name</label>
          {errors.firstName && (
            <p className="text-center text-rose-400 text-[0.75em]">
              {errors.firstName}
            </p>
          )}
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            required
            placeholder="Enter your first name"
            className="text-center w-[80%] border rounded-sm text-[1.3em] 
            transition-all duration-300 ease-in-out
            hover:border-gray-400
            focus:outline-none 
            focus:border-black 
            focus:ring-2 focus:ring-gray-100
            focus:scale-[1.02]
            "
          />
        </div>
        <div className="h-auto w-[95%] flex flex-col justify-center items-center  p-1 gap-2">
          <label className="text-[1em]">Last Name</label>
          {errors.lastName && (
            <p className="text-center text-rose-400 text-[0.75em]">
              {errors.lastName}
            </p>
          )}
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            required
            placeholder="Enter your last name"
            className="text-center w-[80%] border rounded-sm text-[1.3em]  
            
            transition-all duration-300 ease-in-out
            hover:border-gray-400
            focus:outline-none 
            focus:border-black 
            focus:ring-2 focus:ring-gray-100
            focus:scale-[1.02]"
          />
        </div>
        <div className="h-auto w-[95%] flex flex-col justify-center items-center  p-1 gap-2">
          <label className="text-[1em]">Email</label>
          {errors.email && (
            <p className="text-center text-rose-400 text-[0.75em]">
              {" "}
              {errors.email}
            </p>
          )}
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            placeholder="Enter your email"
            className="text-center w-[80%] border rounded-sm text-[1.3em]  
            
            transition-all duration-300 ease-in-out
            hover:border-gray-400
            focus:outline-none 
            focus:border-black 
            focus:ring-2 focus:ring-gray-100
            focus:scale-[1.02]"
          />
        </div>
        <div className="h-auto w-[95%] flex flex-col justify-center items-center  p-1 gap-2">
          <label className="text-[1em]">Password</label>
          {errors.password && (
            <p className="text-center text-rose-400 text-[0.75em]">
              {errors.password}
            </p>
          )}
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
            placeholder="Enter your password"
            className="text-center w-[80%] border rounded-sm text-[1.3em] 
            
            transition-all duration-300 ease-in-out
            hover:border-gray-400
            focus:outline-none 
            focus:border-black 
            focus:ring-2 focus:ring-gray-100
            focus:scale-[1.02]"
          />
        </div>
        <button
          className="w-[45%] p-1 border rounded-sm hover:bg-zinc-800 active:bg-zinc-700
          active:scale-[1.02] transition-transform duration-200
          "
          type="submit"
        >
          Signup
        </button>
        <div className="text-[0.9rem]  text-center ">
          Already have an account ? Click{" "}
          <Link to="/login" className="underline hover:text-zinc-500">
            here
          </Link>{" "}
          to login!
        </div>
      </form>
    </div>
  );
}
