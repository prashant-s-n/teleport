import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { AuthMessages, ClientMessages } from '@/app/common/constants/messages';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

type MessageRequest = {
  message: string;
  client_id: string;
};

export async function POST(request: NextRequest) {
  const { data } = await request.json();

  const supabase = await createRouteHandlerClient({ cookies });

  const sessionUser = await supabase.auth.getUser();
  const authenticatedUserId = sessionUser.data.user?.id;
  

  const {
    message,
    client_id: clientId
  }: MessageRequest = data;

  const {error} = await supabase.from(SupabaseSchema.public.messages)
    .insert({
      created_by: authenticatedUserId,
      message,
      client_id : clientId,
    });

  return NextResponse.json({
    message: 'Message created.',
  });
}
