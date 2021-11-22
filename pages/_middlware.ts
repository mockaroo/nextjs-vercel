// import { NextRequest, NextResponse } from 'next/server'

// export default function middleware(req: NextRequest) {
//   const basicAuth = req.headers.get('authorization')

//   if (basicAuth) {
//     const auth = basicAuth.split(' ')[1]
//     const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

//     if (user === 'user' && pwd === 'password') {
//       return NextResponse.next()
//     }
//   }

//   return new Response('Auth required', {
//     status: 401,
//     headers: {
//       'WWW-Authenticate': 'Basic realm="Secure Area"',
//     },
//   })
// }

import type { NextRequest } from 'next/server';

// Block GB, prefer US
const BLOCKED_COUNTRY = 'GB';

export function middleware(req: NextRequest) {
  const country = req.geo.country || 'US';

  // If the request is from the blocked country,
  // send back a response with a status code
  if (country === BLOCKED_COUNTRY) {
    return new Response('Blocked for legal reasons', { status: 451 });
  }

  // Otherwise, send a response with the country
  return new Response(`Greetings from ${country}, where you are not blocked.`);
}