import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <section className='text-gray-600 body-font   '>
      <div className='container px-5 py-4  mx-auto  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-14 content-center'>
        <div className=' md:ml-auto  md:py-2 mt-0 lg:mt-20 md:mt-[100px]  flex items-center justify-center'>
          <img
            src='/img/phone.png'
            className='w-[auto] h-[365px] lg:w-[339px] lg:h-[734px]  border-solid border-8 border-[#000] ring-inset shadow'
            alt='phone'
          />
        </div>
        <div className='text-[#FFF]  rounded-lg overflow-hidden sm:mr-10 lg:p-10 flex items-end justify-start  col-span-0 lg:col-span-2'>
          <div className=''>
            <div className='flex'>
              <img
                src='/img/productOne.png'
                className=' w-[140px] h-[73px] md:w-[170px] md:h-[73px] '
                alt='phone'
              />
              <img
                src='/img/productOne.png'
                className=' w-[140px] h-[73px] md:w-[170px] md:h-[73px] '
                alt='phone'
              />
            </div>
            <h1 className='text-white text-lg hero-title lg:w-2/3 md:w-1'>
              Instant Dashboard Feedback
            </h1>
            <p className='hero-subtitle py-4'>
              Another Pair of Eyes In Minutes
            </p>

            <div className='bg-[#FFF] text-[#000] w-[auto]  rounded-[20px] grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 lg:p-8'>
              <div>
                <h2 className='text-black text-2xl font-bold '>
                  Upload Dashboards
                </h2>
                <p className='  text-black  text-md py-2 mb-3'>
                  Have Reporting Feedback & Improvements
                </p>
                <div className='w-auto h-[284px] bg-zinc-300 bg-opacity-0 rounded-[20px] border-2 border-emerald-600 border-dashed flex   place-items-center items-center justify-center text-center text-emerald-600 font-bold'>
                  <div className=''>
                    Drop Dashboard Screenshot Here <br />
                    <span className='text-lg'>- OR -</span>
                    <br />
                    <span>Browse Photos</span>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor='countries'
                  className='block mb-2 text-sm font-bold text-black dark:text-white'
                >
                  Who is the audience?
                </label>
                <select
                  id='countries'
                  className='bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2'
                >
                  <option selected>Director Level Report</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select>
                <label
                  htmlFor='countries'
                  className='block mb-2 text-sm font-bold text-black dark:text-white'
                >
                  What are you trying to convey?
                </label>
                <textarea
                  id='countries'
                  className='bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2'
                  placeholder='Describe your outcome'
                ></textarea>

                <label
                  htmlFor='countries'
                  className='block mb-2 text-sm font-bold text-black dark:text-white'
                >
                  Type of Data
                </label>
                <select
                  id='countries'
                  className='bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2'
                >
                  <option selected>Ecommerce</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select>
                <label
                  htmlFor='countries'
                  className='block mb-2 text-sm font-bold text-black dark:text-white'
                >
                  Your Email
                </label>
                <input
                  id='countries'
                  type='email'
                  className='bg-[#F1F1F1] w-full text-gray-900 text-sm rounded-lg  block p-2.5 mb-2'
                  placeholder='email@hotmail.com'
                />

                <button className='w-[190px] h-10 bg-emerald-600 rounded-[10px] text-white text-lg font-bold '>
                  Analyze Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
