import React from "react";
import { AiFillHeart } from "react-icons/ai";
import MananLogo from "../../assets/manan-logo.png";
import SocialLinks from "./SocialLinks";
import "./style.css";

const Footer = () => {
  return (
    <div className="w-screen bg-white/[0.25] dark:bg-black/[0.25] filter backdrop-blur-sm mt-12 md:mt-16">
      <div className="flex justify-center items-center TextColorBasic pb-2 pt-4">
        <SocialLinks />
      </div>
      <div className="flex justify-center items-center text-[#fb5343] text-[20px] font-bold">
        <img className="w-7 h-7 mr-3" src={MananLogo} alt="manan" />
        Manan - A Techno Surge
      </div>

      <div className="flex justify-center items-center text-[18px] pb-[7px] TextColorBasic dark:text-gray-400">
        {"\u00A9"} {new Date().getFullYear()}, Made with &nbsp;
        <AiFillHeart className="Heart text-red-700" />
        &nbsp; Code and Coffee
      </div>
    </div>
  );
};

export default Footer;
