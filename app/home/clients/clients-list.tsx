/* eslint-disable */
import { SupabaseSchema } from "@/app/common/constants/supabase-schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Client } from "@/app/common/types/user";
import { headers } from "next/headers";
import { Suspense } from "react";
import React from "react";
import ClientWorkspace from "./workspace";


type PaginationContext = {
    pageSize?: number;
    pageOffset?: number;
    query?: string;
}


export default async function ClientsList(
    props: PaginationContext
) {

    let {
        pageOffset,
        pageSize,
        query
    } = props;
    

    if(!pageSize) pageSize = 5;


    const supabase = createServerComponentClient({ cookies });

    const currentPage = pageSize;

    const offset = (currentPage - 1) * pageSize;

    let response;

    if(query && query !== '') {
        response = await supabase.from(SupabaseSchema.public.clients)
                    .select(`
                                        id, 
                                        first_name,
                                        middle_name, 
                                        last_name,
                                        phone, 
                                        email,
                                        gender,
                                        created_at
                                    `)
                    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%`)
                    .order('created_at', {
                        ascending: false,
                    })
                    .limit(10);
    } else {
        response = await supabase.from(SupabaseSchema.public.clients)
                    .select(`
                                        id, 
                                        first_name,
                                        middle_name, 
                                        last_name,
                                        phone, 
                                        email,
                                        gender,
                                        created_at
                                    `)
                    .order('created_at', {
                        ascending: false,
                    })
                    .limit(10);
    }

    const clients = response.data as unknown as Client[];

    // if (!clients?.length && query) {
    //     return (
            
    //         <main className="p-6 bg-white items-center flex justify-center ">
                
    //             <h1>
    //                 No clients found
    //             </h1>
    //         </main>
    //     )
    // }

    return (
        <>
            <Suspense fallback={<p>Loading client workspace...</p>}>
                <ClientWorkspace currentPage={currentPage} clients={clients} resultId={''}/>
            </Suspense>
        </>
    )
}

//export const dynamic = 'force-dynamic'
