import './App.css';
import AuthForm from './components/Auth/AuthForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import Profile from './components/profile/Profile';
import { AuthProvider } from './components/store/Auth-context';
import Navbar from './components/Navbar/Navbar';
import ForgetPassword from './components/Auth/ForgetPassword';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/Auth' element={<AuthForm />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/ForgetPassword' element={<ForgetPassword />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div >
  );
}

export default App;
