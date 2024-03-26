import BreadcrumbGenerator from '@/app/common/components/breadcrumb-generator';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ClientsList from './clients-list';
import CreateClientDialog from './create/dialog';

const cascadingLinks = [
  { name: 'Home', href: '/home' },
  { name: 'Clients', href: '/home/clients' },
];

interface SearchPageProps {
  searchParams: { query?: string, page_size?: number, page_no?: number };
}

export default async function ClientPage({
  searchParams: { query, page_no, page_size },
}: SearchPageProps) {
  const supabase = createServerComponentClient({ cookies });

  const auth = await supabase.auth.getUser();

  return (
    <main className=' rounded-md'>
      <div className='flex flex-rows w-100 items-center'>
        <div className='flex flex-1 flex-col'>
          <h1 className='text-xl'>
                        Clients
          </h1>
          <BreadcrumbGenerator cascadingLinks={cascadingLinks}/>
        </div>
        <CreateClientDialog/>
      </div>

      <hr className='border-1 border-gray-100'/>
      <ClientsList
        pageOffset={page_no}
        pageSize={page_size}
        query={query}
      />
    </main>
  );
}
