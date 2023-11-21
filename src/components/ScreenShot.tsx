import React from 'react';

const ScreenShot = ({ title, img, desc }: any) => {
  return (
    <div className='bg-gray-700 p-24'>
      <div className='grid grid-cols-2 items-center  justify-items-center'>
        <div>
          <img
            src={`/img/${img}`}
            alt=''
            className={`h-[355px] w-[580px] rounded-[50px]`}
          />
        </div>
        <div>
          <h1 className='text-white text-[64px] font-semibold '>{title} </h1>
          <p className='text-white text-[32px] w-[366px]'>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ScreenShot;
