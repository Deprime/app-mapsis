import type { LatLng, LatLngBounds } from '$lib/types/coords';

export interface IMapStore {
  data: {
    zoom: number,
    center: LatLng,
    bounds: null | LatLngBounds
  },
  loading: boolean
}
