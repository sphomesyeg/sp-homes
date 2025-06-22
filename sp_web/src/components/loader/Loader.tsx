"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-48 w-full">
      <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
