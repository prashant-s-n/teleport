import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Roles } from '@/app/common/enums/roles.enum';
import UserPage from '../users/page';
import ClientPage from '../clients/page';

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
      <ClientPage/>
    </>
  );
}
