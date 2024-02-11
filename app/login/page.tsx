import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import LoginForm from "./login-form";

export default function Login() {
    return (
        <LoginForm/>
    )
    
}