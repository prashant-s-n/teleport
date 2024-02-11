import { SupabaseSchema } from '@/app/common/constants/supabase-schema';
import { supabase } from '@/lib/supabase';
import { NextApiRequest } from 'next'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Auth from '../../page';
import { AuthMessages } from '@/app/common/constants/messages';

type SignupRequest = {
  email : string;
  role: string;
  location: string;
  gender: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string | Date;
  password: string;
  phone: string;
}

export async function POST(request: NextRequest) {

  const {data : data} = await request.json();

  const {
    email,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    dob,
    gender,
    location,
    role,
    password,
    phone,
  }: SignupRequest = data;

  // Check if the user is already registered.
  const user = await supabase.from(SupabaseSchema.public.users)
              .select('*')
              .eq('email', data.email)
              .limit(1);
  const roleInfo = await supabase.from(SupabaseSchema.public.roles)
              .select('id, role, canonical_name')
              .eq('id', role)
              .limit(1);
              
  if(user.error) {
    return NextResponse
          .json({
            message : AuthMessages.SIGNUP_FAILED,
            errors: [user.error]
          }, { status: 500});
  }

  if(user?.data?.length) {
    return NextResponse
          .json({
            message : AuthMessages.USERNAME_EXISTS,
            errors: [user.error]
          }, { status: 409});
  }

  const { data : signUpData, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    phone: phone,
    options: {
        data: {
            applications : {
                name : 'Teleport',
            },
            role : {
              ...roleInfo.data?.at(0)
            }
        }
    }
  })

  if(error || !signUpData?.user) {
    return NextResponse
          .json({
            message : AuthMessages.SERVICE_ERROR,
            errors: [user.error]
          }, { status: 409});
  }

  await supabase.from(SupabaseSchema.public.users)
  .insert({
    user_id : signUpData?.user.id,
    role_id : role,
    branch : location,
    email : email,
    first_name: firstName,
    middle_name: middleName,
    last_name : lastName,
    dob : dob,
    gender: gender,
    phone: phone,
  });

  return NextResponse.json({
    message: 'Signup successful',
  })
}