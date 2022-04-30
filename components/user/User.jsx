import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Cookies from 'js-cookie';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const User = () => {
  const router = useRouter();
  const {
    state: { userInfo },
    dispatch,
  } = useContext(StoreContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippingAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };
  return (
    <div className="z-[9999]  flex flex-col items-center justify-center w-72 h-[6rem] space-x-2 bg-plain absolute top-[11vh] right-4 sm:right-6 md:right-12 lg:right-32 border-4 border-logo">
      {userInfo ? (
        <button
          onClick={handleLogout}
          className="w-60 text-2xl flex items-center justify-center space-x-4 h-12 bg-red-700 text-white font-bold rounded-xl hover:bg-white hover:border-2 hover:border-red-700 hover:text-red-500"
        >
          Logout
          <BiLogOutCircle />
        </button>
      ) : (
        <Link href="/login">
          <a>
            <button className="w-60 text-2xl flex items-center justify-center space-x-4 h-12 bg-btn text-white font-bold rounded-xl hover:bg-white hover:text-btn hover:border-2 hover:border-btn">
              Login
              <BiLogInCircle />
            </button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default User;
