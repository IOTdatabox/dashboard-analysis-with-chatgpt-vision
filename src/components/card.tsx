import React from 'react';

const card = () => {
  return (
    <div className='w-[289px]  bg-white bg-opacity-5 rounded-[10px] m-3 p-5'>
      <div className='grid grid-cols-2 item-center'>
        <div>
          <img
            src='/img/cardImg1.png'
            alt=''
            className='rounded-full h-[83px] w-[99px]'
          />
        </div>
        <div>
          <p className='text-white'>
            “A Serious game changer for anyone involved”
          </p>
        </div>
      </div>
    </div>
  );
};

export default card;
