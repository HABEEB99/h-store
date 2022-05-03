import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const OrderPage = () => {
  return (
    <div className="flex md:items-center justify-between  p-4  md:p-8 h-24 w-screen lg:w-[82vw] shadow-2xl rounded-md">
      <div className="flex flex-col items-center">
        <IoMdCheckmarkCircle className="text-lg md:text-2xl lg:text-3xl text-btn" />
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-center text-logo">Login</h2>
      </div>
      <BsArrowRight className="text-3xl md:text-5xl lg:text-6xl text-btn" />
      <div className="flex flex-col items-center">
        <IoMdCheckmarkCircle className="text-lg md:text-2xl lg:text-3xl text-btn" />
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-center text-logo">Shipping Address</h2>
      </div>
      <BsArrowRight className="text-3xl md:text-5xl lg:text-6xl text-btn" />
      <div className="flex flex-col items-center">
        <IoMdCheckmarkCircle className="text-lg md:text-2xl lg:text-3xl text-btn" />
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-center text-logo ">Payment Method</h2>
      </div>
      <BsArrowRight className="text-3xl md:text-5xl lg:text-6xl text-btn" />
      <div className="flex flex-col items-center">
        <div className="rounded-[50%] bg-btn w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 animate-pulse flex items-center justify-center">
          <h2 className="text-white text-sm md:text-lg lg:text-2xl font-bold">4</h2>
        </div>
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-center text-logo">Place Order</h2>
      </div>
    </div>
  );
};

export default OrderPage;
