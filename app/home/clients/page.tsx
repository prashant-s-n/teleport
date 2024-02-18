import { FiPlus, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import BreadcrumbGenerator from '@/app/common/components/breadcrumb-generator';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ClientsList from './clients-list';

const cascadingLinks = [
  { name: 'Home', href: '/home' },
  { name: 'Clients', href: '/home/clients' },
];

export default async function ClientPage() {
  const supabase = createServerComponentClient({ cookies });

  const auth = await supabase.auth.getUser();

  return (
    <main className='bg-white rounded-md p-4'>
      <div className='flex flex-rows w-100 items-center'>
        <div className='flex flex-1 flex-col'>
          <h1 className='text-xl'>
                        Clients
          </h1>
          <BreadcrumbGenerator cascadingLinks={cascadingLinks}/>
        </div>
        <div className='flex flex-none items-center p-3'>
          <Link href={'/home/clients/create'} className='btn bg-green-500 text-green-100 btn-md'>
            <FiPlus className='text-xl'/>
          </Link>
        </div>
      </div>

      <hr className='border-1 border-gray-100'/>
      <ClientsList/>
    </main>
  );
}
