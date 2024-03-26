'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi';

export default function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleLogin() {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      alert(error);
    }

    router.refresh();
  }

  return (
    <div className='h-screen flex flex-row items-center bg-green-50'>
      <div className='flex h-screen flex-col w-3/5 items-center justify-end'
      style={{
        background: 'url("abu-dhabi-grand-mosque.jpeg")',
        // backgroundPosition:'65% 35%',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover'
      }}>
        <div className='p-10 shadow-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 w-3/5 rounded-t-lg text-white'>
          <span className='text-lg block'>
            The Sheikh Zayed Grand Mosque in Abu Dhabi is a masterpiece of Islamic architecture, blending tradition with modernity. With its intricate marble work and stunning interiors, it's both a cultural icon and a place of worship, welcoming visitors from all walks of life. A symbol of inclusivity and serenity, it stands as a must-see attraction in Abu Dhabi.
          </span>
          <span className='text-md text-white block w-fit mt-4 rounded-md font-normal'>
          Photo by <a href="https://unsplash.com/@dhojayev?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dovi</a> on <a href="https://unsplash.com/photos/white-and-brown-dome-building-under-blue-sky-during-daytime-mrsxNu1molw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
          </span>
        </div>
      </div>
      <div className='flex flex-col h-full justify-center w-1/2 bg-white'>

        <div className='flex flex-col max-w-full w-full items-center justify-end'>
          <div className='px-6 py-4 gap-2 w-1/2'>

            <div className='w-full mt-4'>
              <span className='text-xl block py-1 text-zinc-400 leading-2'>Welcome to </span>
              <span className='text-3xl block py-1 leading-2 font-bold'>Teleport </span>
              <span className='text-sm py-3 text-green-500 block'>Version 1.0.3 Abu Dhabi &middot; أبو ظبي.</span>
            </div>

            <div className='w-full mt-4'>
              <input className='block w-full p-5 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300' type='text' placeholder='Email Address' aria-label='Email Address' onChange={(event) => setUsername(event.currentTarget.value)} />
            </div>

            <div className='w-full mt-4'>
              <input className='block w-full p-5 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300' type='password' placeholder='Password' aria-label='Password' onChange={(event) => setPassword(event.currentTarget.value)} />
            </div>

            <div className='flex items-center justify-between mt-4'>
              <button className='p-5 text-md font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' onClick={handleLogin}>
                <FiLock className='inline mr-4'/>
                Sign In
              </button>
            </div>

            <div className='flex py-5'>
              <span className='text-sm text-zinc-400'>
                This website is intended solely for the use of authorized personnel for internal purposes. All content, including text, images, and any other materials, is confidential and proprietary to our organization.
              </span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
