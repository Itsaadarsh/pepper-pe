import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN, USER_API } from '../utils/consts';
import { getCookie } from '../utils/cookies';

export const Transfer = () => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [disable, setDisable] = useState(false);

  const [auth, setAuth] = useState(false);
  const isLoggedIn = getCookie('auth');
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn == null) {
      navigate('/login');
    }
    setAuth(true);
  }, [auth]);

  const pay = async () => {
    setDisable(true);
    const resp = await axios({
      method: 'POST',
      url: `${USER_API}/transaction`,
      data: {
        to: +to,
        amount: +amount,
        remarks: message,
      },
      headers: { Authorization: `Bearer ${isLoggedIn}` },
    });
    const data = await resp?.data;

    console.log(data);

    setResMessage(data);
    setDisable(false);
  };

  return (
    <section>
      <div className='h-screen bg-slate-50 flex justify-center items-center w-full'>
        <div className='bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-lg'>
          <div className='space-y-4'>
            <h1 className='text-center text-5xl font-semibold text-gray-600 italic p-5'>Quick Transfer</h1>
            <div>
              <label className='block mb-1 text-gray-600 font-semibold'>To</label>
              <input
                value={to}
                onChange={event => setTo(event.target.value)}
                type='text'
                className='bg-gray-100 px-4 py-2 outline-none rounded-md w-full'
              />
            </div>
            <div>
              <label className='block mb-1 text-gray-600 font-semibold'>Amount</label>
              <input
                value={amount}
                type='text'
                onChange={event => setAmount(event.target.value)}
                className='bg-gray-100 px-4 py-2 outline-none rounded-md w-full'
              />
            </div>
            <div>
              <label className='block mb-1 text-gray-600 font-semibold'>Message</label>
              <input
                value={message}
                type='text'
                onChange={event => setMessage(event.target.value)}
                className='bg-gray-100 px-4 py-2 outline-none rounded-md w-full'
              />
            </div>
          </div>
          <button
            className='mt-10 w-full bg-sky-500 font-semibold py-2 rounded-md  tracking-wide'
            onClick={pay}
            disabled={disable}
          >
            PAY
          </button>
          {resMessage && (
            <>
              {resMessage.error ? (
                <div
                  className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5'
                  role='alert'
                >
                  <span class='block sm:inline'>{resMessage.data.message}</span>
                  <span class='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
                </div>
              ) : (
                <div
                  className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5'
                  role='alert'
                >
                  <span class='block sm:inline'>{resMessage.data.message}</span>
                  <span class='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
