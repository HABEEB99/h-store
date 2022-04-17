import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchBar = () => {
  return (
    <div className="z-[9999] flex items-center w-80 h-12 px-2 space-x-2 bg-plain absolute top-[11vh] right-4 sm:right-6 md:right-12 lg:right-32 border-4 rounded-full border-logo">
      <input
        type="text"
        className="outline-none flex-1 bg-transparent text-white"
      />
      <BsSearch className="text-logo text-lg font-extrabold" />
    </div>
  );
};

export default SearchBar;
