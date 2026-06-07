import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Loader from "../Loader";
//import'./style.css';

const LoadingScreen = (props) => {
  return (
    <React.Fragment>
      <div
        className="z-50 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-screen w-screen fixed inset-0"
      >
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoadingScreen;
