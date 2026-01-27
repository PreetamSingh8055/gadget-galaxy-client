import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className="p-3 bg-gradient-to-r from-gray-900 to-blue-200 flex gap-2 items-center justify-center min-h-[5rem]">
        <div>Copyright reserved by Gadget Shop</div>
        <Copyright />
        {year}
      </footer>
    </>
  );
};

export default Footer;
