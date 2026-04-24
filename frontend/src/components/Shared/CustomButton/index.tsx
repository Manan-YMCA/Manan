import React from "react";
import "./style.css";

const CustomButton = (props) => {
  return (
    <div className={props.className}>
      <button onClick={props.onClick} className="Button" type="submit">
        {props.children}
      </button>
    </div>
  );
};

export default CustomButton;
