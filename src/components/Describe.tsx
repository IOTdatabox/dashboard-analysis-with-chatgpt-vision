import React from 'react';

const Describe = () => {
  return (
    <div className=' p-24'>
      <div className='grid grid-cols-2 items-center  justify-items-center'>
        <div>
          <h1 className='text-white text-[64px] font-semibold '>Screenshot </h1>
          <p className='text-white text-[32px] w-[366px]'>
            Take a photo of a single page of your dashboard
          </p>
        </div>
        <div>
          <img
            src='/img/2.jpeg'
            alt=''
            className='h-[355px] w-[672px] rounded-[50px]'
          />
        </div>
      </div>
    </div>
  );
};

export default Describe;
