import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies, headers } from 'next/headers';
import { jwtVerify } from 'jose';
import { DEFAULT_LOGIN_REDIRECT, authRoutes, privateRoutes } from './routes';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();

  const currentURL = request.nextUrl.pathname;

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  // const user = local

  const authRoute = authRoutes.includes(currentURL);
  const pvtRoute = privateRoutes.includes(currentURL);

  const secretKey = 'accessSecret';
  const key = Buffer.from(secretKey, 'utf-8');

  let isTokenVerified = null;
  try {

    // isTokenVerified = await jwtVerify(accessToken, key, {
    //   algorithms: ['HS256'],
    // });

    // if (authRoute && isTokenVerified) {
    //   return NextResponse.redirect(request.nextUrl.host + '/');
    // }

    // if (!isTokenVerified && pvtRoute) {
    //   console.log('I am triggering')
    //   return NextResponse.redirect(
    //     request.nextUrl.origin + DEFAULT_LOGIN_REDIRECT
    //   );
    // }

    // if (!accessToken && pvtRoute) {
    //   console.log('I am triggering');
    //   return NextResponse.redirect(
    //     request.nextUrl.origin + DEFAULT_LOGIN_REDIRECT
    //   );
    // }

    if(accessToken && authRoute) {
      return NextResponse.redirect(request.nextUrl.host + '/');
    }

    


  } catch (error) {
    // if (!isTokenVerified && pvtRoute) {
    //   return NextResponse.redirect(
    //     request.nextUrl.origin + DEFAULT_LOGIN_REDIRECT
    //   );
    // }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
