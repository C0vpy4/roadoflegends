import React from "react";

export const DownButton = (text: string, className: string = "") => {
  return (
    <div className={`bg-[#6EFF3E] bg-opacity-60 ${className}`}>{text}</div>
  );
};
