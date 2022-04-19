import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const Loader = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <BiLoaderAlt className="text-[20rem] text-btn animate-spin" />
      <h1 className="text-xl text-red-700 animate-pulse">
        Please check your internet connection
      </h1>
    </div>
  );
};

export default Loader;
