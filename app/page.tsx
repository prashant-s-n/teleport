import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Login from './login/page';

export default async function App() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/home');
  }

  return (
    <Login/>
  );
}
