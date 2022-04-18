import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Transactions } from './pages/Transactions';
import { Transfer } from './pages/Transfer';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </Layout>
  );
}
