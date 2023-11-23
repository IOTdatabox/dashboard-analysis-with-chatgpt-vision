import Image from 'next/image';
import { Inter } from 'next/font/google';
import InputForm from '@/components/InputForm';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Teams from '@/components/Teams';
import ScreenShot from '@/components/ScreenShot';
import Describe from '@/components/Describe';
import Faqs from '@/components/Faqs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Hero />
      <Teams />
      <ScreenShot
        title='Screenshot'
        img='1.jpeg'
        desc='Take a photo of a single page of your dashboard'
      />
      <Describe />
      <ScreenShot
        title='Feedback & Ideas'
        img='3.jpeg'
        desc='Describe (1) what you are trying to convey in your reporting & (2) Your intended audience'
      />
      <Faqs />
    </>
  );
}
