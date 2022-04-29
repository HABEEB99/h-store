import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const ShippingPage = () => {
  return (
    <div className="flex md:items-center justify-between mt-1 p-4  md:p-8 h-20 w-screen lg:w-[82vw] shadow-2xl rounded-md">
      <div className="flex flex-col items-center">
        <IoMdCheckmarkCircle className="text-lg md:text-2xl lg:text-3xl text-btn" />
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-logo text-center">
          Login
        </h2>
      </div>
      <BsArrowRight className="text-3xl md:text-5xl lg:text-6xl text-btn" />
      <div className="flex flex-col items-center">
        <div className="rounded-[50%] animate-pulse bg-btn w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center">
          <h2 className="text-white text-sm md:text-lg lg:text-2xl font-bold">
            2
          </h2>
        </div>
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-logo text-center">
          Shipping Address
        </h2>
      </div>
      <BsArrowRight className="text-3xl md:text-5xl lg:text-6xl text-gray-300" />
      <div className="flex flex-col items-center">
        <div className="rounded-[50%] bg-gray-400 w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center">
          <h2 className="text-white text-sm md:text-lg lg:text-2xl font-bold">
            3
          </h2>
        </div>
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-gray-300 text-center">
          Payment Method
        </h2>
      </div>
      <BsArrowRight className="text-3xl md:text-5xl lg:text-6xl text-gray-300" />
      <div className="flex flex-col items-center">
        <div className="rounded-[50%] bg-gray-400 w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center">
          <h2 className="text-white text-sm md:text-lg lg:text-2xl font-bold">
            4
          </h2>
        </div>
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold text-gray-300 text-center">
          Place Order
        </h2>
      </div>
    </div>
  );
};

export default ShippingPage;
