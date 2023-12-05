import { persisted  } from 'svelte-local-storage-store';
import { LATLNG_UBUD, DEFAULT_ZOOM } from '$lib/constants/map';

import type { LatLng, LatLngBounds } from '$lib/types/coords';
import type { IMapStore } from '$lib/interfaces/map-store';

const $$map: IMapStore = {
  data: {
    zoom: DEFAULT_ZOOM,
    center: LATLNG_UBUD,
    bounds: null,
  },
  loading: false,
}

const { subscribe, set, update } = persisted ('map', $$map);
const clear = () => set($$map);

/**
 * getData
 */
const getData = (key: string): any => {
  let result: any;
  subscribe(value => {
    result = value.data[key] || null;
  })
  return result;
};

/**
 * setData
 */
 const setData = (key: string, newValue: any): void => {
  update(value => {
    if (value.data[key]) {
      value.data[key] = newValue;
    }
    return value;
  })
};

/**
 * setLoading
 */
const setLoading = (state: boolean): void => {
  update(value => ({...value, loading: state}))
}

/**
 * setZoom
 */
const setZoom = (zoom: number): void => {
  update(value => ({
    ...value,
    data: {
      ...value.data,
      zoom
    }
  }))
};

/**
 * setCenter
 */
const setCenter = (center: LatLng): void => {
  update(value => ({
    ...value,
    data: {
      ...value.data,
      center
    }
  }))
};

/**
 * setBounds
 */
const setBounds = (bounds: LatLngBounds): void => {
  update(value => ({
    ...value,
    data: {
      ...value.data,
      bounds
    }
  }))
};

const mapStore = {
  subscribe,
  set,
  update,
  clear,
  setZoom,
  setBounds,
  setCenter,
  setLoading,
  setData,
  getData,
};

export default mapStore;
