import React from 'react';

const Faqs = () => {
  return (
    <>
      <div className='flex justify-center  mt-48 mb-28'>
        <button className='text-center text-white text-2xl font-bold px-10 py-5 bg-emerald-600 rounded-[10px]'>
          Try It Today!
        </button>
      </div>
      <div className='mb-24'>
        <div className='flex justify-center'>
          <p className=' text-white  text-[64px]'>FAQs</p>
        </div>
        <div className='flex justify-center'>
          <input
            type='text'
            className='block bg-[] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6'
            placeholder='Where Does Myy Data Go? '
          />
        </div>
      </div>
    </>
  );
};

export default Faqs;
