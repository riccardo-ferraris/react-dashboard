import React from "react";

const Button = ({ bgColor, color, size, text, borderRadius }) => {
  return (
    <button
      type="button"
      style={{ background: bgColor, color: color, borderRadius: borderRadius }}
      className={`text-${size} p-3 hover:drop-shadow-xl cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
