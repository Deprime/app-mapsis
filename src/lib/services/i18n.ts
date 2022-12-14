import { get } from 'svelte/store';
import { setupI18n, dir } from '$lib/config/i18n';
import { appStore } from '$lib/stores';
import { LANGUAGE_LIST, DEFAULT_LOCALE } from '$lib/constants/languages';

const i18nService = {
  /**
   * Setup locale
   */
  setupLocale: async (selectedLocale: string): Promise<any> => {
    const locales  = LANGUAGE_LIST.map(item => item.locale);
    const $$locale = locales.includes(selectedLocale) ?  selectedLocale : DEFAULT_LOCALE;

    await setupI18n({ withLocale: $$locale });
    document.dir = get(dir);
    appStore.setLocale($$locale);
  }
}

export default i18nService;
