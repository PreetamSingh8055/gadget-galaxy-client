import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import register from "../../Lottie/register.json";
import { Link, useNavigate } from "react-router-dom";
import { loginapi } from "@/API/Interceptor";
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
    <div className="flex items-center justify-center p-5 h-[80vh]">
      <div className=" flex rounded-lg p-2 shadow-xl shadow-blue-400">
        <div className="left">
          <Lottie
            animationData={register}
            loop={true}
            className="h-[18rem] w-[18rem]"
          />
        </div>
        <div className=" p-5 border-l-1 border-blue-400 ">
          <h1 className="mb-5 font-serif ">
            Welcome Back, Signin Here to Continue
          </h1>
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex items-center  gap-12">
              <label htmlFor="">Email:</label>
              <input
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                className="border-1 border-gray-400 rounded-sm p-2"
                type="text"
                placeholder="Enter your Email"
              />
            </div>

            <div className="flex items-center relative gap-5 ">
              <label htmlFor="">password:</label>
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                value={formData.password}
                className="border-1 border-gray-400 rounded-sm p-2"
                type={seen ? "text" : "password"}
                placeholder="Enter your Password"
              />
              {seen ? (
                <div className="absolute right-1">
                  <Eye onClick={() => setSeen(!seen)} />
                </div>
              ) : (
                <div className="absolute right-1">
                  <EyeOff onClick={() => setSeen(!seen)} />
                </div>
              )}
            </div>
            <button
              className="px-5 py-1 border-1 border-purple-500 rounded-lg bg-gradient-to-b from-purple-400 to-blue-300  cursor-pointer min-w-[12rem]"
              type="submit"
            >
              {" "}
              Signin
            </button>
            <p className="text-[12px]">
              Don't Have Account?{" "}
              <Link className="text-blue-400 cursor-pointer" to="/signup">
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
