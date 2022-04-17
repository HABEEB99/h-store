import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner/Banner';
import PageLayout from '../components/page-layout/PageLayout';
import { useState } from 'react';
import Latest from '../components/latest-products/Latest';

export default function Home() {
  return (
    <PageLayout>
      <Banner />
      <Latest />
    </PageLayout>
  );
}
