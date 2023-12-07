import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from '@/components/LoginPage';
import Navbar from '@/components/Navbar';

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
      <LoginPage />
    </div>
  );
};

export default Index;
