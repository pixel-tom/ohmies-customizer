import React from "react";
import { VT323 } from "next/font/google";

const vt = VT323({
  subsets: ["latin"],
  weight: "400",
});

const Footer = () => {
  return (
    <nav
      className={`${vt.className} flex justify-between items-center px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 bg-none`}
    >
      <div />
      <div />
      <p className="text-gray-600">
        © All rights reserved by The Doge Capital. By @thedogecapital.
      </p>
    </nav>
  );
};

export default Footer;
