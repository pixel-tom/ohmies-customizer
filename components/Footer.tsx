import React from "react";
import { VT323 } from "next/font/google";

const inter = VT323({
  subsets: ["latin"],
  weight: "400",
});

const Footer = () => {
  return (
    <nav
      className={`${inter.className} flex justify-between items-center px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 bg-none`}
    >
      <div />
      <div />
      <p className="text-gray-600">
        © All rights reserved by ohmies. By @_ohmies.
      </p>
    </nav>
  );
};

export default Footer;
