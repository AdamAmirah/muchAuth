import React from "react";

const Input = ({ ...props }) => {
  return (
    <input
      className="w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none"
      {...props}
    />
  );
};

export default Input;
