import { NextRequest, NextResponse } from 'next/server';
import { COUNTRY_LANG, SUPPORTED, fromAcceptLanguage } from './app/lib/languages';

const COOKIE_OPTS = { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' as const };

function apply(res: NextResponse, lang: string) {
  if (lang === 'en') {
    res.cookies.set('googtrans', '', { path: '/', maxAge: 0 });
  } else {
    res.cookies.set('googtrans', `/en/${lang}`, COOKIE_OPTS);
  }
  res.cookies.set('lang_set', '1', COOKIE_OPTS);
  return res;
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 1) Shareable link: https://agency.josephbawo.fun/?lang=zh-CN
  const forced = req.nextUrl.searchParams.get('lang');
  if (forced && SUPPORTED.includes(forced)) return apply(res, forced);

  // 2) The visitor already has a language (auto-detected or chosen by them)
  if (req.cookies.get('lang_set')) return res;

  // 3) First visit: detect from country, then from browser language
  const country = (
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('cf-ipcountry') ||
    ''
  ).toUpperCase();

  const lang = country
    ? COUNTRY_LANG[country] ?? 'en'
    : fromAcceptLanguage(req.headers.get('accept-language'));

  return apply(res, lang);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};