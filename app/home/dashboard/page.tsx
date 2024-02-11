import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import UserPage from "../users/page";
import { Roles } from "@/app/common/enums/roles.enum";
import ClientPage from "../clients/page";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type PaginationContext = {
  pageSize?: number;
  pageOffset?: number;
}

export default async function AppDashboard() {
    const supabase = createServerComponentClient({cookies});
    const {
        data: { user },
      } = await supabase.auth.getUser();

      const {
        data: { session },
      } = await supabase.auth.getSession();
    return(
        <>
            {session?.user?.user_metadata?.role?.role != Roles.ADMIN ? <ClientPage/> : <UserPage/>} 
        </>
    )
}