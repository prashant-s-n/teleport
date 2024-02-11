import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import BreadcrumbGenerator from '@/app/common/components/breadcrumb-generator';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import OrganizationList from './organization-list';

const cascadingLinks = [
  { name: 'Home', href: '/home' },
  { name: 'Organizations', href: '/home/organizations' },
];

export default async function OrganizationsPage() {
  const supabase = createServerComponentClient({ cookies });

  const auth = await supabase.auth.getUser();

  return (
    <main className='bg-white rounded-md p-4'>
      <div className='flex flex-rows w-100 items-center'>
        <div className='flex flex-1 flex-col'>
          <h1 className='text-xl'>
                        Organizations
          </h1>
          <BreadcrumbGenerator cascadingLinks={cascadingLinks}/>
        </div>
       
      </div>

      <hr className='border-1 border-gray-100'/>
      <OrganizationList/>
    </main>
  );
}
