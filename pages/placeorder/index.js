import { useEffect, useState, useContext } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { MdRemoveShoppingCart } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import PageLayout from '../../components/page-layout/PageLayout';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

import OrderPage from '../../components/checkoutMap/OrderPage';
import { StoreContext } from '../../context/StoreContext';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { state, dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingAddress, cartItems, paymentMethod },
  } = state;

  const toTwoDecimalPlaces = (number) =>
    Math.round(number * 100 + Number.EPILSON) / 100;

  const itemsSum = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost = itemsSum < 300 ? 0 : 20;

  const taxCost = itemsSum * 0.15;

  const totalCost = itemsSum + shippingCost + taxCost;

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    if (cartItems.length === 0) {
      router.push('/products');
    }
  }, [router, paymentMethod, cartItems]);

  const placeOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderedItems: cartItems.map((item) => ({
            ...item,
            numInStock: undefined,
            slug: undefined,
          })),

          shippingAddress,
          paymentMethod,
          itemsSum,
          taxCost,
          shippingCost,
          totalCost,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CLEAR_CART' });
      Cookies.remove('cartItems');
      router.push(`/order/${data}`);
       console.log('here is your order data', data);
      //   setLoading(false);
      //   router.push(`/order/${data._id}`);
      //  router.push('/');
    } catch (error) {
      setLoading(false);
      toast.error(error, {
        position: 'top-center',
      });
    }
  };

  return (
    <PageLayout title="Place your order">
      <div className="w-screen min-h-[90vh] pt-3  pb-10  px-4 md:px-12 lg:px-32">
        <OrderPage />

        {/* Shipping Address*/}
        <div className=" mb-4 flex flex-col mt-6">
          <h2 className="text-3xl text-logo font-bold">Shipping Address:</h2>
          <p className="">{shippingAddress.address}</p>
        </div>
        {/* Payment Method*/}
        <div className=" mb-4 flex flex-col">
          <h2 className="text-3xl text-logo font-bold">Payment Method:</h2>
          <p className="">{paymentMethod}</p>
        </div>

        <h2 className="text-3xl text-logo font-bold mt-10">Ordered Items:</h2>
        <div className="w-full overflow-auto flex flex-col lg:flex-row mt-2">
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

          <div className="shadow-xl rounded-md w-[22rem] md:w-[33rem] mt-[1.2rem] lg:mt-0 lg:w-[28rem] h-[23rem] bg-logo ml-0 lg:ml-4 px-4 lg:px-2 py-4">
            <div className="flex items-center justify-between w-[100%] h-8 mb-6">
              <h2 className="text-body text-2xl">Item(s) cost </h2>
              <BsArrowRight className="text-body text-2xl" />
              <span className="text-white font-bold text-2xl">
                <Currency quantity={itemsSum} />
              </span>
            </div>

            <div className="flex items-center justify-between w-[100%] h-8 mb-6">
              <h2 className="text-body text-3xl">Tax</h2>
              <BsArrowRight className="text-body text-2xl" />
              <span className="text-white  text-3xl">
                <Currency quantity={taxCost} />
              </span>
            </div>

            <div className="flex items-center justify-between w-[100%] h-8 mb-6">
              <h2 className="text-body text-3xl">Shipping</h2>
              <BsArrowRight className="text-body text-2xl" />
              <span className="text-white text-3xl">
                <Currency quantity={shippingCost} />
              </span>
            </div>

            <div className="flex border-4  border-cta items-center justify-between w-[100%] h-12 mb-6">
              <h2 className="text-body text-3xl font-bold ">Total</h2>
              <BsArrowRight className="text-body text-2xl" />
              <span className="text-white font-bold text-4xl">
                <Currency quantity={totalCost} />
              </span>
            </div>

            <button
              onClick={placeOrder}
              className="w-[100%] mt-2 h-12 text-2xl font-bold bg-btn text-white hover:bg-white hover:border-2 hover:border-btn hover:text-logo rounded-lg"
            >
              Place Order
            </button>

            {loading && (
              <span>
                <AiOutlineLoading3Quarters className="text-btn" />
              </span>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });

// export default PlaceOrder;
