<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { toast } from '@zerodevx/svelte-toast'

  // Components
  import { Map,  Marker, controls } from '@beyonk/svelte-mapbox';
  const { GeolocateControl, NavigationControl } = controls;
  import { Avatar } from '$lib/components/ui';

  // Stores
  // import { mapStore } from '$lib/stores';
  import { mapService } from '$lib/services';

  // Constants
  import { COORDS_UBUD } from '$lib/constants/map';

  const CDN_URL = import.meta.env.VITE_CDN_URL;
  const MAPBOX_APIKEY = import.meta.env.VITE_MAPBOX_APIKEY;

  // Props
  export let coords = COORDS_UBUD;
  export let markers = [];
  export let zoom = 12;

  // Data
  const dispatch = createEventDispatcher();
  let map;

  // Methods
  /**
   * On move end
   */
  const onMoveEnd = (event: CustomEvent) => {
    const map = event.detail.target;
    mapService.saveMapState(map);
  }

  /**
   * Marker click
   */
  const onMarkerClick = (marker) => {
    if (marker.id) {
      const mapZoom = map.getMap().getZoom();
      // console.log(map.getMap())
      // map.flyTo({center: [
      //   marker.coords[1],
      //   marker.coords[0] + ((marker.coords[0] * 0.03 / mapZoom) / mapZoom),
      // ]})
      dispatch('markerClick', marker);
    }
    else {
      toast.push('You need to refresh map data.<br> Go to <strong>Profile</strong> and click "Clear test data and exit"');
    }
  }

  const eventHandler = (e): void => {
    const data = e.detail;
  }

  /**
   * On recentre
   */
  const onRecentre = (e) => {
    // console.log(e.detail.center.lat, e.detail.center.lng);
  }

  /**
   * On map layer ready
   */
  const onReady = (): void => {
    dispatch('ready');
  }

  onMount(() => {
    map.setCenter([coords.lng, coords.lat], zoom);

    if (markers.length === 1) {
      const single = markers[0];
      map.setCenter([single.coords[1], single.coords[0]], zoom);
    }

    if (markers.length > 1) {
      let maxLng = 0;
      let maxLat = 0;
      let minLng = 0;
      let minLat = 0;

      markers.forEach((el, i) => {
        if (i === 0) {
          maxLng = el.coords[1] // lng
          minLng = el.coords[1] // lng
          maxLat = el.coords[0] // lat
          minLat = el.coords[0] // lat
        }
        else {
          maxLng = maxLng < el.coords[1] ? el.coords[1] : maxLng // lng
          minLng = minLng > el.coords[1] ? el.coords[1] : minLng // lng
          maxLat = maxLng < el.coords[0] ? el.coords[0] : maxLat // lng
          minLat = minLng > el.coords[0] ? el.coords[0] : minLat // lng
        }
      });

      const lngPrecision = 0.006;
      const latPrecision = 0.003;
      map.fitBounds([
        {
          lng: minLng - lngPrecision,
          lat: minLat- latPrecision
        }, {
          lng: maxLng + lngPrecision,
          lat: maxLat + latPrecision
        }
      ]);
    }
  });
</script>

{#if browser}
  <div class="map-layer">
    <Map
      accessToken={MAPBOX_APIKEY}
      options={{ scrollZoom: false }}
      on:recentre={e => onRecentre(e) }
      on:ready={onReady}
      bind:this={map}
    >
      {#each markers as mark }
        <Marker
          lat={mark.coords[0]}
          lng={mark.coords[1]}
          label={mark.title}
          popup={false}
        >
          <Avatar
            src={mark.poster ? `${CDN_URL}/${mark.poster.url}` : `/avatars/1.jpg`}
            on:click={() => { onMarkerClick(mark) }}
          />
        </Marker>
      {/each}

      <NavigationControl />
      <GeolocateControl
        options={{ some: 'control-option' }}
        on:eventname={eventHandler}
      />
    </Map>
  </div>
{/if}

<style lang="scss">
  :global(.map-layer .mapboxgl-map) {
    @apply w-full;
    @apply h-[calc(100vh-120px)];
  }
  :global(.mapboxgl-ctrl-logo) {
    @apply invisible hidden h-0 w-0;
    height: 0 !important;
    width: 0 !important;
  }

  :global(.mapboxgl-ctrl-bottom-left) {
    @apply relative;
  }
  :global(.mapboxgl-ctrl-bottom-right) {
    @apply invisible hidden h-0 w-0;
    height: 0 !important;
    width: 0 !important;
  }
</style>
