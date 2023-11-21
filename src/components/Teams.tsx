import React from 'react';
import Card from './card';

const Teams = () => {
  return (
    <div className='overflow-hidden'>
      <h1 className='text-center text-[64px] text-white font-semibold'>
        What Teams Are Saying{' '}
      </h1>
      <div className='grid grid-rows-1 grid-flow-col gap-5 my-5 ms-[4rem]'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className='grid grid-rows-1 grid-flow-col gap-5 my-5 ms-[-7rem]'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Teams;
