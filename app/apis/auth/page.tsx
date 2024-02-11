"use client";
import { useSessionContext, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Suspense, useEffect, useState } from "react";
import Login from "../../login/page";
import { redirect } from "next/navigation";

export default function Auth() { 
    const supabase = useSupabaseClient();
    const session = useSessionContext();
    const user = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function handleSignOut() {
        const {error} = await supabase.auth.signOut();

        if(error) {
            alert(error);
        }
    }

    useEffect(() => {
        setIsLoading(false);
        
    },[]);

    if(isLoading) {
        return (
            <Suspense>
                Loading...
            </Suspense>
        );
    }

    if(!session && !user) {
        return (
            <Login/>
        )
    }

    
    if(session && user) {
        redirect('/home');
    }

    
}