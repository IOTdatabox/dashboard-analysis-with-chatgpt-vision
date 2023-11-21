import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <section className='text-gray-600 body-font   '>
      <div className='container px-5 py-4  mx-auto  grid grid-cols-3 gap-14 content-center'>
        <div className=' md:ml-auto  md:py-2 mt-8 md:mt-[100px]'>
          <img
            src='/img/phone.png'
            className='w-[339px] h-[734px] border-solid border-8 border-[#000] ring-inset shadow'
            alt='phone'
          />
        </div>
        <div className=' text-[#FFF]  rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start  col-span-2'>
          <div className='lg:w-2/3 md:w-1'>
            <div className='flex'>
              <img
                src='/img/productOne.png'
                className='w-[170px] h-[73px] '
                alt='phone'
              />
              <img
                src='/img/productOne.png'
                className='w-[170px] h-[73px] '
                alt='phone'
              />
            </div>
            <h1 className='text-white text-xl hero-title'>
              Instant Dashboard Feedback
            </h1>
            <p className='hero-subtitle py-4'>
              Another Pair of Eyes In Minutes
            </p>

            <div className='bg-[#FFF] text-[#000]  rounded-[20px] grid grid-cols-2 gap-3 p-5'>
              <div>
                <h1 className='text-black text-2xl font-bold '>
                  Upload Dashboards
                </h1>
                <p className='  text-black  text-sm py-2'>
                  Have Reporting Feedback & Improvements
                </p>
                <div className='w-auto h-[254px] bg-zinc-300 bg-opacity-0 rounded-[20px] border-2 border-emerald-600 border-dashed relative'>
                  <div className='   place-items-center h-screen'></div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
