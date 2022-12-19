import { writable } from 'svelte-local-storage-store';
import type { IPhonePrefix, ICategory } from '$lib/interfaces';

const $$user = {
  prefixes: <IPhonePrefix[]>[],
  categories: <ICategory[]>[],
  loading: false,
}

const { subscribe, set, update } = writable('dictionary', $$user);
const clear = () => set($$user);

const setLoading = (state: boolean): void => {
  update(value => ({ ...value, loading: state }))
}

const setPrefixes = (prefixes: IPhonePrefix[]): void => {
  update(value => ({
    ...value,
    prefixes,
  }));
};

const setCategories = (categories: ICategory[]): void => {
  update(value => ({
    ...value,
    categories,
  }));
};

const dictionaryStore = {
  subscribe,
  set,
  update,
  clear,
  setLoading,
  setPrefixes,
  setCategories,
};

export default dictionaryStore;
