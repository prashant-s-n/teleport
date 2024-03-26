import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { AuthMessages, ClientMessages } from '@/app/common/constants/messages';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ResponseProtocol } from '@/app/common/types/response-protocol';

export const dynamic = "force-dynamic";

type MessageRequest = {
  message: string;
  client_id: string;
};

export async function GET(req: NextRequest) {
  const response: ResponseProtocol = {
    status: 400,
    message: 'Error encountered',
  };

  try {
    const supabase = await createRouteHandlerClient({ cookies });

    const messages = await supabase
      .from(SupabaseSchema.public.messages)
      .select('*')
      .order('created_at', { ascending: true });
      
    return NextResponse.json({
      ...response,
      status: 200,
      message: 'Messages fetched',
      data: messages.data,
    });
  } catch (error: any) {
    return NextResponse.json(response);
  }
}

export async function POST(request: NextRequest) {
  const { data } = await request.json();

  const supabase = await createRouteHandlerClient({ cookies });

  const sessionUser: any = await supabase.auth.getUser();
  const authenticatedUserId: string = sessionUser?.data?.user?.id;
  
  const {
    message,
    client_id: clientId
  }: MessageRequest = data;

  const {error} = await supabase.from(SupabaseSchema.public.messages)
    .insert({
      created_by: authenticatedUserId,
      message,
      client_id : clientId,
      user_id: authenticatedUserId
    });

  return NextResponse.json({
    message: 'Message created.',
  });
}
