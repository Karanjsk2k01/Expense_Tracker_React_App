import React from 'react'
import classes from './Home.module.css'
import Navbar from '../Navbar/Navbar'


const Home = () => {
  return (
    <>
      <Navbar />
      <section className={classes.Home}>
        <h1>
          Welcome to Expense Tracker
        </h1>
      </section>
    </>
  )
}

export default Home