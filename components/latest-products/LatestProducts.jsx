import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsCart2 } from 'react-icons/bs';
import { motion } from 'framer-motion';

const LatestProducts = ({ name, imageUrl }) => {
  return (
    <motion.div
      whileHover={{
        scale: [1, 1.4, 1.2],
        rotate: [0, 10, -10, 0],
        filter: [
          'hue-rotate(0) contrast(100%)',
          'hue-rotate(360deg) contrast(200%)',
          'hue-rotate(45deg) contrast(300%)',
          'hue-rotate(0) contrast(100%)',
        ],
        transition: {
          duration: 0.2,
        },
        position: 'relative',
        zIndex: 1,
        background: 'white',
      }}
      className="relative w-[21rem] h-[25rem] md:w-[27rem]  md:h-[27rem] lg:w-[20rem] lg:h-[24rem] rounded-lg"
    >
      <Image
        className="rounded-lg"
        width="100%"
        height="100%"
        layout="fill"
        objectFit="cover"
        src={imageUrl}
        alt={name}
      />

      <div className="absolute top-0 left-0 flex items-center justify-center w-[100%]">
        <h3 className=" text-white text-2xl font-bold">{name}</h3>
      </div>

      <div className="absolute flex items-center justify-center top-[20rem] lg:top-[18rem] left-0 w-[100%]">
        <Link href="/products" passHref>
          <button className="flex items-center justify-center w-72 lg:w-60 h-[3.5rem] rounded-lg hover:bg-white hover:text-btn hover:border-2 hover:border-btn bg-btn text-body font-bold text-2xl ">
            Shop Now
            <BsCart2 className="ml-2"/>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default LatestProducts;
