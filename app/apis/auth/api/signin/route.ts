import { supabase } from '@/lib/supabase';
import { NextApiRequest } from 'next'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest) {
  const {username, password} = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  })

  return NextResponse.json({
    message: 'Signin successful',
    data,
    error,
  })
}