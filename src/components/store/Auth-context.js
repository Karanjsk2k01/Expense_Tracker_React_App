import React, { createContext, useEffect, useState } from "react";


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
  const [email, setEmail] = useState(initialEmail)

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
  }, [])


  const isLoggenIn = !!token;

  const loginHandler = (token, email) => {
    settoken(token);
    setEmail(email)
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
  }

  const logoutHandler = () => {
    settoken('');
    localStorage.removeItem('token')
    localStorage.removeItem('expiredToken')
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