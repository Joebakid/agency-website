import { NextRequest, NextResponse } from 'next/server';
import { COUNTRY_LANG, SUPPORTED, fromAcceptLanguage } from './app/lib/languages';

const ONE_YEAR = 60 * 60 * 24 * 365;
const COOKIE_OPTS = { path: '/', maxAge: ONE_YEAR, sameSite: 'lax' as const };

// ?country=XX works on localhost, or on the live site while ALLOW_COUNTRY_TEST=true
const TEST_ENABLED =
  process.env.NODE_ENV === 'development' || process.env.ALLOW_COUNTRY_TEST === 'true';

function apply(res: NextResponse, lang: string) {
  if (lang === 'en') {
    res.cookies.set('googtrans', '', { path: '/', maxAge: 0 });
  } else {
    res.cookies.set('googtrans', `/en/${lang}`, COOKIE_OPTS);
  }
  res.cookies.set('lang_set', '1', COOKIE_OPTS);
  return res;
}

function reset(res: NextResponse) {
  res.cookies.set('googtrans', '', { path: '/', maxAge: 0 });
  res.cookies.set('lang_set', '', { path: '/', maxAge: 0 });
  return res;
}

function detect(req: NextRequest): string {
  const country = (
    req.headers.get('x-vercel-ip-country') || // Vercel
    req.headers.get('cf-ipcountry') ||        // Cloudflare
    ''
  ).toUpperCase();

  if (country && country !== 'XX' && country !== 'T1') {
    return COUNTRY_LANG[country] ?? 'en';
  }
  return fromAcceptLanguage(req.headers.get('accept-language'));
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const params = req.nextUrl.searchParams;

  // 1) Test link: https://agency.josephbawo.fun/?country=JP (overrides header and saved choice)
  const testCountry = TEST_ENABLED ? (params.get('country') || '').toUpperCase() : '';
  if (testCountry) return apply(res, COUNTRY_LANG[testCountry] ?? 'en');

  const param = params.get('lang');

  // 2) ?lang=auto -> forget the saved choice and detect again
  if (param === 'auto') {
    const lang = detect(req);
    reset(res);
    return apply(res, lang);
  }

  // 3) ?lang=zh-CN -> shareable link that forces a language
  if (param && SUPPORTED.includes(param)) return apply(res, param);

  // 4) The visitor already has a language (auto-detected or chosen from the menu)
  if (req.cookies.get('lang_set')) return res;

  // 5) First visit: detect from country, then from browser language
  return apply(res, detect(req));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};