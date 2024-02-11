import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  });

  return NextResponse.json({
    message: 'Signin successful',
    data,
    error,
  });
}
