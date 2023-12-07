import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from '@/components/LoginPage';

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
      <LoginPage />
    </div>
  );
};

export default Index;
