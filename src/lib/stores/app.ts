import { persisted  } from 'svelte-local-storage-store';
import { DEFAULT_LOCALE } from '$lib/constants/languages';

const $$app = {
  data: {
    locale: DEFAULT_LOCALE
  },
  loading: false,
}

const { subscribe, set, update } = persisted ('app', $$app);
const clear = () => set($$app);

const setLoading = (state: boolean): void => {
  update(value => ({...value, loading: state}))
}

const setLocale = (selectedLocale: string): void => {
  update(value => ({
    ...value,
    data: {
      ...value.data,
      locale: selectedLocale
    }
  }))
};

const appStore = {
  subscribe,
  set,
  update,
  clear,
  setLocale,
  setLoading,
};

export default appStore;
