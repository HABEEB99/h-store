import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '../../components/page-layout/PageLayout';
import client, { urlFor } from '../../lib/sanity';
import Currency from 'react-currency-formatter';
import { motion } from 'framer-motion';
import Product from '../../components/product/Product';

const Products = ({ products }) => {
  return (
    <PageLayout>
      <div className=" px-6 md:px-16 lg:px-32 w-screen pb-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-logo mb-6 pt-2 font-bold">
            Products
          </h1>
        </motion.div>

        <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Products;

export const getServerSideProps = async () => {
  const productsData = await client.fetch(`*[_type=='product']`);

  return {
    props: {
      products: productsData,
    },
  };
};
