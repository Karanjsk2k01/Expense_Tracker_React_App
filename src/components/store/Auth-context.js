import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = React.createContext({

  token: '',
  isLoggenIn: false,
  emailId: null,
  login: (token) => { },
  logout: () => { }

})


export const AuthProvider = (props) => {

  let initialtoken = localStorage.getItem('token')
  let initialEmail = localStorage.getItem('email')
  const [token, settoken] = useState(initialtoken);
  const [email, setEmail] = useState(initialEmail);
  const [isLoggenIn, setIsLoggenIn] = useState(!!initialtoken);


  useEffect(() => {
    if (token) {
      const timeout = setTimeout(() => {
        localStorage.setItem('expiredToken', token)
      }, 5 * 60 * 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [token]);


  useEffect(() => {

    const expiredToken = localStorage.getItem('expiredToken')
    const initialtoken = localStorage.getItem('token')

    if (expiredToken === initialtoken) {
      logoutHandler()
    }

    return;
  }, [])



  const loginHandler = (token, email) => {
    settoken(token);
    setEmail(email)
    setIsLoggenIn(true)
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
  }

  const logoutHandler = () => {
    settoken('');
    setIsLoggenIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('expiredToken')
    localStorage.removeItem('email')
  }

  const contextValue = {

    token: token,
    isLoggenIn: isLoggenIn,
    emailId: email,
    login: loginHandler,
    logout: logoutHandler
  }



  return <AuthContext.Provider value={contextValue} > {props.children}</AuthContext.Provider>
}


export default AuthContext;