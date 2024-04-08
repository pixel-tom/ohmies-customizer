import React from "react";
import { VT323 } from "next/font/google";

const inter = VT323({
  subsets: ["latin"],
  weight: "400",
});

import { Gloria_Hallelujah } from "next/font/google";


const Footer = () => {
  return (
    <nav className={`${inter.className} flex justify-between items-center px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-6 bg-none`}>
      <div />
      <div />
      <p>© All rights reserved by ohmies. By @_ohmies.</p>
    </nav>
  );
};

export default Footer;
