import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import PaymentPage from '../../components/checkoutMap/PaymentPage';
import PageLayout from '../../components/page-layout/PageLayout';
import Cookies from 'js-cookie';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();
  const { redirect } = router.query;

  const { state, dispatch } = useContext(StoreContext);
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, [router, shippingAddress]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error('You must select a payment method', {
        position: 'top-center',
      });
    } else {
      dispatch({ type: 'ADD_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      toast.success(`You chose to pay with ${paymentMethod}`, {
        position: 'top-center',
      });
      router.push('/placeorder');
    }
  };
  return (
    <PageLayout title="Select Payment Method">
      <div className="w-screen flex flex-col items-center justify-center min-h-[75vh] px-6 md:px-16 lg:px-32">
        <PaymentPage />

        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-logo py-6">
          Select Payment Method
        </h1>

        <form
          onSubmit={submitForm}
          className="flex flex-col items-center justify-center w-[20rem] md:w-[35rem] lg:w-[50rem]"
        >
          {paymentMethod && (
            <span className="text-green-500 animate-pulse py-2 lg:py-4">{`You chose to pay with ${paymentMethod}`}</span>
          )}
          <div className="flex  mt-6 self-start">
            <input
              className="h-8 w-8"
              type="radio"
              checked={paymentMethod === 'paypal'}
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="text-3xl font-bold text-cta ml-4">PayPal</label>
          </div>

          <div className="flex mt-6 self-start">
            <input
              className="h-8 w-8 "
              type="radio"
              checked={paymentMethod === 'stripe'}
              value="stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="text-3xl font-bold text-cta ml-4">Stripe</label>
          </div>

          <div className="flex mt-6 self-start">
            <input
              className="h-8 w-8 "
              type="radio"
              checked={paymentMethod === 'cash'}
              value="cash"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="text-3xl font-bold text-cta ml-4">Cash</label>
          </div>

          <button
            type="submit"
            className="bg-btn flex items-center justify-center mt-6 text-3xl font-bold text-white hover:bg-white hover:text-btn hover:border-2 hover:border-btn w-full h-12 rounded-md"
          >
            Continue
            <BsArrowRight className="self-center ml-1 mt-1" />
          </button>
        </form>
        <Link href="/shipping">
          <a className="text-lg text-gray-500 flex items-center justify-center hover:text-btn mt-4 hover:font-bold">
            Back to shipping page
            <BsArrowLeft className="self-center ml-1 mt-1" />
          </a>
        </Link>
      </div>
    </PageLayout>
  );
};

export default Payment;
