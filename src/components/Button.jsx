import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border"
    >
      {children}
    </button>
  );
};

export default Button;
