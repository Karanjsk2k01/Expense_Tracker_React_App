import './App.css';
import AuthForm from './components/Auth/AuthForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/profile/Profile';
import AuthContext, { AuthProvider } from './components/store/Auth-context';
import ForgetPassword from './components/Auth/ForgetPassword';
import { useContext } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const contextVal = useContext(AuthContext);
  const isLoggenIn = contextVal.isLoggenIn;
  const mode = useSelector(state => state.theme.darkMode)

  console.log(mode)
  return (
    <div className={`app ${mode ? 'dark' : 'light'}`} >
      < BrowserRouter >
        <Routes>
          <Route path='/Auth' element={<AuthForm />} />
          {isLoggenIn ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/ForgetPassword' element={<ForgetPassword />} />
            </>
          ) : (
            <Route
              path='/'
              element={<Navigate to='/Auth' />}
            />
          )}
        </Routes>
      </BrowserRouter >
    </div >
  );
}

export default App;
