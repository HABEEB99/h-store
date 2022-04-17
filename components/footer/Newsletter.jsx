import React, { useState, useEffect } from 'react';
import { IoMdMail } from 'react-icons/io';
import { FaThumbsUp } from 'react-icons/fa';

const Newsletter = () => {
  const [subscribe, setSubscribe] = useState(false);

  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribe(true);
    setInput('');
  };

  useEffect(() => {
    if (subscribe) {
      setTimeout(() => {
        setSubscribe(false);
      }, 5000);
    }
  }, [subscribe]);

  return (
    <div className=" mb-[1rem]">
      <h2 className="text-2xl text-gray-700 font-bold">Newsletter</h2>

      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col mt-6">
          <input
            className="peer border-2 placeholder-transparent
            focus:border-btn w-44 md:w-60 h-10 rounded-md px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
          <label
            className="absolute -top-3 left-0 peer-focus:border-btn peer-focus:-top-6
            peer-focus:uppercase peer-focus:text-sm peer-focus:text-logo
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-md
            peer-placeholder-shown:text-gray-400 transition-all"
            htmlFor="email"
          >
            Input your email
          </label>
        </div>
        {subscribe ? (
          <div className="flex items-center justify-center text-xs md:text-xl space-x-2 font-bold text-pink-600">
            <span>Thanks for subscribing </span>
            <FaThumbsUp />
          </div>
        ) : (
          <button className="flex items-center justify-center hover:bg-white hover:text-btn hover:border-2 hover:border-btn font-bold transition duration-300 ease-in-out rounded-lg block bg-btn mt-2 h-10 w-44 md:w-60 text-2xl text-white">
            Subscibe
            <IoMdMail className="ml-2" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
