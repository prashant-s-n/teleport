'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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
    <div className='h-screen flex flex-col bg-green-50 items-center justify-center'>
      <div className='w-full h-1/2 flex items-center max-w-sm overflow-hidden bg-white rounded-lg shadow-lg'>
        <div className='px-6 py-4 gap-2 w-full justify-items-start'>

          <h3 className='mt-3 mb-2 text-xl font-medium text-center text-gray-600'>
                        Teleport
          </h3>
          <span className='text-xs text-zinc-400 block text-center'>
                        Alpha 0.0.1
          </span>

          <div className='w-full mt-4'>
            <input className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300' type='text' placeholder='Email Address' aria-label='Email Address' onChange={(event) => setUsername(event.currentTarget.value)}/>
          </div>

          <div className='w-full mt-4'>
            <input className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300' type='password' placeholder='Password' aria-label='Password' onChange={(event) => setPassword(event.currentTarget.value)}/>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <button className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50' onClick={handleLogin}>
                                Sign In
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
