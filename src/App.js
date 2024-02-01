import './App.css';
import AuthForm from './components/Auth/AuthForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route path='/Home' element={<Home />} />
          <Route path='/' element={<AuthForm />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
