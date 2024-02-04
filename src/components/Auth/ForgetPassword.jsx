import { faEnvelopeCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './ForgetPassword.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ForgetPassword = () => {

  const [loader, setloader] = useState(false)
  const [success, setsuccess] = useState(false)
  const [email, setEmail] = useState('')
  const history = useNavigate()


  const redirectHandler = () => {
    history('/Auth')
  }

  const resetHandler = async (e) => {
    e.preventDefault();

    let enteredEmail = email;

    setloader(true);

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA'

    try {

      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: enteredEmail
        })
      })

      if (!res.ok) {
        throw new Error('Something went wrong try after sometime');

      }

      let data = await res.json()

      console.log(data)

      setloader(false)
      setsuccess(true)

      e.target.reset();

      setTimeout(() => {
        history('/Auth')
      }, 2000);

    } catch (error) {
      alert(error.message)

      setloader(false)
      setsuccess(false)
    }
  }


  return (
    <section className={classes.Profile}>
      <div className={classes.wrapper}>
        <div className={classes.ProfileWrapper}>
          <h1>Reset Password</h1>
          <form onSubmit={resetHandler}>
            <div className={classes.control}>
              <label htmlFor='Email'>
                <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                <span style={{ padding: '0 20px' }}>Email</span>
              </label>
              <input type='text' id='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={classes.buttonControl}>
              {!loader &&
                <button type='submit' className={classes.toggle1}>
                  Reset
                </button>
              }
              {!loader &&
                <button type='button' className={classes.toggle2} onClick={redirectHandler}>
                  Cancel
                </button>
              }
              {loader &&
                <button type='submit' className={classes.toggle1}>
                  Loading...<FontAwesomeIcon icon={faSpinner} />
                </button>
              }
            </div>
          </form>
        </div>
      </div>
      {success && <span className={classes.toast}>Email has been sent to reset the Password!</span>}
    </section>
  )
}

export default ForgetPassword