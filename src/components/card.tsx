import React from 'react';

const card = () => {
  return (
    <div className='w-[289px]  bg-white bg-opacity-5 rounded-[10px] m-3 p-5'>
      <div className='grid grid-cols-2  item-center'>
        <div>
          <img
            src='/img/cardImg1.png'
            alt=''
            className='rounded-full h-[88px] w-[88px]'
          />
        </div>
        <div>
          <p className='text-white text-sm font-bold'>
            “A Serious game changer for anyone involved”
          </p>
          <p className='text-white text-xs mt-2'>~Brian Susan</p>
        </div>
      </div>
    </div>
  );
};

export default card;
