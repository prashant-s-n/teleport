import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import moment from 'moment';
import { cookies } from 'next/headers';
import { FiArrowLeft, FiMessageCircle } from 'react-icons/fi';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import ChatPage from './chat';
import Link from 'next/link';

export default async function UserMessagesPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({cookies})
  const userMessages = await supabase.from(SupabaseSchema.public.messages)
                      .select(`
                          id, 
                          message,
                          created_at,
                          users (
                            first_name,
                            last_name
                          )
                      `)
                      .eq('client_id', params.id)
                      .order('created_at', {
                          ascending: true,
                      })
    return (
        <main className='p-0 bg-white h-screen flex justify-left items-center flex-col gap-4'>
            <div className='flex w-full flex-col'>
                <div className='p-8 shadow-md mb-2'>
                    <span className='text-xl'>
                        <Link href={'/home/clients'} className='cursor-pointer'>
                        <FiArrowLeft className='inline mr-3' /> 
                        </Link>
                        Messages
                    </span>
                </div>
                <div className=''>
                {userMessages?.data?.map((message:any) => (
                    <div className="chat chat-end mb-3" key={message.id}>
                        <div className="chat-bubble bg-zinc-100 text-zinc-500 mb-1">{message.message}</div>
                        <div className="chat-footer opacity-50 text-xs">
                            Sent at {moment(message?.created_at).format('DD/MM/YYYY hh:mm A')}&nbsp;
                            by {message?.users?.first_name}&nbsp;
                            {message?.users?.last_name}
                        </div>
                    </div>
                ))}
                </div>
                <div className='w-full'>
                  <ChatPage id={params.id} refresh={false}/>
                </div>
            </div>
        </main>
    );
}
