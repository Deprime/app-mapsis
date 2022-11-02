<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  // import { goto } from '$app/navigation';
  import { toast } from '@zerodevx/svelte-toast'

  // Components
  import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
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
  const tileLayerOptions = {
    minZoom: 10,
    maxZoom: 20,
    maxNativeZoom: 19,
  };

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
      dispatch('markerClick', marker);
    }
    else {
      toast.push('You need to refresh map data.<br> Go to <strong>Profile</strong> and click "Clear test data and exit"');
    }
  }

  const eventHandler = (e) => {
    const data = e.detail;
  }

  /**
   * On recentre
   */
  const onRecentre = (e) => {
    // console.log(e.detail.center.lat, e.detail.center.lng);
  }

  onMount(() => {
    map.setCenter([coords.lng, coords.lat], zoom);
  });
</script>

{#if browser}
  <div class="map-layer">
    <Map
      accessToken={MAPBOX_APIKEY}
      bind:this={map}
      on:recentre={e => onRecentre(e) }
      options={{ scrollZoom: false }}
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
    height: calc(100vh - 7rem) !important;
  }
  :global(.mapboxgl-ctrl-logo) {
    @apply invisible hidden h-0 w-0;
    height: 0 !important;
    width: 0 !important;
  }

  :global(.mapboxgl-ctrl-bottom-left) {
    @apply relative;

    // .mapboxgl-ctrl {
    //   @apply relative z-10
    // }
    // &:after {
    //   content: " ";
    //   height: 29px !important;
    //   @apply block relative inset-0 z-20;
    //   @apply bg-gray-300
    // }
  }
  :global(.mapboxgl-ctrl-bottom-right) {
    @apply invisible hidden h-0 w-0;
    height: 0 !important;
    width: 0 !important;
  }
</style>
