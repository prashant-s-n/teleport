'use client';

import {
  FiChevronRight, FiColumns, FiFileText, FiFolder, FiHeadphones, FiHome, FiLogOut, FiSmile, FiUser,
} from 'react-icons/fi';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import classNames from 'classnames';
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SideBar() {
  const pathName = usePathname();
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <div className='flex flex-col p-4 spacing-1 items-start bg-white min-h-full'>
      

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

    </div>
  );
}
