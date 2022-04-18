import React from 'react';

export const Card = ({ name, account_number, account_balance }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='space-y-16'>
        <div className='w-full h-96 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110'>
          <img
            className='relative object-cover w-full h-full rounded-xl'
            src='https://i.imgur.com/kGkSg1v.png'
          />

          <div className='w-full px-8 absolute top-8'>
            <div className='flex justify-between'>
              <div className='pt-5 text-xl'>
                <p className='font-semibold'>Name</p>
                <p className='font-bold tracking-widest pt-1'>{name}</p>
              </div>
              <img className='w-32 h-232' src='https://i.imgur.com/bbPHJVe.png' />
            </div>
            <div className='text-xl'>
              <p className='font-semibold'>Account Number</p>
              <p className='font-bold tracking-more-wider pt-1'>{account_number}</p>
            </div>
            <div className='pt-10 text-xl'>
              <p className='font-semibold'>Account Balance</p>
              <p className='font-bold tracking-more-wider pt-1'>₹ {account_balance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
