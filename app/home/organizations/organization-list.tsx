/* eslint-disable */
import { SupabaseSchema } from "@/app/common/constants/supabase-schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as moment from 'moment';
import { Organization, User } from "@/app/common/types/user";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { headers } from "next/headers";
import Pagination from "@/app/common/components/pagination";
import { Suspense } from "react";
import React from "react";


type PaginationContext = {
    pageSize?: number;
    pageOffset?: number;
}


export default async function OrganizationList()   {
    const heads = headers()

    const originalUrl = heads.get('original_url') as string;
    const searchParams = originalUrl ? new URL(originalUrl)?.searchParams : null;

    const supabase = createServerComponentClient({ cookies });

    const { count, error } = await supabase
    .from(SupabaseSchema.public.organizations)
    .select('*', { count: 'exact', head: true })


    const currentPage = Number(searchParams?.get('page_size')) || 1;
    
    const pageSize = 20;
    const totalCount: number = Number(count);
    const totalPages = Math.ceil(totalCount / pageSize);

    const offset = (currentPage - 1) * pageSize;
    
    const response = await supabase.from(SupabaseSchema.public.organizations)
                .select(`
                            id, 
                            name,
                            created_at
                        `)
                .order('created_at', {
                    ascending: false,
                })
                .range(offset, offset + pageSize - 1)
        
    const organizations = response.data as unknown as Organization[];  

    if (!organizations?.length) {
        return (
            <main className="p-6 bg-white items-center flex justify-center ">
                <h1>
                    No organization found
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
                            <th>Created at</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            organizations?.map((organization, index) => (
                                <tr key={`user-list-${index}`}>
                                    
                                    <td>{organization.name}</td>
                                            
                                            
                                    <td>{moment.default(organization?.created_at).format('DD/MM/YYYY hh:mm A')}</td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination basePath="/home/organizations" currentPage={currentPage} totalPages={totalPages}/>
            </div>
            </Suspense>
        </>
    )
}

//export const dynamic = 'force-dynamic'
