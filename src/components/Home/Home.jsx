import React, { useState, lazy, Suspense } from 'react';
import classes from './Home.module.css';
import Navbar from '../Navbar/Navbar';

// Lazy loading AddExpense component
const LazyAddExpense = lazy(() => import('../AddExpense/AddExpense'));

const Home = () => {

  return (
    <>
      <Navbar />
      <section className={classes.Home}>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyAddExpense />
        </Suspense>
      </section>
    </>
  );
};

export default Home;
