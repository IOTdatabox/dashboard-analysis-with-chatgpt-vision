import Hero2 from '@/components/Hero2';
import HomePage from '@/components/HomePage';
import Navbar from '@/components/Navbar';
import Teams from '@/components/Teams';
import React from 'react';

const index = () => {
  return (
    <div>
      <Navbar />
      <Hero2 />
      <Teams />
    </div>
  );
};

export default index;
