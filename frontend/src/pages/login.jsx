import React, { useState, useContext } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signInUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { DataContext } from '../context/DataProvider';  

const Page = ({ setUserAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(DataContext); 
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = async () => {
    setError('');
 
    if (email.length < 6) {
      setError('Invalid email');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      const response = await signInUser({ email, password, username });

      if (response.statusCode === 200) {
 
        sessionStorage.setItem('accessToken', ` ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `${response.data.refreshToken}`);
 
        setUserAuthenticated(true);
 
        setUser({
          username: response.data.user.username || username,
          email: response.data.user.email || email,
          avatar: response.data.user.avatar || '', 
          coverImage: response.data.user.coverImage || ''  
        });
        console.log()
 
        navigate('/');
      } else {
        setError('Internal Server Error');
      }
    } catch (error) {
      console.log('Login error:', error);
      setError('Invalid username or password');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl mb-4'>Login</h1>
      <div className=' items-center shadow-lg shadow-purple-400 justify-center px-10 py-10 rounded-xl bg-gray-800  gap-3'>
        <div>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
            className='p-2 font-bold  bg-gray-100 m-3 w-full rounded-lg lg:w-[20em] text-gray-900 outline-none'
          />
        </div>

        <div>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Email'
            className='p-2 font-bold bg-gray-100 m-3 w-full rounded-lg lg:w-[20em] text-gray-900 outline-none'
          />
        </div>

        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
            className='p-2 font-bold bg-gray-100 m-3 w-full rounded-lg lg:w-[20em] text-gray-900 outline-none'
          />
          <span
            onClick={togglePassword}
            className='absolute right-4 top-6 text-gray-800 cursor-pointer'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <div className='flex justify-center text-red-500'>{error}</div>}
        <div className='flex-col justify-center items-center gap-1 '>
          <div className='flex justify-center p-1'>
            <button
              className='bg-red-600 text-lg hover:bg-red-700 text-black font-bold rounded-xl px-3 py-2'
              onClick={handleClick}
            >
              Login
            </button>
          </div>
          <p className='flex justify-center'>or</p>
          <div className='flex justify-center p-1'>
            <button
              className='bg-black hover:bg-gray-950 px-3 py-3 rounded-xl'
              onClick={handleGoogleLogin}
            >
              <FcGoogle />
            </button>
          </div>
        </div>
        <div className='mt-2 text-base'>
          <h2 className='text-gray-400 font-serif text-sm'>
            Create new account?{' '}
            <a className='text-purple-500 font-serif text-lg' href={'/sign-up'}>
              SignUp
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
