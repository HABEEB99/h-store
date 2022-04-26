import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { BsCart2 } from 'react-icons/bs';
import { StoreContext } from '../../context/StoreContext';
import Currency from 'react-currency-formatter';

const CartItem = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(StoreContext);
  return cartItems.length ? (
    <div className="absolute top-24 right-[0.5rem] md:right-16 lg:right-10 shadow-2xl w-[22rem] md:w-[25rem] h-[33.5rem] py-6 px-4 bg-body z-[999] ">
      <div className="h-[27rem]  overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-3">
            <div className="w-24 h-24 relative rounded-lg">
              <Image
                className="rounded-lg"
                src={item.image}
                layout="fill"
                width="100%"
                height="100%"
                objectFit="cover"
                alt={item.name}
              />
            </div>

            <div className="flex items-start justify-start flex-col">
              <h2 className="text-gray-500">
                name:{' '}
                <span className="text-logo font-bold ml-2">{item.name}</span>
              </h2>
              <h2 className="text-gray-500">
                price:{' '}
                <span className="text-logo font-bold ml-3">
                  {' '}
                  {item.quantity} x <Currency quantity={item.price} />{' '}
                </span>
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[100%]  static mt-4">
        <Link href="/checkout" passHref>
          <button className="h-12 hover:bg-white hover:text-logo w-[100%] bg-btn font-bold text-3xl text-white rounded-lg ">
            Go To Checkout
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="absolute flex flex-col items-center justify-center top-24 right-10 shadow-lg w-[22rem] h-[33.5rem] py-6 px-4 bg-body z-[999] ">
      <h2 className="text-logo text-xl font-bold">
        There&apos;s no item in the cart
      </h2>
      <Link href="/products" passHref>
        <button
          className="w-[100%] flex items-center justify-center h-12 bg-btn text-2xl font-bold text-white
         hover:bg-white hover:text-logo rounded-lg mt-3"
        >
          Shop Now
          <BsCart2 className="ml-2" />
        </button>
      </Link>
    </div>
  );
};

export default CartItem;
