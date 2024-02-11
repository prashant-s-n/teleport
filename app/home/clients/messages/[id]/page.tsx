'use client';
import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import { UrlConfig } from '@/configs';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { debounce } from 'lodash';
import moment from 'moment';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiMessageCircle, FiSend } from 'react-icons/fi';
import ChatPage from './chat';

export default function UserMessagesPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    const [refreshChat, setRefreshChat] = useState(false);

    const schema = yup
    .object({
      message: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
    
    const debouncedClick = useCallback(debounce((data) => {
        onSubmit(data);
      }, 3000, { leading: true, trailing: false, maxWait: 1000 }), []);
    
      const onSubmit = (data: any) => {
        const url = new URL('apis/messages', UrlConfig.API_BASE_URL);
    
        axios.post(url.toString(), {
          data : {...data, client_id: params.id},
        }).then((response) => {
            router.replace(`/home/clients/messages/${params.id}`);
            router.refresh();
            setRefreshChat(true);
        }).catch((error) => {
        })
      };

    return (
        <main className='p-6 bg-white h-screen flex justify-left items-center flex-col gap-4'>
            
            <div className='flex w-full flex-col'>
                <div className='p-3'>
                    <span className='text-xl'>
                        <FiMessageCircle className='inline' /> Messages
                    </span>
                </div>
                <div className='p-3 h-1/2 overflow-scroll'>
                    <ChatPage id={params.id} refresh={refreshChat}/>
                </div>
                <form onSubmit={handleSubmit(debouncedClick)}>
                <div className='p-3'>
                    <div className='w-full border rounded-md p-3'>
                        <div className='flex flex-row'>
                            <input {...register('message')} type='text' className='p-2 outline-none w-11/12' placeholder='Type a message' />
                            <button type='submit' className='btn btn-primary text-white right'>
                                <FiArrowRight className='text-xl' />
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </main>
    );
}
