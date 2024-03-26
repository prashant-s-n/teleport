import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { AuthMessages, ClientMessages } from '@/app/common/constants/messages';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ResponseProtocol } from '@/app/common/types/response-protocol';

type ClientCreationRequest = {
  email : string;
  address: string;
  gender: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string | Date;
  phone: string;
};

export async function POST(request: NextRequest) {
  const { data } = await request.json();

  const supabase = await createRouteHandlerClient({ cookies });

  const sessionUser = await supabase.auth.getUser();
  const authenticatedUserId = sessionUser.data.user?.id;

  const {
    email,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    dob,
    gender,
    address,
    phone,
  }: ClientCreationRequest = data;

  // Check if the client is already registered.
  const client = await supabase.from(SupabaseSchema.public.clients)
    .select('*')
    .eq('phone', data.phone)
    .limit(1);
  
  if (client.error) {
    return NextResponse
      .json({
        message: ClientMessages.ERROR,
        errors: [client.error],
      }, { status: 500 });
  }

  if (client?.data?.length) {
    return NextResponse
      .json({
        message: ClientMessages.DUPLICATE_CLIENT,
        errors: [client.error],
      }, { status: 409 });
  }

  const {error} = await supabase.from(SupabaseSchema.public.clients)
    .insert({
      created_by: authenticatedUserId,
      email,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      dob,
      gender,
      phone,
      address,
    });

  return NextResponse.json({
    message: 'Client created successfully',
  });
}


