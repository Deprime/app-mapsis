import { mapStore } from '$lib/stores';
import { SUPPORTED_SEGMENTS } from '$lib/constants/segments';

const MAPBOX_APIKEY = import.meta.env.VITE_MAPBOX_APIKEY;

const mapService = {
  /**
   * Setup locale
   */
  saveMapState: async (mapInstance: any): Promise<any> => {
    mapStore.setZoom(mapInstance.getZoom());
    mapStore.setCenter(mapInstance.getCenter());
  },

  /**
   * Get information from geoposition
   */
  getGeopositionInfo: async (longitude: number, latitude: number): Promise<any> => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_APIKEY}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  },

  /**
   * Is segment supported
   */
  isSegmentSupported: (geoinfo: any): Boolean => {
    if (geoinfo?.features) {
      const last         = geoinfo.features.length - 1;
      const region       = geoinfo.features[last - 1];
      const region_code  = region.properties?.short_code;
      const country      = geoinfo.features[last];
      const country_code = country.properties?.short_code;

      // SUPPORTED_SEGMENTS
      return !SUPPORTED_SEGMENTS[country_code].regions[region_code] ? false : true;
    }
    return false;
  }
}

export default mapService;
