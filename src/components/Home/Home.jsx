import React from 'react'
import classes from './Home.module.css'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <section className={classes.Home}>
      <h1>
        Welcome to Expense Tracker
      </h1>
      <div>
        <span style={{ padding: '0 10px' }}>Complete Your profile</span>
        <Link to="/Profile" style={{ textDecoration: 'none', fontWeight: 'bold' }}> Click here </Link>
      </div>
    </section>
  )
}

export default Home