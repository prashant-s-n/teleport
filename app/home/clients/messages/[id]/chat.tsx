'use client'
import { SupabaseSchema } from "@/app/common/constants/supabase-schema"
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import { useEffect, useState } from "react";

export default function ChatPage(props:{id: string, refresh: boolean}) {
    const supabase = createClientComponentClient();

    const [messages, setMessages] = useState<any>([])

    function getMessages() {
        const userMessages = supabase.from(SupabaseSchema.public.messages)
            .select(`
                id, 
                message,
                created_at
            `)
            .eq('client_id', props.id)
            .order('created_at', {
                ascending: true,
            })
            .then(data => {
                setMessages(data.data)
            })
    }

    useEffect(() => {
        getMessages()
    }, [props.refresh])

    
    return (
        <>
            {messages?.map((message:any) => (
                <div className="chat chat-end mb-3">
                    <div className="chat-bubble bg-zinc-100 text-zinc-500 mb-1">{message.message}</div>
                    <div className="chat-footer opacity-50 text-xs">
                        Send at {moment(message?.created_at).format('DD/MM/YYYY hh:mm A')}
                    </div>
                </div>
            ))}
        </>
        
    )   
}