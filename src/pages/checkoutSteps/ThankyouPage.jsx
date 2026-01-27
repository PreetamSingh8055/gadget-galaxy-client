import React from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";

const ThankyouPage = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-4">
      {/* Confetti */}
      <Confetti width={width} height={height} numberOfPieces={350} />

      {/* Card */}
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center animate-fadeIn drop-shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-600 text-white w-20 h-20 flex items-center justify-center rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Thank You For Your Order!
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Your order has been placed successfully. You can track it anytime in{" "}
          <span className="font-semibold text-purple-700">My Orders</span>.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition-all">
              Go to Home
            </button>
          </Link>

          <Link to="/my-orders">
            <button className="cursor-pointer px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow hover:bg-gray-300 transition-all">
              My Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankyouPage;
