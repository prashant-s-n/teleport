'use client'
import { SupabaseSchema } from "@/app/common/constants/supabase-schema"
import { UrlConfig } from "@/configs";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { debounce } from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import * as yup from 'yup';

export default function ChatPage(props:{id: string, refresh: boolean}) {
    const router = useRouter();

    const [refreshChat, setRefreshChat] = useState(false);
    const messageInputRef = useRef(null);

    const schema = yup
    .object({
      message: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
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
          data : {...data, client_id: props.id},
        }).then((response) => {
            router.replace(`/home/clients/messages/${props.id}`);
            router.refresh();
            setRefreshChat(true);

            reset();
        }).catch((error) => {
        })
      };

    
    return (
        <form onSubmit={handleSubmit(debouncedClick)}>
        <div className='p-3'>
            <div className='w-full border rounded-md p-3 shadow-sm'>
                <div className='flex flex-row justify-end'>
                    <input {...register('message')} type='text' className='p-2 outline-none w-11/12' placeholder='Type a message' />
                    <button type='submit' className='bg-green-100 p-4 rounded-lg text-green-500 right'>
                        <FiArrowRight className='text-xl' />
                    </button>
                </div>
            </div>
        </div>
        </form>
        
    )   
}