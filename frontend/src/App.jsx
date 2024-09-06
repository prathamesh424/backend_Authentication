import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import SignUpPage from './pages/sign-up';
import Home from './pages/home';
import Login from './pages/login';
import OTPVerification from './pages/otp';
import Navbar from './components/Navbar';
import DataProvider from './context/DataProvider';

const AuthRoute = ({ isUserAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isUserAuthenticated && token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate replace to='/login' />
  );
}

function App() {
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setUserAuthenticated(true);
    }
  }, []);

  return (
    <DataProvider> 
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<Login setUserAuthenticated={setUserAuthenticated} />} />
{/*         
          <Route path='/'  >
           <Route index element={<Home/>} />
          </Route> */}
          
        <Route path='/' element={<AuthRoute isUserAuthenticated={isUserAuthenticated} />} >
          <Route index element={<Home/>} />
        </Route>

        <Route path='/otp-verification' element={<OTPVerification />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
