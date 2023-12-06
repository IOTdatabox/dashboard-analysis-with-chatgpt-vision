import React, { useEffect } from 'react';

import Hero2 from '@/components/Hero2';
import HomePage from '@/components/HomePage';
import Navbar from '@/components/Navbar';
import Teams from '@/components/Teams';
import { useRouter } from 'next/navigation';

const Index = () => {
  const { push } = useRouter();

  useEffect(() => {
    const loginCheck = localStorage.getItem('token');

    if (!loginCheck) {
      push('/');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Hero2 />
      <Teams />
    </div>
  );
};

export default Index;

