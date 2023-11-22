import React from 'react';
import Card from './card';

const Teams = () => {
  return (
    <section className='overflow-hidden py-10 '>
      <h3 className='text-center text-[34px] lg:text-[64px] text-white font-semibold mb-5'>
        What Teams Are Saying
      </h3>
      <div className='grid grid-rows-1 lg:grid-flow-col lg:gap-5 lg:my-5 lg:ms-[4rem] justify-center '>
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
      </div>

      <div className='grid grid-rows-1 lg:grid-flow-col lg:gap-5 lg:my-5 lg:ms-[-7rem] justify-center'>
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
        <Card
          name='Brian Susan'
          detail='A Serious game changer for anyone involved'
        />
      </div>
    </section>
  );
};

export default Teams;
