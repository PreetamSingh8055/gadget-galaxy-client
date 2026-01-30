import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="px-4 py-4 sm:py-3 bg-gradient-to-r from-gray-900 to-blue-200">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center text-center text-sm sm:text-base">
        <span>Copyright reserved by Gadget Shop</span>
        <Copyright size={16} />
        <span>{year}</span>
      </div>
    </footer>
  );
};

export default Footer;
