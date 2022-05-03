import React, { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { MdRemoveShoppingCart } from 'react-icons/md';
import Currency from 'react-currency-formatter';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

import PageLayout from '../../components/page-layout/PageLayout';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

const Checkout = () => {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(StoreContext);

  const removeItemFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: item });
    toast.error(`${item.name} removed from cart`, {
      position: 'bottom-right',
    });
  };

  const increaseItemQuantity = (item) => {
    dispatch({ type: 'INCREASE_ITEM_QUANTITY', payload: item });
    // toast.info(`${item.name} quantity increased by 1`, {
    //   position: 'bottom-right',
    // });
  };

  const decreaseItemQuantity = (item) => {
    dispatch({ type: 'DECREASE_ITEM_QUANTITY', payload: item });
    toast.error(`${item.name} quantity decreased by 1`, {
      position: 'bottom-right',
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.error('Cart cleared', {
      position: 'bottom-right',
    });
  };

  return cartItems.length === 0 ? (
    <PageLayout>
      <div className="w-screen min-h-[90vh] flex flex-col items-center justify-center   pb-10  px-4 md:px-12 lg:px-32">
        <h2 className="text-logo text-2xl md:text-3xl font-bold">
          There&apos;s no item in the cart
        </h2>
        <Link href="/products" passHref>
          <button
            className="flex items-center justify-center w-[20rem] h-12 bg-btn text-2xl font-bold text-white
       hover:bg-white hover:text-logo rounded-lg mt-3"
          >
            Shop Now
            <BsCart2 className="ml-2" />
          </button>
        </Link>
      </div>
    </PageLayout>
  ) : (
    <PageLayout title="Shopping Cart ">
      <div className="w-screen min-h-[90vh]   pb-10  px-4 md:px-12 lg:px-32">
        <h1 className="text-5xl pt-6 font-bold text-logo">Shopping Cart</h1>

        <div className="w-full overflow-auto flex flex-col lg:flex-row mt-10">
          <table className="w-full ">
            <thead className="bg-logo text-white text-xl px-2 ">
              <tr className="">
                <th className="p-3 tracking-wide text-left">Product</th>
                <th className="p-3 tracking-wide text-end">Quantity</th>
                <th className="p-3 tracking-wide text-end">Sum</th>
              </tr>
            </thead>
            {cartItems?.map((item) => (
              <tbody key={item._key} className="border-b-2  border-b-logo">
                <tr className="">
                  <td>
                    {/* PRODUCT */}
                    <div className="h-[100%] flex-[6] flex items-center">
                      <div className="flex items-center">
                        {/* IMAGE */}
                        <div className="w-[6rem] md:mt-0 h-[4rem] md:w-[10rem] md:h-[10rem] relative rounded-lg">
                          <Image
                            className="rounded-lg"
                            src={item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        {/* DETAILS */}
                        <div className="ml-1 md:ml-4">
                          <h2 className="text-gray-600 text-xs md:text-xl flex">
                            <span className="hidden md:block">Name:</span>
                            <span className="text-gray-700 ml-0 md:ml-1 text-xs md:text-xl font-bold">
                              {item.name}
                            </span>
                          </h2>

                          <h2 className="text-gray-600 mt-2 text-xs md:text-xl flex ">
                            <span className="hidden md:block"> Price:</span>
                            <span className="text-gray-700 ml-0 md:ml-1 text-sm md:text-xl font-bold">
                              <Currency quantity={item.price} />
                            </span>{' '}
                          </h2>
                          <MdRemoveShoppingCart
                            onClick={() => removeItemFromCart(item)}
                            className="text-lg md:text-3xl md:mt-2 cursor-pointer text-red-600 hover:text-red-700"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="h-[100%] flex-[2.5]  flex items-center justify-center text-center">
                      <div className="px-2 h-8 w-20 md:w-32 md:h-12 border-2 border-gray-600 rounded-lg flex items-center justify-between">
                        <AiFillMinusCircle
                          onClick={() => decreaseItemQuantity(item)}
                          className="text-gray-600 cursor-pointer text-lg md:text-3xl hover:text-red-600"
                        />
                        <span>{item.quantity}</span>
                        <AiFillPlusCircle
                          onClick={() => increaseItemQuantity(item)}
                          className="text-gray-600 cursor-pointer text-lg md:text-3xl hover:text-green-600"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    {/* TOTAL */}
                    <div className="h-[100%]  flex-[1.5] flex items-center justify-center">
                      <span className="text-gray-600 text-sm md:text-xl font-bold">
                        <Currency quantity={item.price * item.quantity} />{' '}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          <div className="shadow-xl rounded-md w-[22rem] md:w-[33rem] mt-[1.2rem] lg:mt-0 lg:w-[28rem] h-[13rem] bg-logo ml-0 lg:ml-4 px-4 lg:px-2 py-4">
            <div className="flex items-center justify-between w-[100%] h-8">
              <h2 className="text-body text-3xl">Subtotal</h2>
              <BsArrowRight className="text-body text-2xl" />
              <span className="text-white font-bold text-3xl">
                <Currency
                  quantity={cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                />
              </span>
            </div>

            <span className="text-[0.9rem] text-gray-400 mt-4">
              Taxes and shipping will be calculated at checkout
            </span>

            <Link href="/shipping" passHref>
              <button className="w-[100%] mt-4 h-12 text-2xl font-bold bg-btn text-white hover:bg-white hover:text-logo rounded-lg">
                check out
              </button>
            </Link>
            <Link href="/products" passHref>
              <div className="flex items-center mt-4 cursor-pointer group">
                <BsArrowLeft className="text-gray-400 text-2xl group-hover:text-btn" />
                <span className="text-gray-400 ml-2 text-xl group-hover:text-btn">
                  Continue shopping
                </span>
              </div>
            </Link>
          </div>
        </div>
        <button
          onClick={() => clearCart()}
          className="h-12 rounded-lg mt-4 w-[22rem] md:w-[33rem] lg:w-60 
        bg-btn text-2xl font-bold text-white hover:bg-white 
        hover:text-logo"
        >
          Clear Cart
        </button>
      </div>
    </PageLayout>
  );
};
export default Checkout;
