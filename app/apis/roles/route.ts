import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import { ResponseProtocol } from '@/app/common/types/response-protocol';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const response: ResponseProtocol = {
    status: 400,
    message: 'Error encountered',
  };

  try {
    const supabase = await createRouteHandlerClient({ cookies });

    const roles = await supabase
      .from(SupabaseSchema.public.roles)
      .select('*')
      .order('canonical_name', { ascending: true });

    return NextResponse.json({
      ...response,
      status: 200,
      message: 'Roles fetched',
      data: roles.data,
    });
  } catch (error: any) {
    return NextResponse.json(response);
  }
}
