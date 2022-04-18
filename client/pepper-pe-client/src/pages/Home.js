import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import useFetch from '../hooks/useFetch';
import { USER_API } from '../utils/consts';
import { getCookie } from '../utils/cookies';

export const Home = () => {
  const [auth, setAuth] = useState(false);
  let navigate = useNavigate();
  const isLoggedIn = getCookie('auth');

  useEffect(() => {
    if (isLoggedIn == null) {
      navigate('/login');
    }
    setAuth(true);
  }, [auth]);

  const { isLoading, apiData, serverError } = useFetch('GET', `${USER_API}/get-user`, {}, isLoggedIn);

  if (isLoading) {
    return <span>Loading!</span>;
  }
  if (!isLoading && serverError) {
    return <span>Error!</span>;
  }

  return (
    <section>
      {auth && (
        <>
          <h1 className='text-7xl font-semibold text-center p-32'>
            Welcome To Our Mini Bank
            <br />
            <span className='italic text-sky-500'>Pepper Pe</span>
          </h1>
          <Card
            name={apiData.data.name}
            account_number={apiData.data.account_number}
            account_balance={apiData.data.account_balance}
          />
        </>
      )}
    </section>
  );
};
