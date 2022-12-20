import { derived } from 'svelte/store';
import { dictionary, locale, _ } from 'svelte-i18n';
import { DEFAULT_LOCALE, LOCALE_FILE_URL } from '$lib/constants/languages';

// TODO: Need to implement cache for dictionary keys with key lifetime;
/**
 * Setup i18n
 */
const setupI18n = async ({ withLocale: _locale } = { withLocale: DEFAULT_LOCALE}): Promise<any> => {

  const url = LOCALE_FILE_URL.replace('{locale}', _locale);
  localStorage.setItem('default_locale', _locale);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      dictionary.set({ [_locale]: {} });
      dictionary.set({ [_locale]: data });
      locale.set(_locale);
    });
}

const isLocaleLoaded = derived(locale, $locale => typeof $locale === 'string');
const dir = derived(locale, $locale => $locale === 'ar' ? 'rtl' : 'ltr');

export { _, locale, dir, setupI18n, isLocaleLoaded };
