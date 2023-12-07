import Navbar from '@/components/Navbar';
import SignUpPage from '@/components/SignUpPage';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Index = () => {
  const { push } = useRouter();

  useEffect(() => {
    const loginCheck = localStorage.getItem('token');

    if (loginCheck) {
      push('/');
    }
  }, []);


  return (
    <div>
      <Navbar />
      <SignUpPage />
    </div>
  );
};

export default Index;
