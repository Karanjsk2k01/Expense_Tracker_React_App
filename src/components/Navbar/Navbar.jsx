import React from 'react'
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.right}>
        <span>Expense Tracker</span>
      </div>
      <div className={classes.left}>
        <span style={{ padding: '0 20px' }}>Your Profile is incomplete -</span>
        <Link to="/Profile" className={classes.link}>Please Complete your profile</Link>
        <Link to="/Auth" className={classes.auth}>Login</Link>
      </div>
    </div>

  )
}

export default Navbar