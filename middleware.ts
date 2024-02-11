import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'
import { Roles } from './app/common/enums/roles.enum'
import { AdminRouteMap } from './app/common/constants/route-maps/admin.route-map'
import { headers } from 'next/headers'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('original_url', req.url)

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session?.user.id) {
    
    const isAdmin = session?.user?.user_metadata?.role?.role === Roles.ADMIN;
    const isSuperAdmin = session?.user?.user_metadata?.role?.role === Roles.SUPERADMIN; 

    if(!isAdmin && !isSuperAdmin && AdminRouteMap.some((routeMap) => req.nextUrl.pathname.startsWith(routeMap))) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/home/';
      return NextResponse.redirect(redirectUrl)
    }
    
    // Authentication successful, forward request to protected route.
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }


  if(req.nextUrl.pathname != '/' && !req.nextUrl.pathname.startsWith('/apis') && !req.nextUrl.pathname.endsWith('.png')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
     
  }
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|login).*)',
  ],
}