'use client';

import { FiGlobe, FiHome, FiLogOut, FiUser, FiUsers } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import isUserAdmin from '../common/utils/client-session';
import Link from 'next/link';

export default function SideBar() {
  const pathName = usePathname();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setUser] = useState<any>(false);

  useEffect(() => {
    supabase.auth.getUser()
    .then(sess => setUser(sess?.data))
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <>
    {
      
      <div className='flex flex-col p-4 spacing-1 bg-white min-h-full'>
        {!user && 
          <div className='flex flex-col items-center p-9 h-screen'>
            <div className='flex items-center'>
            <span className="loading loading-spinner loading-lg"></span>
              </div>
          
          </div>
        }
        {user && 
        <section>
          <Link href={'/home/'} className='flex p-3 items-center gap-5 min-w-full hover:bg-zinc-100 hover:cursor-pointer'
        >
        <div className='flex flex-none'>
          <FiHome className='text-2xl'/>
        </div>
        <div className='flex flex-1 items-start flex-col'>
          <span className='text-md'>Home</span>
          <span className='text-sm text-zinc-400'>Dashboard home</span>
        </div>
      </Link>
      <Link href={'/home/clients'} className='flex p-3 items-center gap-5 min-w-full hover:bg-zinc-100 hover:cursor-pointer'
        >
        <div className='flex flex-none'>
          <FiUsers className='text-2xl'/>
        </div>
        <div className='flex flex-1 items-start flex-col'>
          <span className='text-md'>Clients</span>
          <span className='text-sm text-zinc-400'>Organizational clients</span>
        </div>
      </Link>

      {
        isUserAdmin(user) ?
        <>
          <Link href={'/home/users'} className='flex p-3 items-center gap-5 min-w-full hover:bg-zinc-100 hover:cursor-pointer'>
            <div className='flex flex-none'>
              <FiUser className='text-2xl'/>
            </div>
            <div className='flex flex-1 items-start flex-col'>
              <span className='text-md'>Users</span>
              <span className='text-sm text-zinc-400'>Manage Organization users</span>
            </div>
          </Link>
          <Link href={'/home/organizations'} className='flex p-3 items-center gap-5 min-w-full hover:bg-zinc-100 hover:cursor-pointer'>
            <div className='flex flex-none'>
              <FiGlobe className='text-2xl'/>
            </div>
            <div className='flex flex-1 items-start flex-col'>
              <span className='text-md'>Organizations</span>
              <span className='text-sm text-zinc-400'>Manage Organizations</span>
            </div>
          </Link>
        </> 
        :<></>
      }

      

      <div className='flex p-3 items-center gap-5 min-w-full hover:bg-zinc-100 hover:cursor-pointer'
        onClick={handleSignOut}>
        <div className='flex flex-none'>
          <FiLogOut className='text-2xl'/>
        </div>
        <div className='flex flex-1 items-start flex-col'>
          <span className='text-md'>Logout</span>
          <span className='text-sm text-zinc-400'>Sign out of Teleport</span>
        </div>
      </div>

      </section>}
    </div>
    }
    </>
  );
}
