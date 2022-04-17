import React from 'react';
import LatestProducts from './LatestProducts';

const Latest = () => {
  return (
    <div className="bg-logo flex flex-col items-center w-screen h-[113rem] md:h-[62rem] lg:h-[30rem] my-8 px-10 md:px-16 lg:px-32">
      <h1 className="text-4xl font-bold text-plain mt-4">
        Latest Products
      </h1>

      <div className="grid gap-y-4 md:gap-6 lg:gap-y-0 grid-col-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <LatestProducts name="Suits" imageUrl="/latest-1.jpg" />
        <LatestProducts name="Shirts" imageUrl="/latest-2.jpg" />
        <LatestProducts name="Jackets" imageUrl="/latest-3.jpg" />
        <LatestProducts name="Sneakers" imageUrl="/latest-4.jpg" />
      </div>
    </div>
  );
};

export default Latest;
