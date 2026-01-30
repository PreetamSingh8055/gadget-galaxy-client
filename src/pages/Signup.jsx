import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import signup from "../../Lottie/signup.json";
import { Link, useNavigate } from "react-router-dom";
import API from "@/API/Interceptor";
import toast from "react-hot-toast";

const Signup = () => {
  const [seen, setSeen] = useState(false);
  const [confirmSeen, setConfirmSeen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [formData, setFormdData] = useState({
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signupfunction = async (formData) => {
    try {
      const response = await API.post("/auth/signup", formData);
      if (response.status === 201) {
        toast.success(response.data.message || "User created successfully");
        navigate("/signin");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setConfirm("Confirm password should be same");
    } else {
      setConfirm("");
      signupfunction(formData);
      setFormdData({
        email: "",
        password: "",
        userName: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row rounded-xl p-4 sm:p-6 shadow-xl shadow-blue-400 max-w-4xl w-full bg-white">
        
        {/* LEFT (Lottie) */}
        <div className="flex justify-center md:justify-start">
          <Lottie
            animationData={signup}
            loop={true}
            className="h-40 w-40 sm:h-60 sm:w-60 md:h-[18rem] md:w-[18rem]"
          />
        </div>

        {/* RIGHT (Form) */}
        <div className="p-4 sm:p-6 md:border-l border-blue-400 flex-1">
          <h1 className="mb-6 text-center md:text-left font-serif text-lg sm:text-xl">
            Explore Gadget Shop & connect with us
          </h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {/* EMAIL */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="text-sm sm:min-w-[120px]">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                type="email"
                placeholder="Enter your Email"
              />
            </div>

            {/* USERNAME */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="text-sm sm:min-w-[120px]">Username</label>
              <input
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                type="text"
                placeholder="Enter your Username"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 relative">
              <label className="text-sm sm:min-w-[120px]">Password</label>
              <input
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="border border-gray-400 rounded-md p-2 w-full pr-10"
                type={seen ? "text" : "password"}
                placeholder="Enter your Password"
              />
              <div className="absolute right-3 top-[55%] sm:top-1/2 -translate-y-1/2 cursor-pointer text-gray-600">
                {seen ? (
                  <Eye onClick={() => setSeen(false)} />
                ) : (
                  <EyeOff onClick={() => setSeen(true)} />
                )}
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 relative">
              <label className="text-sm sm:min-w-[120px]">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                className="border border-gray-400 rounded-md p-2 w-full pr-10"
                type={confirmSeen ? "text" : "password"}
                placeholder="Confirm your Password"
              />
              <div className="absolute right-3 top-[55%] sm:top-1/2 -translate-y-1/2 cursor-pointer text-gray-600">
                {confirmSeen ? (
                  <Eye onClick={() => setConfirmSeen(false)} />
                ) : (
                  <EyeOff onClick={() => setConfirmSeen(true)} />
                )}
              </div>
            </div>

            {/* ERROR */}
            {confirm && (
              <p className="text-red-400 text-sm text-center">{confirm}</p>
            )}

            {/* BUTTON */}
            <button
              className="mt-4 px-5 py-2 border border-purple-500 rounded-lg bg-gradient-to-b from-purple-400 to-blue-300 cursor-pointer w-full sm:w-[14rem] self-center"
              type="submit"
            >
              Sign Up
            </button>

            {/* LINK */}
            <p className="text-xs text-center mt-2">
              Already have an account?{" "}
              <Link className="text-blue-500 cursor-pointer" to="/signin">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
