import React from 'react';
import { urlFor } from '../../lib/sanity';
import Currency from 'react-currency-formatter';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../loader/Loader';

const Product = ({ product }) => {
  if (!product) {
    return <Loader />;
  }
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
      key={product._id}
      className=" rounded-t-lg  w-[21.5rem] md:w-[26.5rem] lg:w-[20rem] h-[25rem] border-[1px] border-logo shadow-xl"
    >
      <div className="self-center">
        <Link href={`/products/${product.slug.current}`} passHref>
          <div className="relative w-[21.35rem] md:w-[26.38rem] lg:w-[19.85rem] h-[22rem]">
            <Image
              className="rounded-t-lg hover:opacity-[0.8]"
              src={urlFor(product.image).url()}
              width="100%"
              height="100%"
              layout="fill"
              objectFit="cover"
              alt={product.name}
            />
          </div>
        </Link>
        <div className="px-2 flex justify-between items-center mt-1">
          <h2 className="text-logo text-xl font-bold">{product.name}</h2>
          <h2 className="text-lg text-btn">
            <Currency quantity={product.price} />
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
