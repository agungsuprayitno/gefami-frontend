import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
    // Getting cookies from the request using the `RequestCookies` API

    let hasToken = request.cookies.has('auth_token')
    if(!hasToken){
      return NextResponse.redirect(new URL('/', request.url))
    } else {
      const response = NextResponse.next()
      return response
    }
//   return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/movie/:path*',
}