import React from 'react'
import classes from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const history = useNavigate()

  const verifyEmailHandler = async (e) => {

    e.preventDefault();

    let idToken = localStorage.getItem('token');

    if (idToken === 'undefined' || idToken === null) {
      alert('Please Login to continue!!');
      history('/Auth')
    }

    try {
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA'

      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: idToken
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!res.ok) {
        throw new Error('Something went wrong try after some time....')
      }

      let data = await res.json()

      console.log(data)
    }
    catch (error) {
      alert(error.message)
    }
  }


  const logoutHandler = (e) => {
    e.preventDefault()

    localStorage.removeItem('token')

    history('/Auth')
  }



  return (
    <div className={classes.navbar}>
      <div className={classes.right}>
        <span>Expense Tracker</span>
      </div>
      <div className={classes.left}>
        <button type='button' className={classes.button} onClick={verifyEmailHandler}>Verify Email</button>
        <span style={{ padding: '0 20px' }}>Your Profile is incomplete -</span>
        <Link to="/Profile" className={classes.link}>Please Complete your profile</Link>
        <Link to="/Auth" className={classes.auth}>Login</Link>
        <button type='button' className={classes.button} onClick={logoutHandler}>Logout</button>
      </div>
    </div>

  )
}

export default Navbar