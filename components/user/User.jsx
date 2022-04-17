import React, { useState } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

const User = () => {
  const [onlneUser, setOnlineUser] = useState(false);

  return (
    <div className="z-[9999]  flex flex-col items-center justify-center w-72 h-[6rem] space-x-2 bg-plain absolute top-[11vh] right-4 sm:right-6 md:right-12 lg:right-32 border-4 border-logo">
      {onlneUser ? (
        <button className="w-60 text-2xl flex items-center justify-center space-x-4 h-12 bg-red-700 text-white font-bold rounded-xl hover:bg-white hover:border-2 hover:border-red-700 hover:text-red-500">
          Logout
          <BiLogOutCircle />
        </button>
      ) : (
        <button className="w-60 text-2xl flex items-center justify-center space-x-4 h-12 bg-btn text-white font-bold rounded-xl hover:bg-white hover:text-btn hover:border-2 hover:border-btn">
          Login
          <BiLogInCircle />
        </button>
      )}
    </div>
  );
};

export default User;
