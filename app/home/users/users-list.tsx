import { SupabaseSchema } from "@/app/common/constants/supabase-schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as moment from 'moment';
import UserInfo from "./users-info";
import { User } from "@/app/common/types/user";
import { GetServerSideProps, InferGetServerSidePropsType, Metadata } from "next";
import { headers } from "next/headers";
import Pagination from "@/app/common/components/pagination";
import { Suspense } from "react";
import React from "react";

interface UserListProps {
    page_no: any;
}


export default async function UserList(
    { page_no: pageNo }: UserListProps
) {
    const heads = headers()
    const supabase = createServerComponentClient({ cookies });

    const { count, error } = await supabase
        .from(SupabaseSchema.public.users)
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

    const currentPage = Number(pageNo) || 1;

    const pageSize = 10;
    const totalCount: number = Number(count);
    const totalPages = Math.ceil(totalCount / pageSize);

    const offset = (currentPage - 1) * pageSize;

    const response = await supabase.from(SupabaseSchema.public.users)
        .select(`
                            id, 
                            first_name,
                            middle_name, 
                            last_name,
                            is_active,
                            email,
                            gender,
                            created_at,
                            office_branches (id, branch_name),
                            roles (id, role, canonical_name)
                        `)
        .eq('is_active', true)
        .order('created_at', {
            ascending: false,
        })
        .range(offset, offset + pageSize - 1)

    const users = response.data as unknown as User[];

    if (!users?.length) {
        return (
            <main className="p-6 bg-white items-center flex justify-center ">
                <h1>
                    No users found
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
                                <th>Role</th>
                                <th>Current status</th>
                                <th>Created at</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                users?.map((user, index) => (
                                    <tr key={`user-list-${index}`}>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-green-100 text-neutral-content rounded-full w-10 mr-3">
                                                        <span className="text-xl text-green-600">{user.first_name.split('').at(0)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-md block">{user.first_name} {user.middle_name} {user.last_name}</span>
                                                    <span className="text-sm text-zinc-400">{user.office_branches.branch_name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user?.roles?.canonical_name}</td>
                                        <td>{user?.is_active ? 'Active' : 'Inactive'}</td>
                                        <td>{moment.default(user?.created_at).format('DD/MM/YYYY hh:mm A')}</td>
                                        <th>
                                            <UserInfo userId={user.id} />
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination basePath="/home/users" currentPage={currentPage} totalPages={totalPages} />
                </div>
            </Suspense>
        </>
    )
}

//export const dynamic = 'force-dynamic'
