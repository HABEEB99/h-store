import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCart2 } from 'react-icons/bs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const Banner = () => {
  return (
    <div className="relative w-screen ">
      {/* BANNER IMAGES */}
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
        className=""
      >
        <div className="w-[100%] h-[85vh] relative ">
          <Image
            objectFit="cover"
            src="/bg-1.jpg"
            alt="banner1"
            layout="fill"
          />
        </div>

        <div className="w-[100%] h-[85vh] relative ">
          <Image
            objectFit="cover"
            src="/bg-2.jpg"
            alt="banner2"
            layout="fill"
          />
        </div>

        <div className="w-[100%] h-[85vh] relative ">
          <Image
            objectFit="cover"
            src="/bg-3.jpg"
            alt="banner3"
            layout="fill"
          />
        </div>

        <div className="w-[100%] h-[85vh] relative ">
          <Image
            objectFit="cover"
            src="/bg-4.jpg"
            alt="banner4"
            layout="fill"
          />
        </div>

        <div className="w-[100%] h-[85vh] relative ">
          <Image
            objectFit="cover"
            src="/bg-5.jpg"
            alt="banner5"
            layout="fill"
          />
        </div>

        <div className="w-[100%] h-[85vh] relative ">
          <Image
            objectFit="cover"
            src="/bg-6.jpg"
            alt="banner6"
            layout="fill"
          />
        </div>
      </Carousel>

      {/* BANNER IMAGES */}
      <div className="absolute top-64 w-[100%] flex flex-col items-center justify-center ">
        <h1 className="text-yellow-600 font-bold text-xl md:text-4xl lg:text-6xl italic">
          get quality items at an affordable prices
        </h1>
        <Link href="/products" passHref>
          <button className="mt-4 flex items-center justify-center bg-btn text-3xl md:text-4xl lg:text-5xl transition duration-400 ease-in-out hover:bg-white hover:text-btn hover:border-2 hover:border-btn text-white inline-block text-center w-80 md:w-96 lg:w-[27rem] h-16  lg:h-20  rounded-2xl font-bold ">
            Shop Now
            <BsCart2 className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
