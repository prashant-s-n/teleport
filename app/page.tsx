
import Image from 'next/image'
import Auth from './apis/auth/page'
import { Session, SessionContextProvider, useSessionContext } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { Database } from '@/lib/database.types';
import { createClientComponentClient, createPagesBrowserClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import Login from './login/page';
import { cookies } from 'next/headers';
import Home from './home/page';
import { redirect, usePathname } from 'next/navigation';

export default async function App() {  

  const supabase = createServerComponentClient<Database>({cookies});
  
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if(session) {
    redirect('/home');
  }

  
  return (
    <Login/>    
  )
}
