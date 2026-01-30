import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import lapi from "../assets/hpPavilion.jpg";
import toy from "../assets/toy1.jpg";
import book from "../assets/alchemist.jpg";
import tablet from "../assets/tablet.webp";
import headphone from "../assets/headphones.avif";
import watch from "../assets/watch.jpg";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import Products from "@/common/Products";
import Aboutus from "./Aboutus";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swiperDetails = [
    {
      title: "Toys",
      image: toy,
      description:
        "Fun and creative toys for kids of all ages to enjoy and learn while playing.",
    },
    {
      title: "Laptops",
      image: lapi,
      description:
        "High-performance laptops built for productivity, gaming, and entertainment.",
    },
    {
      title: "Books",
      image: book,
      description:
        "A wide range of books across genres to inspire curiosity and imagination.",
    },
    {
      title: "Tablets",
      image: tablet,
      description:
        "Portable tablets designed for reading, gaming, and on-the-go work.",
    },
    {
      title: "Watches",
      image: watch,
      description:
        "Stylish and modern watches to match your look and lifestyle.",
    },
    {
      title: "Headphones",
      image: headphone,
      description:
        "Premium sound quality headphones offering immersive music experience.",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 bg-black text-white min-h-[90vh] overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(128,0,255,0.2),_transparent_70%)] animate-pulse-slow" />

        {/* Swiper */}
        <div className="w-full md:w-[35rem] flex justify-center z-10">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="
              mySwiper
              w-[260px] h-[360px]
              sm:w-[320px] sm:h-[420px]
              md:w-[480px] md:h-[580px]
            "
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          >
            {swiperDetails.map((item, index) => (
              <SwiperSlide
                key={index}
                className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(128,90,213,0.5)]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Info Card */}
        <div className="
          backdrop-blur-xl
          bg-gradient-to-br from-purple-900/50 via-purple-800/40 to-black/50
          border border-purple-500/30
          rounded-3xl
          shadow-[0_0_60px_rgba(168,85,247,0.25)]
          p-6 sm:p-8 md:p-12
          w-full md:w-[38rem]
          text-center
          hover:shadow-purple-600/40
          transition-all duration-500
          z-10
        ">
          <h1 className="
            text-3xl sm:text-4xl md:text-6xl
            font-extrabold
            text-purple-400
            drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]
            mb-4 sm:mb-6
            tracking-wide
          ">
            {swiperDetails[currentIndex].title}
          </h1>

          <p className="
            text-gray-300
            text-sm sm:text-base md:text-xl
            leading-relaxed
            max-w-[32rem]
            mx-auto
          ">
            {swiperDetails[currentIndex].description}
          </p>

          <button
            className="
              mt-6 sm:mt-8 md:mt-10
              px-6 sm:px-8
              py-3 sm:py-4
              bg-gradient-to-r from-purple-600 to-indigo-700
              rounded-2xl
              text-white
              font-semibold
              shadow-md
              hover:from-purple-700 hover:to-indigo-800
              hover:shadow-purple-500/50
              transition-all duration-300
              text-sm sm:text-base md:text-lg
            "
          >
            Explore {swiperDetails[currentIndex].title}
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <Products />

      {/* ABOUT */}
      <Aboutus />
    </>
  );
};

export default Home;
