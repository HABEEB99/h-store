import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import ShippingPage from '../../components/checkoutMap/ShippingPage';
import { BsArrowRight } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import PageLayout from '../../components/page-layout/PageLayout';
import { StoreContext } from '../../context/StoreContext';
import Cookies from 'js-cookie';

const Shipping = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login?redirect=/shipping');
    }
    setValue('fullname', shippingAddress.fullname);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [router, userInfo, setValue, shippingAddress]);

  const submitForm = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'ADD_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    router.push('/payment');
  };
  return (
    <PageLayout title="Shipping address">
      <div className="w-screen min-h-[90vh] px-6 pt-1 md:px-16 lg:px-32 flex flex-col items-center justify-center">
        <ShippingPage />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-logo py-6">
          Shipping Address
        </h1>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col items-center justify-center w-[20rem] md:w-[35rem] lg:w-[50rem]"
        >
          <div className="flex flex-col w-[20rem] md:w-[35rem] lg:w-[50rem] mb-8 mt-4 relative">
            <input
              className="peer placeholder-transparent w-full h-12 rounded-md text-lg  
            border-2 border-body focus:border-btn px-2 bg-white text-logo outline-none"
              type="text"
              placeholder="fullName"
              id="fullName"
              {...register('fullName', {
                required: true,
                minLength: 5,
              })}
            />

            {errors.fullName && (
              <span className="text-red-600 text-md animate-pulse">
                {errors.fullName.type === 'required' && 'FullName is required'}
                {errors.fullName.type === 'minLength' &&
                  'FullName must not be less than 5 characters'}
              </span>
            )}

            <label
              className="peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-2xl 
            absolute -top-8  left-0 text-xl text-logo transition-all font-bold
            peer-focus:-top-8 peer-focus:text-xl peer-focus:text-logo peer-focus:px-0 peer-placeholder-shown:px-2"
              htmlFor="fullName"
            >
              FullName
            </label>
          </div>

          <div className="flex flex-col w-[20rem] md:w-[35rem] lg:w-[50rem] mb-8 mt-4 relative">
            <input
              className="peer placeholder-transparent w-full h-12 rounded-md text-lg  
            border-2 border-body focus:border-btn px-2 bg-white text-logo outline-none"
              type="text"
              placeholder="address"
              id="address"
              {...register('address', {
                required: true,
                minLength: 5,
              })}
            />

            {errors.address && (
              <span className="text-red-600 text-md animate-pulse">
                {errors.address.type === 'required' && 'Address is required'}
                {errors.address.type === 'minLength' &&
                  'Address must not be less than 5 characters'}
              </span>
            )}

            <label
              className="peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-2xl 
            absolute -top-8  left-0 text-xl text-logo transition-all font-bold
            peer-focus:-top-8 peer-focus:text-xl peer-focus:text-logo peer-focus:px-0 peer-placeholder-shown:px-2"
              htmlFor="address"
            >
              Address
            </label>
          </div>

          <div className="flex flex-col w-[20rem] md:w-[35rem] lg:w-[50rem] mb-8 mt-4 relative">
            <input
              className="peer placeholder-transparent w-full h-12 rounded-md text-lg 
            border-2 border-body focus:border-btn px-2 bg-white text-logo outline-none"
              type="text"
              placeholder="city"
              id="city"
              {...register('city', {
                required: true,
                minLength: 2,
              })}
            />

            {errors.city && (
              <span className="text-red-600 text-md animate-pulse">
                {errors.city.type === 'required' && 'City is required'}
                {errors.city.type === 'minLength' &&
                  'City must not be less than 2 characters'}
              </span>
            )}

            <label
              className="peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-2xl 
            absolute -top-8  left-0 text-xl text-logo transition-all font-bold
            peer-focus:-top-8 peer-focus:text-xl peer-focus:text-logo peer-focus:px-0 peer-placeholder-shown:px-2"
              htmlFor="address"
            >
              City
            </label>
          </div>

          <div className="flex flex-col w-[20rem] md:w-[35rem] lg:w-[50rem] mb-8 mt-4 relative">
            <input
              className="peer placeholder-transparent w-full h-12 rounded-md text-lg  
            border-2 border-body focus:border-btn px-2 bg-white text-logo outline-none"
              type="text"
              placeholder="postal code"
              id="postalCode"
              {...register('postalCode', {
                required: true,
                minLength: 6,
              })}
            />

            {errors.postalCode && (
              <span className="text-red-600 text-md animate-pulse">
                {errors.postalCode.type === 'required' &&
                  'PostalCode is required'}
                {errors.postalCode.type === 'minLength' &&
                  'PostalCode must not be less than 6 characters'}
              </span>
            )}

            <label
              className="peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-2xl 
            absolute -top-8  left-0 text-xl text-logo transition-all font-bold
            peer-focus:-top-8 peer-focus:text-xl peer-focus:text-logo peer-focus:px-0 peer-placeholder-shown:px-2"
              htmlFor="address"
            >
              Postal Code
            </label>
          </div>

          <div className="flex flex-col w-[20rem] md:w-[35rem] lg:w-[50rem] mb-8 mt-4 relative">
            <input
              className="peer placeholder-transparent w-full h-12 rounded-md text-lg  
            border-2 border-body focus:border-btn px-2 bg-white text-logo outline-none"
              type="text"
              placeholder="Country"
              id="country"
              {...register('country', {
                required: true,
                minLength: 3,
              })}
            />

            {errors.country && (
              <span className="text-red-600 text-md animate-pulse">
                {errors.country.type === 'required' && 'Country is required'}
                {errors.country.type === 'minLength' &&
                  'Country must not be less than 3 characters'}
              </span>
            )}

            <label
              className="peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-2xl 
            absolute -top-8  left-0 text-xl text-logo transition-all font-bold
            peer-focus:-top-8 peer-focus:text-xl peer-focus:text-logo peer-focus:px-0 peer-placeholder-shown:px-2"
              htmlFor="address"
            >
              Country
            </label>
          </div>

          <button className="flex items-center justify-center mt-1 mb-6 w-full h-12 hover:text-btn hover:bg-white hover:border-2 hover:border-btn rounded-md  text-white bg-btn text-4xl text-center font-bold">
            Continue
            <BsArrowRight className="self-center ml-1 mt-1"/>
          </button>
        </form>
      </div>
    </PageLayout>
  );
};

export default Shipping;
