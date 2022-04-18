import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { BiTransfer } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  let navigate = useNavigate();

  return (
    <section className='flex-col w-72 h-screen bg-gray-100'>
      <button className='flex text-xl ml-10 mt-10 font-semibold' onClick={() => navigate('/')}>
        <span>
          <FaHome size={25} className='mr-4' />
        </span>
        Home
      </button>
      <button className='flex text-xl ml-10 mt-20 font-semibold' onClick={() => navigate('/transactions')}>
        <span>
          <BiTransfer size={25} className='mr-4' />
        </span>
        Transactions
      </button>
      <button className='flex text-xl ml-10 mt-20 font-semibold' onClick={() => navigate('/transfer')}>
        <span>
          <FcMoneyTransfer size={25} className='mr-4' />
        </span>
        Transfer
      </button>
    </section>
  );
};
