import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signInUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Page = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
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
            const response = await signInUser({email , password ,username});
            if (response.statusCode === 200) {
                console.log(response);
                navigate("/")
            } else {
                setError('Internal Server Error');
            }
        } catch (error) {
            console.log('Login error:', error);
            setError('Invalid username or password');
        }
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl mb-4'>Login</h1>
            <div className='items-center justify-center px-10 py-10 rounded-xl bg-gray-800 gap-3'>
                <div>
                    <input
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        placeholder='Username'
                        className='p-2 font-bold bg-gray-100 m-3 w-full rounded-lg lg:w-[20em] text-gray-900 outline-none'
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

                {error && <div className='text-red-500'>{error}</div>}
                <div className='flex justify-center p-1'>
                    <button
                        className='bg-red-700 text-lg hover:bg-purple-500 text-black font-bold rounded-xl px-3 py-2'
                        onClick={handleClick}
                    > Login
                    </button>
                </div>
                <div className='mt-2 text-base'>
                    <h2 className='text-gray-400 font-serif text-sm'>
                        create new account ? {' '}
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