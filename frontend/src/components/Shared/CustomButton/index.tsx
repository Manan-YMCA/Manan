import React from "react";
import "./style.css";

const CustomButton = (props) => {
  return (
    <div className={props.className}>
      <button
        onClick={props.onClick}
        className="Button"
        type={props.type || "button"}
        disabled={props.disabled || props.isDisabled}
      >
        {props.children}
      </button>
    </div>
  );
};

export default CustomButton;
