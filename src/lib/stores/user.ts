import { persisted  } from 'svelte-local-storage-store';

const $$user = {
  data: {},
  token: <string|null> null,
  // coords: <Array<number>|null>null,
  loading: false,
}

const { subscribe, set, update } = persisted('user', $$user);
const clear = () => set($$user);

const setLoading = (state: boolean): void => {
  update(value => ({ ...value, loading: state }))
}

const setData = (data: {[name: string]: string}): void => {
  update(value => ({
    ...value,
    data
  }))
};

const setToken = (token: string): void => {
  update(value => ({
    ...value,
    token
  }))
};

// const setCoords = (coords: number[]): void => {
//   update(value => ({
//     ...value,
//     coords
//   }))
// };

const isLoggedIn = () => {
  let isLogged = false;
  subscribe(value => {
    isLogged = (value.token) ? true : false;
  });
  return isLogged;
}


const userStore = {
  subscribe,
  set,
  update,
  clear,
  setData,
  setToken,
  // setCoords,
  setLoading,
  isLoggedIn,
};

export default userStore;
