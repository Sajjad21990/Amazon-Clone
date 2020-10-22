import React from "react";
import "./CustomButton.css";

const CustomButton = ({ handleClick, title }) => {
  return (
    <div>
      <button onClick={handleClick} className="custom-btn">
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
