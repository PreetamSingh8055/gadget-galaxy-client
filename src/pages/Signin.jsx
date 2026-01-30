import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import register from "../../Lottie/register.json";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/AuthContext";

const Signin = () => {
  const [seen, setSeen] = useState(false);
  const [formData, setFormdData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setFormdData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    if (response) {
      navigate("/");
    }
    setFormdData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row rounded-xl p-4 sm:p-6 shadow-xl shadow-blue-400 max-w-3xl w-full bg-white">
        
        {/* LEFT (Lottie) */}
        <div className="flex justify-center md:justify-start">
          <Lottie
            animationData={register}
            loop={true}
            className="h-40 w-40 sm:h-60 sm:w-60 md:h-[18rem] md:w-[18rem]"
          />
        </div>

        {/* RIGHT (Form) */}
        <div className="p-4 sm:p-6 md:border-l border-blue-400 flex-1">
          <h1 className="mb-6 text-center md:text-left font-serif text-lg sm:text-xl">
            Welcome Back, Sign in to Continue
          </h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            {/* EMAIL */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="text-sm sm:min-w-[70px]">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-400 rounded-md p-2 w-full"
                type="text"
                placeholder="Enter your Email"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 relative">
              <label className="text-sm sm:min-w-[70px]">Password</label>
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

            {/* BUTTON */}
            <button
              className="mt-4 px-5 py-2 border border-purple-500 rounded-lg bg-gradient-to-b from-purple-400 to-blue-300 cursor-pointer w-full sm:w-[12rem] self-center"
              type="submit"
            >
              Sign In
            </button>

            {/* LINK */}
            <p className="text-xs text-center mt-2">
              Don't have an account?{" "}
              <Link className="text-blue-500 cursor-pointer" to="/signup">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
