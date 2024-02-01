import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.css';
// import AuthContext from '../Context/Auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loader, setloader] = useState(false);
  const [success, setSuccess] = useState(false);

  // const contextValue = useContext(AuthContext);
  const history = useNavigate();

  let emailRef = useRef();
  let passwordRef = useRef();
  let confirmPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let confirmPassword = '';

    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA'
      confirmPassword = '';
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxqP5SfeSM8fgzRarxiwEgZ4kJ5v7JZsA'
      confirmPassword = confirmPasswordRef.current.value;
    }

    try {

      setloader(prev => !prev);

      if (confirmPassword !== '' && enteredPassword.trim() !== confirmPassword.trim()) {
        throw new Error('password is not matching')
        return;
      }

      else {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {

          let data = await response.json()

          throw new Error(data.error.message)

        }

        const successUser = await response.json();


        // contextValue.login(successUser.idToken, successUser.email)

        setSuccess(true)

        console.log(successUser)

        e.target.reset();

        // redirect to homepage
        if (isLogin && response.ok) {
          setTimeout(() => {
            history('/Home');
          }, 2000);
        }

        setloader(prev => !prev);

      }



    }
    catch (error) {

      alert(error)

      setloader(prev => !prev);

      e.target.reset()


    }

  }

  return (
    <>
      <section className={classes.auth}>
        <div className={classes.formWrapper}>
          <div className={classes.wrapper}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor='email'>Your Email</label>
                <input type='email' id='email' required ref={emailRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor='password'>Your Password</label>
                <input
                  type='password'
                  id='password'
                  required
                  ref={passwordRef}
                />
              </div>
              {!isLogin && <div className={classes.control}>
                <label htmlFor="Confirm_Password">Confirm Password</label>
                <input type='text' id='confirm_password' required ref={confirmPasswordRef} />
              </div>}
              <div className={classes.actions}>
                {!loader &&
                  <button>
                    {isLogin ? 'login' : 'Create Account'}
                  </button>
                }
                {loader &&
                  <button>
                    loading..
                  </button>
                }
                <button
                  type='button'
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
                <button
                  type='button'
                  className={classes.toggle}
                  onClick={() => { }}
                >
                  {isLogin ? 'Forgot password' : ''}
                </button>
              </div>
            </form>
          </div>
          {success && !isLogin && <span className={classes.toast}>Successfully registered</span>}
          {success && isLogin && <span className={classes.toast}>Login Successfull</span>}
        </div>
      </section>
    </>
  );
};

export default AuthForm;
