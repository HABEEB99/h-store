import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../../components/loader/Loader';
import client, { urlFor } from '../../lib/sanity';
import Currency from 'react-currency-formatter';
import { BsFillArrowLeftSquareFill, BsCartPlusFill } from 'react-icons/bs';
import PageLayout from '../../components/page-layout/PageLayout';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetails = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(StoreContext);

  // const addProductToCart = async () => {
  //   const { data } = await axios.get(`/api/products/${product._id}`);
  //   const savedData = Cookies.set('products', JSON.stringify(data));
  //   dispatch({type: 'ADD_TO_CART', payload: data});
  // };

  const addProductToCart = (product) => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    // const { data } = axios.get(`/api/products/${product._id}`);
    // if (data.numInStock < quantity) {
    //   toast.error('Selected product is out stock', {
    //     position: 'bottom-right',
    //   });
    //   return;
    // }

    dispatch({
      type: 'ADD_ITEM_TO_CART',
      payload: {
        _key: product._id,
        name: product.name,
        price: product.price,
        slug: product.slug.current,
        quantity,
        image: urlFor(product.image).url(),
        numInStock: product.numInStock,
      },
    });
    toast.success(`${product.name} added to cart`, {
      position: 'bottom-right',
    });
  };

  if (!product) {
    <PageLayout>
      return <Loader />
    </PageLayout>;
  }
  return (
    <PageLayout>
      <div className="w-screen px-6 md:px-16 lg:px-32 pb-10">
        <Link href="/products" passHref>
          <div className="flex items-center group cursor-pointer font-bold pt-4">
            <span className="group-hover:text-logo text-gray-500 text-3xl">
              Products
            </span>
            <BsFillArrowLeftSquareFill className="text-2xl text-btn group-hover:text-logo ml-1" />
          </div>
        </Link>

        <div className="mt-6 rounded-lg flex flex-col md:flex-row justify-between mb-8 lg:mb-0">
          <div className="w-[20rem] sm:w-[22rem] h-[25rem] md:w-[35rem] md:h-[31rem]  lg:h-[32rem] relative md:flex-1">
            <Image
              className="rounded-lg"
              src={urlFor(product.image).url()}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col mt-4 md:mt-0 lg:flex-row lg:justify-between md:ml-12 lg:ml-0 md:flex-1 lg:flex-[1.4]">
            <div className="flex flex-col px-4 rounded-lg shadow-2xl h-[19rem] bg-logo items-start w-80 lg:ml-[5.2rem] ">
              <h2 className="text-gray-300 text-xl mt-2">
                Name :{' '}
                <span className="font-bold text-xl text-white">
                  {product.name}
                </span>
              </h2>

              <h2 className="text-gray-300 text-xl mt-2">
                Category :{' '}
                <span className="font-bold text-xl text-white">
                  {product.category}
                </span>
              </h2>

              <h2 className="text-gray-300 text-xl mt-2">
                Brand :
                <span className="font-bold text-xl text-white">
                  {product.brand}
                </span>
              </h2>

              <h2 className="text-gray-300 text-xl mt-2">
                Rating :
                <span className="font-bold text-xl text-white">
                  {product.rating}
                </span>
              </h2>

              <h2 className="text-gray-300 text-xl mt-2">
                Description :
                <span className="font-bold text-xl text-white">
                  {product.description}
                </span>
              </h2>
            </div>

            <div className="mt-4 w-80 h-44 shadow-2xl rounded-lg bg-body px-4 md:mt-4 lg:mt-0">
              <h2 className="text-gray-500 text-xl mt-4">
                Price{' '}
                <span className="ml-[4.5rem] font-bold text-xl text-logo">
                  <Currency quantity={product.price} />
                </span>
              </h2>

              <h2 className="text-gray-500 text-xl mt-4">
                Inventory
                <span className="ml-8 font-bold text-xl text-logo">
                  {product.numInStock} in stock
                </span>
              </h2>

              <button
                onClick={() => addProductToCart(product)}
                className="flex items-center justify-center w-[100%] h-12 font-bold hover:bg-white hover:text-logo
                 shadow-lg bg-btn mt-4 rounded-lg text-xl text-white hover:border-2 hover:border-btn"
              >
                ADD TO CART
                <BsCartPlusFill className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;

  const product = await client.fetch(
    `*[_type == 'product' && slug.current == '${slug}'] [0]`
  );

  return {
    props: {
      product,
    },
  };
};
