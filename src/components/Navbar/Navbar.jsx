import React, { useContext } from 'react'
import classes from './Navbar.module.css';
import { Router, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../store/Auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions } from '../store/themeContext';

const Navbar = () => {

  const mode = useSelector(state => state.theme.darkMode);
  const premiumActivated = useSelector(state => state.expenses.premiumActivation)
  const history = useNavigate()
  const dispatch = useDispatch()
  const contextVal = useContext(AuthContext)
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

      alert('Verify Email has been sent successfully')
    }
    catch (error) {
      alert(error.message)
    }
  }

  const toggleHandler = (e) => {
    e.preventDefault()

    dispatch(themeActions.toggleDarkMode())

  }

  const logoutHandler = () => {

    localStorage.removeItem('token')
    window.location.reload()
    history('/Auth')
  }



  return (
    <div className={mode ? classes.navbar_dark : classes.navbar}>
      <div className={classes.right}>
        <span>Expense Tracker</span>
      </div>
      <div className={classes.left}>
        {contextVal.isLoggenIn ? <>
          {premiumActivated && <button type='button' className={classes.toggle} onClick={toggleHandler}>{mode ? 'DarkMode' : 'LightMode'}</button>}
          <button type='button' className={classes.button} onClick={verifyEmailHandler}>Verify Email</button>
          <span style={{ padding: '0 20px' }}>Your Profile is incomplete -</span>
          <Link to="/Profile" className={classes.link}>Please Complete your profile</Link>
          <button type='button' className={classes.button} onClick={logoutHandler}>Logout</button>
        </> :
          <Link to="/Auth" className={classes.auth}>Login</Link>
        }


      </div>
    </div>

  )
}

export default Navbar