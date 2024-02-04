import React from 'react'
import classes from './Home.module.css'
import Navbar from '../Navbar/Navbar'
import AddExpense from '../AddExpense/AddExpense'


const Home = () => {
  return (
    <>
      <Navbar />
      <section className={classes.Home}>
        <AddExpense />
      </section>
    </>
  )
}

export default Home