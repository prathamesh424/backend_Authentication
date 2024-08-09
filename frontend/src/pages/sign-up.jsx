import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { signUpUser } from '../api/api';
import logo from '../../public/boy.png';
import bg from '../../public/coverImage.webp';
import { useNavigate } from 'react-router-dom';

const Page = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(logo);
    const [coverImagePreview, setCoverImagePreview] = useState(bg);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCoverImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const navigate = useNavigate();

    const handleClick = async () => {
        setError('');
        if (!email ||!password ||!username) {
            setError('All fields are required');
            return;
        }
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
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', username);
            formData.append('avatar', avatar);
            formData.append('coverImage', coverImage);

            const response = await signUpUser(formData);
            if (response.statusCode === 200) {
                console.log(response);
                navigate("/login")
            } else {
                setError('Internal Server Error');
            }
        } catch (error) {
            console.log('Sign-up error:', error);
            setError(error.message);
        }
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl mb-4'>SignUp</h1>
            <div className='items-center justify-center px-10 py-10 rounded-xl bg-gray-800 gap-3'>
                
                <div className='flex flex-col items-center mb-2 '>
                    <label htmlFor='coverImage' className='cursor-pointer'>
                        <img
                            src={coverImagePreview}
                            alt='Cover Image'
                            className='w-full h-40 bg-cover bg-center rounded-md'
                        />
                    </label>
                    <input
                        id='coverImage'
                        type='file'
                        onChange={handleCoverImageChange}
                        className='hidden cursor-pointer'
                    />
                    <label htmlFor='avatar' className='cursor-pointer -mt-12'>
                        <img
                            src={avatarPreview}
                            alt='Avatar'
                            className='w-20 h-20 rounded-full object-cover border-2 border-black'
                        />
                    </label>
                    <input
                        id='avatar'
                        type='file'
                        onChange={handleAvatarChange}
                        className='hidden'
                    />
                </div>
                
                
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
                    > SignUp
                    </button>
                </div>
                <div className='mt-2 text-base'>
                    <h2 className='text-gray-400 font-serif text-sm'>
                        have already account?{' '}
                        <a className='text-purple-500 font-serif text-lg' href={'/login'}>
                            Login
                        </a>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Page;
