'use client';
import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import moment from 'moment';

import { FiArrowLeft, FiMessageCircle } from 'react-icons/fi';
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import ChatPage from './chat';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';
import { FcAbout, FcInfo, FcMultipleSmartphones, FcNeutralTrading } from 'react-icons/fc';
import Image from 'next/image';


export default function UserMessagesPage({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();

  const [userMessages, setUserMessages] = useState<any>([])

  function getMessages() {
      return new Promise((resolve, reject) => {
        supabase.from(SupabaseSchema.public.messages)
        .select(`
            id, 
            message,
            created_at,
            users (
            first_name,
            last_name,
            roles (
                canonical_name
            )
            )
        `)
        .eq('client_id', params.id)
        .order('created_at', {
            ascending: false,
        })
        .then(messages => setUserMessages(messages))
        
      })
    
  }

  useEffect(() => {
    getMessages();
    

  }, [])
  
    return (
        <main className='p-0 h-screen flex justify-left flex-col gap-4 w-full'>
            <div className='flex w-full flex-col'>
                {/* <div className='p-8 shadow-md mb-2'>
                    <span className='text-xl'>
                        <Link href={'/home/clients'} className='cursor-pointer'>
                        <FiArrowLeft className='inline mr-3' /> 
                        </Link>
                        Messages
                    </span>
                </div> */}
                {/* <div className=''>
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
                </div> */}
                <div className='w-full mb-2'>
                  <ChatPage id={params.id} refresh={false} getMessagesTrigger={getMessages}/>
                </div>
                <div className='flex flex-col gap-3'>
                
                
                    {userMessages?.data?.map((message:any) => (
                        <>
                            <div className='flex flex-row p-4 bg-white rounded-lg' key={message.id}>
                            <div className='flex flex-col items-center justify-center p-4'>
                                <Image
                                    src={'/male-avatar.png'}
                                    width={40}
                                    height={40}
                                    alt={'Staff profile image'}
                                />
                            </div>
                                <div className='flex flex-col items-start justify-items-start'>
                                <div className='flex w-full'>
                                    <span className='text-sm text-zinc-400'>
                                        <span className='text-zinc-500'>{message?.users?.first_name} {message?.users?.last_name} </span>
                                        added a note
                                    </span>
                                </div>
                                <div className='flex w-full py-1 items-start text-left justify-items-left'>
                                    <span className='text-md text-zinc-700'>
                                        {message.message}
                                    </span>
                                </div>
                                <div className='flex w-full py-1'>
                                    <span className='text-xs text-zinc-400'>
                                    {moment(message?.created_at).format('DD MMM YYYY hh:mm A')}
                                    </span>
                                </div>
                                </div>
                                
                            </div>
                        </>
                    ))}
                
                    
                
                </div>
                
            </div>
        </main>
    );
}
