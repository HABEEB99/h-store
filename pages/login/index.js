import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PageLayout from '../../components/page-layout/PageLayout';
import { StoreContext } from '../../context/StoreContext';
import getError from '../../lib/error';
import { BiLogInCircle } from 'react-icons/bi';

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;

  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || '/');
    }
  }, [router, userInfo, redirect]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const submitForm = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'LOGIN_USER', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
      toast.success('You signed up successfully', {
        position: 'top-center',
      });
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-center',
      });
    }
  };

  return (
    <PageLayout title="Login Page">
      <div className="w-screen h-[87vh] px-6 md:px-16 lg:px-32 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-logo mt-8">Login</h1>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="py-8 w-[20rem] md:w-[35rem] lg:w-[50rem]"
        >
          <div className="flex flex-col w-[20rem] md:w-[35rem] lg:w-[50rem] mb-8 mt-4 relative">
            <input
              className="peer placeholder-transparent w-full h-12 rounded-md text-lg  
            border-2 border-body focus:border-btn px-2 bg-white text-logo outline-none"
              type="text"
              id="email"
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-md animate-pulse">
                {errors.email.type === 'required' && 'Email is required'}
                {errors.email.type === 'pattern' && 'Invalid Email pattern'}
              </span>
            )}
            <label
              className="peer-placeholder-shown:text-gray-500 peer-focus:px-0 peer-placeholder-shown:px-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-2xl 
            absolute -top-8  left-0 text-xl text-logo transition-all font-bold
            peer-focus:-top-8 peer-focus:text-xl peer-focus:text-logo"
              htmlFor="email"
            >
              Email
            </label>
          </div>

          <div className=" flex flex-col w-[20rem] md:w-[35rem] lg:w-[50rem] mb-4 relative">
            <input
              className="peer placeholder-transparent px-2 w-full h-12 rounded-md text-lg  
            border-2 border-body focus:border-btn bg-white text-logo outline-none "
              type="password"
              placeholder="Password"
              id="password"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />

            {errors.password && (
              <span className="text-red-600 text-md animate-pulse">
                {errors.password.type === 'required' && 'Password is required'}
                {errors.password.type === 'minLength' &&
                  'Password must not be less than 6 characters'}
              </span>
            )}
            <label
              className="peer-placeholder-shown:text-gray-500  peer-placeholder-shown:top-2 peer-placeholder-shown:text-2xl 
            absolute -top-8  left-0 text-xl text-logo transition-all font-bold
            peer-focus:-top-8 peer-focus:text-xl peer-focus:text-logo peer-focus:px-0 peer-placeholder-shown:px-2"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <button className="flex items-center justify-center py-2 mt-6 w-full h-12 hover:text-btn hover:bg-white hover:border-2 hover:border-btn rounded-md mb-2 text-white bg-btn text-3xl text-center font-bold">
            Login
            <BiLogInCircle />
          </button>
        </form>

        <h4>
          Don&apos;t have an account yet?
          <Link href={`/signup?redirect=${redirect || '/'}`}>
            <a className="ml-2 text-btn animate-pulse"> Signup </a>
          </Link>
        </h4>
      </div>
    </PageLayout>
  );
};

export default Login;
