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
        toast.success(response.data.message || "User created successfuly");
        navigate("/signin");
      }
      console.log(response);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      console.log("err", err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.confirmPassword &&
      formData.password != formData.confirmPassword
    ) {
      setConfirm("confirm password should be same");
    } else {
      setFormdData({
        email: "",
        password: "",
        userName: "",
        confirmPassword: "",
      });
      setConfirm("");
      console.log(formData);
      signupfunction(formData);
    }
  };

  return (
    <div className="flex items-center justify-center p-5 h-[80vh]">
      <div className=" flex rounded-lg p-2 shadow-xl shadow-blue-400">
        <div className="left">
          <Lottie
            animationData={signup}
            loop={true}
            className="h-[18rem] w-[18rem]"
          />
        </div>
        <div className=" p-5 border-l-1 border-blue-400 ">
          <h1 className="mb-5 font-serif ">
            Explore Gadget Shop & connect with us
          </h1>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex items-center justify-between">
              <label htmlFor="">Email:</label>
              <input
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                className="border-1 border-gray-400 rounded-sm p-2"
                type="email"
                placeholder="Enter your Email"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="">UserName:</label>
              <input
                name="userName"
                value={formData.userName}
                onChange={(e) => handleChange(e)}
                className="border-1 border-gray-400 rounded-sm p-2"
                type="text"
                placeholder="Enter your UserName"
              />
            </div>

            <div className="flex items-center justify-between relative">
              <label htmlFor="">Password:</label>
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

            <div className="flex items-center justify-between relative">
              <label htmlFor="">Confirm Password:</label>
              <input
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                value={formData.confirmPassword}
                className="border-1 border-gray-400 rounded-sm p-2"
                type={confirmSeen ? "text" : "password"}
                placeholder="Confirm your Password"
              />
              {confirmSeen ? (
                <div className="absolute right-1">
                  <Eye onClick={() => setConfirmSeen(!confirmSeen)} />
                </div>
              ) : (
                <div className="absolute right-1">
                  <EyeOff onClick={() => setConfirmSeen(!confirmSeen)} />
                </div>
              )}
            </div>
            <p className="text-end text-red-300">{confirm && confirm}</p>
            <button
              className="px-5 py-1 border-1 border-purple-500 rounded-lg bg-gradient-to-b from-purple-400 to-blue-300  cursor-pointer min-w-[12rem]"
              type="submit"
            >
              {" "}
              Sign Up
            </button>
            <p className="text-[12px] text-center">
              Already Have Account?{" "}
              <Link className="text-blue-400 cursor-pointer" to="/signin">
                SignIn
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
