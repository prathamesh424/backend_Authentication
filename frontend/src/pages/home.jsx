import React, { useContext } from 'react';
import logo from '../../public/boy.png';
import bg from '../../public/coverImage.webp';
import { DataContext } from '../context/DataProvider';

const Home = () => {
 
  const { User } = useContext(DataContext);

  return (
    <div className='justify-center flex flex-col items-center '>
      <div className='bg-gray-700 gap-2 shadow-lg shadow-purple-600  m-20 max-w-lg flex flex-col justify-center items-center p-3 rounded-lg '>
        <h1 className='text-2xl'>Profile</h1>
        <div className=' relative w-full flex flex-col items-center justify-center mb-2 '>
     
          <img 
            src= {User.coverImage || bg} 
            alt="cover img"
            className='w-full h-40 bg-gray-800 bg-cover bg-center rounded-md'
          />
     
          <img 
            src={User.avatar || logo} 
            alt="profile logo" 
            className='absolute  h-20 w-20 bg-cover bg-center rounded-full border-4 border-white'
          />
 
          <h2 className='font-bold text-purple-200 '>{User.username || 'Username'}</h2>
          <h3 className='font-thin  text-red-300 '>{User.email || 'Email'}</h3>
        </div>
      </div>
    </div>
  )
}

export default Home;
