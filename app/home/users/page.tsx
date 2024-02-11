import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import BreadcrumbGenerator from '@/app/common/components/breadcrumb-generator';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UsersList from './users-list';

const cascadingLinks = [
  { name: 'Home', href: '/home' },
  { name: 'Users', href: '/home/users' },
];

export default async function UserPage() {
  const supabase = createServerComponentClient({ cookies });

  const auth = await supabase.auth.getUser();

  return (
    <main className='bg-white rounded-md p-4'>
      <div className='flex flex-rows w-100 items-center'>
        <div className='flex flex-1 flex-col'>
          <h1 className='text-xl'>
                        Users
          </h1>
          <BreadcrumbGenerator cascadingLinks={cascadingLinks}/>
        </div>
        <div className='flex flex-none items-center p-3'>
          <Link href={'/home/users/create'} className='btn bg-green-500 text-green-100 btn-md'>
            <FiUser/>
                        Create new
          </Link>
        </div>
      </div>

      <hr className='border-1 border-gray-100'/>
      <UsersList/>
    </main>
  );
}
