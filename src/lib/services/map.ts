import { mapStore } from '$lib/stores';

const mapService = {
  /**
   * Setup locale
   */
  saveMapState: async (mapInstance: any): Promise<any> => {
    mapStore.setZoom(mapInstance.getZoom());
    mapStore.setCenter(mapInstance.getCenter());
  }
}

export default mapService;
