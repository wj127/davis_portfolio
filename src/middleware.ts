import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { device, os } = userAgent(request);
  // Determine the viewport based on the device type.
  let viewport;
  if (!device.type) {
    viewport = ['android', 'ios'].includes(os.name?.toLowerCase() ?? '') ? 'mobile' : 'desktop';
  } else viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

  // Set a cookie with the viewport info (adjust options as needed).
  response.cookies.set('viewport', viewport, { path: '/' });
  return response;
}

// Run the middleware on all paths (adjust matcher as needed)
export const config = {
  matcher: '/(.*)',
};
