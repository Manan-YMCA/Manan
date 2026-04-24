import React from "react";
import "./style.css";
import {FaCode} from "react-icons/fa"
import { AiFillCode } from "react-icons/ai";
import {
  SiCodeigniter,
  SiVisualstudiocode,
  SiCodechef,
  SiCodecademy,
} from "react-icons/si";

const BackgroundIcons = (props) => {
  return (
    <React.Fragment>
      <div className="absolute w-full h-full top-0 left-0 text-gray-400/30 dark:text-gray-100/50">
        <div className="absolute top-[20%] left-[20%] h-[5rem] w-[5rem] FloatOne">
          <FaCode className="w-[5rem] h-[5rem]" />
        </div>
        <div className="absolute top-[35%] right-[10%] FloatThree">
          <AiFillCode className="w-[5rem] h-[5rem]" />
        </div>
        <div className="absolute top-[25%] right-[30%] FloatOne">
          <SiCodeigniter className="w-[5rem] h-[5rem]" />
        </div>
        <div className="absolute top-[70%] left-[10%] FloatTwo">
          <SiVisualstudiocode className="w-[5rem] h-[5rem]" />
        </div>
        <div className="absolute top-[75%] left-[35%] FloatThree">
          <SiCodecademy className="w-[5rem] h-[5rem]" />
        </div>
        <div className="absolute top-[80%] right-[20%] FloatTwo">
          <SiCodechef className="w-[5rem] h-[5rem]" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BackgroundIcons;
