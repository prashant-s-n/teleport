/* eslint-disable */
import { SupabaseSchema } from "@/app/common/constants/supabase-schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as moment from 'moment';
import ClientInfo from "./clients-info";
import { Client, User } from "@/app/common/types/user";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { headers } from "next/headers";
import Pagination from "@/app/common/components/pagination";
import { Suspense } from "react";
import React from "react";
import { FiMessageCircle, FiMessageSquare } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import Link from "next/link";



type PaginationContext = {
    pageSize?: number;
    pageOffset?: number;
}


export default async function ClientsList()   {
    const heads = headers()

    const originalUrl = heads.get('original_url') as string;
    const searchParams = originalUrl ? new URL(originalUrl)?.searchParams : null;

    const supabase = createServerComponentClient({ cookies });

    const { count, error } = await supabase
    .from(SupabaseSchema.public.clients)
    .select('*', { count: 'exact', head: true });

    const currentPage = Number(searchParams?.get('page_size')) || 1;
    
    const pageSize = 20;
    const totalCount: number = Number(count);
    const totalPages = Math.ceil(totalCount / pageSize);

    const offset = (currentPage - 1) * pageSize;
    
    const response = await supabase.from(SupabaseSchema.public.clients)
                .select(`
                            id, 
                            first_name,
                            middle_name, 
                            last_name,
                            email,
                            gender,
                            created_at
                        `)
                .order('created_at', {
                    ascending: false,
                })
                .range(offset, offset + pageSize - 1)
        
    const clients = response.data as unknown as Client[];  

    if (!clients?.length) {
        return (
            <main className="p-6 bg-white items-center flex justify-center ">
                <h1>
                    No clients found
                </h1>
            </main>
        )
    }

    return (
        <>
        <Suspense fallback={<p>Loading feed...</p>}>
            <div className="overflow-x-auto">
                <table className="table text-md">
                    {/* head */}
                    <thead>
                        <tr className="h-10">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Messages</th>
                            <th>Transactions</th>
                            <th>
                                Created at<br/>
                                <span className="text-xs text-zinc-400">Indian Standard Time</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            clients?.map((client, index) => (
                                <tr key={`client-list-${index}`}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <span className="text-md block">{client.first_name} {client.middle_name} {client.last_name}</span>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    <span className="text-md text-zinc-400 block">{client.email}</span>
                                    </td>
                                    
                                    <td>
                                        <Link href={`/home/clients/messages/${client.id}`} className="btn bg-zinc-100 btn-md">
                                        <FiMessageCircle className="text-2xl"/>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link href={'/'} className="btn bg-green-100 text-green-500 btn-md">
                                            <MdCurrencyRupee className="text-xl"/>
                                        </Link>
                                    </td>

                                    <td>{moment.default(client?.created_at).format('DD/MM/YYYY hh:mm A')}</td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination basePath="/home/users" currentPage={currentPage} totalPages={totalPages}/>
            </div>
            </Suspense>
        </>
    )
}

//export const dynamic = 'force-dynamic'
