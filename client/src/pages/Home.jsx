import React from 'react';
import Navbar from '../components/home/Navbar';
import Heading from '../components/home/Heading';
import Investment from '../components/home/Investments';
import CryptoPrices from '../components/home/CryptoPrices';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Heading />
      <Investment />
      <CryptoPrices />
      <Footer />
    </>
  );
};

export default Home;
