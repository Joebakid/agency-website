import { NextRequest, NextResponse } from 'next/server';
import { COUNTRY_LANG, SUPPORTED, fromAcceptLanguage } from './app/lib/languages';

const ONE_YEAR = 60 * 60 * 24 * 365;
const COOKIE_OPTS = { path: '/', maxAge: ONE_YEAR, sameSite: 'lax' as const };

// Set a language: English clears the translation cookie, anything else sets it
function apply(res: NextResponse, lang: string) {
  if (lang === 'en') {
    res.cookies.set('googtrans', '', { path: '/', maxAge: 0 });
  } else {
    res.cookies.set('googtrans', `/en/${lang}`, COOKIE_OPTS);
  }
  res.cookies.set('lang_set', '1', COOKIE_OPTS);
  return res;
}

// Forget everything so detection runs again
function reset(res: NextResponse) {
  res.cookies.set('googtrans', '', { path: '/', maxAge: 0 });
  res.cookies.set('lang_set', '', { path: '/', maxAge: 0 });
  return res;
}

function detect(req: NextRequest): string {
  let country = (
    req.headers.get('x-vercel-ip-country') || // Vercel
    req.headers.get('cf-ipcountry') ||        // Cloudflare
    ''
  ).toUpperCase();

  // Local testing only: http://localhost:3000/?country=JP
  if (!country && process.env.NODE_ENV === 'development') {
    country = (req.nextUrl.searchParams.get('country') || '').toUpperCase();
  }

  // Country found: use its language (countries not listed stay English)
  if (country && country !== 'XX' && country !== 'T1') {
    return COUNTRY_LANG[country] ?? 'en';
  }

  // No country available: fall back to the browser language
  return fromAcceptLanguage(req.headers.get('accept-language'));
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const param = req.nextUrl.searchParams.get('lang');

  // 1) ?lang=auto -> forget the saved choice and detect again (good for testing)
  if (param === 'auto') {
    const lang = detect(req);
    reset(res);
    return apply(res, lang);
  }

  // 2) ?lang=zh-CN -> shareable link that forces a language
  if (param && SUPPORTED.includes(param)) return apply(res, param);

  // 3) The visitor already has a language (auto-detected or chosen from the menu)
  if (req.cookies.get('lang_set')) return res;

  // 4) First visit: detect from country, then from browser language
  return apply(res, detect(req));
}

export const config = {
  // Skip API routes, Next.js internals and files with an extension (images, fonts, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};