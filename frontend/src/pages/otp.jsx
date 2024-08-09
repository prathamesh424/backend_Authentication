import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signUpUser, verifyOtp } from '../api/api';
import { useNavigate } from 'react-router-dom';

const OtpVarify = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();
    const handleSignUp = async () => {
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
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);
            // Append files if you have file inputs for avatar and coverImage

            const response = await signUpUser(formData);
            console.log(response);
            setIsOtpSent(true);
        } catch (error) {
            console.log('Sign-up error:', error);
            setError('Error during sign-up');
        }
    };

    const handleVerifyOtp = async () => {
        setError('');
        try {
            const response = await verifyOtp({ email, otp });
            if (response.message === 'OTP verified successfully') {
                navigate('/login'); // Redirect to login or home page after successful verification
            } else {
                setError('Invalid OTP');
            }
        } catch (error) {
            console.log('OTP verification error:', error);
            setError('Invalid OTP');
        }
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl mb-4'>Sign Up</h1>
            {!isOtpSent ? (
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
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            ) : (
                <div className='items-center justify-center px-10 py-10 rounded-xl bg-gray-800 gap-3'>
                    <h2 className='text-gray-400 font-serif text-sm'>Enter OTP sent to your email</h2>
                    <input
                        type='text'
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        placeholder='OTP'
                        className='p-2 font-bold bg-gray-100 m-3 w-full rounded-lg lg:w-[20em] text-gray-900 outline-none'
                    />
                    {error && <div className='text-red-500'>{error}</div>}
                    <div className='flex justify-center p-1'>
                        <button
                            className='bg-red-700 text-lg hover:bg-purple-500 text-black font-bold rounded-xl px-3 py-2'
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OtpVarify;
