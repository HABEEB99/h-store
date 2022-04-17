import React from 'react';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const CartItem = () => {
  return (
    <div className="z-[9999] flex flex-col items-center w-80 h-[30rem] px-2 space-x-2 bg-plain absolute top-[11vh] right-4 sm:right-6 md:right-12 lg:right-32 border-4 border-logo">
      <div>cart items</div>
      <div className="w-80">
        <button className="flex items-center justify-center space-x-4 text-white font-bold text-xl bg-btn hover:border-2 hover:bg-white hover:text-btn ">
          Checkout
          <RiMoneyDollarCircleFill />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
