import { SupabaseSchema } from "@/app/common/constants/supabase-schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function UserDetails( {params }: { params: { id: string } }) {

    const supabase = createServerComponentClient({ cookies });

    const response = await supabase.from(SupabaseSchema.public.users)
                .select(`
                            id, 
                            first_name,
                            middle_name, 
                            last_name,
                            is_active,
                            email,
                            gender,
                            phone,
                            created_at,
                            office_branches (id, branch_name, address),
                            roles (id, role, canonical_name)
                        `)
                .eq('id', params.id)
                .eq('is_active', true);

        const user = response?.data?.at(0);
        const userBranch = user?.office_branches as any;
        const userRole = user?.roles as any;
    if(!response.data?.length) {
        return (
            <main className="p-6 bg-white items-center flex justify-left flex-col gap-4">
                <span className="text-xl">
                    No user found
                </span>
            </main>
        )
    }

    return (
        <main className="p-6 bg-white items-center flex justify-left flex-col gap-4">
            <div className="w-full flex flex-col">
                <div className="w-full mb-10">
                    <span className="text-2xl">
                        {user?.first_name} {user?.middle_name} {user?.last_name}
                    </span>
                </div>
                <div className="w-full flex flex-col  mb-3">
                    <span className="text-xs text-zinc-400">
                        Branch
                    </span>
                    <span className="text-md">
                        {userBranch.branch_name}
                    </span>
                </div>
                
                <div className="w-full flex flex-col mb-3">
                    <span className="text-xs text-zinc-400">
                        Role
                    </span>
                    <span className="text-md">
                        {userRole.canonical_name}
                    </span>
                </div>

                <div className="w-full flex flex-col mb-3">
                    <span className="text-xs text-zinc-400">
                        Email
                    </span>
                    <span className="text-md">
                        {user?.email}
                    </span>
                </div>


                <div className="w-full flex flex-col mb-3">
                    <span className="text-xs text-zinc-400">
                        Gender
                    </span>
                    <span className="text-md">
                        {user?.gender}
                    </span>
                </div>

                <div className="w-full flex flex-col mb-3">
                    <span className="text-xs text-zinc-400">
                        Phone
                    </span>
                    <span className="text-md">
                        {user?.phone ? user.phone : '-'}
                    </span>
                </div>

                <div className="w-full flex flex-col mb-3">
                    <span className="text-xs text-zinc-400">
                        Created at (Indian Standard Time)
                    </span>
                    <span className="text-md">
                        {moment(user?.created_at).format('DD/MM/YYYY hh:mm A')}
                    </span>
                </div>

                <div className="w-full flex flex-col mb-3">
                    <span className="text-xs text-zinc-400">
                        Current Status
                    </span>
                    {
                        user?.is_active && 
                        <span className="text-md text-green-400">
                            Active
                        </span>
                    }
                    {
                        !user?.is_active && 
                        <span className="text-md text-zinc-400">
                            Inactive
                        </span>
                    }
                </div>
            </div>
        </main>
    )
}