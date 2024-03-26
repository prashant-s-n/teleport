import { SupabaseSchema } from "@/app/common/constants/supabase-schema";
import { ResponseProtocol } from "@/app/common/types/response-protocol";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } },
  ) {
    const response: ResponseProtocol = {
      status: 400,
      message: 'Error encountered',
    };
  
    const clientId: string = params.slug;
  
    try {
      const supabase = await createRouteHandlerClient({ cookies });
  
      const users = await supabase
        .from(SupabaseSchema.public.clients)
        .select('*')
        .eq('id', clientId)
        .limit(1);
  
      return NextResponse.json({
        ...response,
        status: 200,
        message: 'Client fetched',
        data: users.data?.at(0),
      });
    } catch (error: any) {
      return NextResponse.json(response);
    }
  }