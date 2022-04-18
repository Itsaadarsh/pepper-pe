import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { USER_API } from '../utils/consts';
import { getCookie } from '../utils/cookies';
var moment = require('moment');

export const Transactions = () => {
  const [auth, setAuth] = useState(false);
  let navigate = useNavigate();
  const isLoggedIn = getCookie('auth');
  useEffect(() => {
    if (isLoggedIn == null) {
      navigate('/login');
    }
    setAuth(true);
  }, [auth]);

  const { isLoading, apiData, serverError } = useFetch('GET', `${USER_API}/transaction`, {}, isLoggedIn);

  if (isLoading) {
    return <span>Loading!</span>;
  }
  if (!isLoading && serverError) {
    return <span>Error!</span>;
  }

  return (
    <section>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='bg-white border-b'>
                  <tr>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      From
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      To
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Amount
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Message
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Remarks
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.data.map((trx, index) => {
                    var formattedDate = moment(trx.timestamp).format('YYYY-MM-DD');
                    return (
                      <tr
                        key={index}
                        className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {trx.from}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {trx.to}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {trx.amount}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {trx.remarks}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {trx.flow}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {formattedDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
