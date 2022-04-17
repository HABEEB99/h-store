import React from 'react';
import FooterLinks from './FooterLinks';
import FooterNav from './FooterNav';
import FooterSocials from './FooterSocials';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <>
      <div className="w-screen bg-header px-4 sm:px-6 md:px-12 lg:px-32 pt-12 pb-12 grid gap-x-1 gap-y-4 md:gap-6 grid-cols-2 md:flex md:flex-row items-center justify-center md:justify-between">
        <FooterNav />
        <FooterLinks />
        <FooterSocials />
        <Newsletter />
      </div>
      <footer className="w-screen h-10 bg-logo flex items-center justify-center text-white font-bold">Created by habeebahmadu1@gmail.com</footer>
    </>
  );
};

export default Footer;
