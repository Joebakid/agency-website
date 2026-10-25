export type Lang = { code: string; label: string; short: string };

export const LANGUAGES: Lang[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh-CN', label: '中文 (简体)', short: '中文' },
  { code: 'zh-TW', label: '中文 (繁體)', short: '繁體' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'nl', label: 'Nederlands', short: 'NL' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'ja', label: '日本語', short: '日本語' },
  { code: 'ko', label: '한국어', short: '한국어' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
];

export const SUPPORTED = LANGUAGES.map((l) => l.code);

// Country (ISO code) -> language. Any country not listed stays in English.
export const COUNTRY_LANG: Record<string, string> = {
  CN: 'zh-CN', SG: 'zh-CN', TW: 'zh-TW', HK: 'zh-TW', MO: 'zh-TW',
  FR: 'fr', BE: 'fr', SN: 'fr', CI: 'fr', CM: 'fr',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt',
  DE: 'de', AT: 'de', CH: 'de',
  IT: 'it', NL: 'nl', RU: 'ru', TR: 'tr',
  JP: 'ja', KR: 'ko', IN: 'en',
  SA: 'ar', AE: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar', QA: 'ar', KW: 'ar',
};

// Fallback when no country header exists: use the browser language
export function fromAcceptLanguage(header: string | null): string {
  if (!header) return 'en';
  const first = header.split(',')[0].trim();
  const lower = first.toLowerCase();
  if (lower.startsWith('zh-tw') || lower.startsWith('zh-hk') || lower.startsWith('zh-hant')) return 'zh-TW';
  if (lower.startsWith('zh')) return 'zh-CN';
  const primary = lower.split('-')[0];
  return SUPPORTED.includes(primary) ? primary : 'en';
}