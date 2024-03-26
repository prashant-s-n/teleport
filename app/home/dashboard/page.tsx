import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Roles } from '@/app/common/enums/roles.enum';
import UserPage from '../users/page';
import ClientPage from '../clients/page';
import { MdAppShortcut } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus, FiSearch, FiUsers } from 'react-icons/fi';


type PaginationContext = {
  pageSize?: number;
  pageOffset?: number;
};

export default async function AppDashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <main className='h-screen'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col  p-4 w-full rounded-md'>
            <span className='text-lg'>Dashboard Shortcuts</span>
            <span className='text-xs text-zinc-500'>Explore all the shortcuts</span>
          </div>
          <div className=' p-4 w-full rounded-md'>
          <div className="grid grid-cols-12 auto-rows-max gap-2">
            <div className='col-span-2  bg-white rounded-md p-3'>
              <div className='flex flex-col gap-4 items-center justify-evenly' >
                <Image 
                  src={'/female-avatar.png'}
                  width={100}
                  height={100}
                  alt='Navigate clients'
                />
                <Link href={'/home/clients'} className='btn bg-black text-white font-normal w-full'>
                  <FiUsers/>
                  Browse clients
                </Link>
              </div>
              
            </div>
            <div className='col-span-2 flex border rounded-md items-center justify-center'>
              <FiPlus className='text-3xl text-zinc-400'/>
            </div>
          </div>  
          </div>
        </div>
      </main>
    </>
  );
}
