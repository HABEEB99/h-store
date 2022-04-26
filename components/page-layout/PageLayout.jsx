import Head from 'next/head';
import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const PageLayout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title ? `H-STORE - ${title}` : 'H-STORE'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Header />
      <div className="bg-body w-screen">{children}</div>
      <Footer />
    </>
  );
};

export default PageLayout;
