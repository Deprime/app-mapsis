<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';
  const { GeolocateControl, NavigationControl } = controls;
  import { Button, Textarea } from '$lib/components/ui';
  import { SearchIcon, XIcon, ChevronLeftIcon } from 'svelte-feather-icons';

  // Stores
  // import { mapStore } from '$lib/stores';
  import { mapService } from '$lib/services';

  // Constants
  import { COORDS_UBUD } from '$lib/constants/map';
  const MAPBOX_APIKEY = import.meta.env.VITE_MAPBOX_APIKEY;

  // Props
  export let coords = COORDS_UBUD;
  export let zoom = 14;
  export let suggested_address = "";

  // Data
  const dispatch = createEventDispatcher();
  const marker = {
    coords
  };
  let map;
  let local_suggested_address = suggested_address;
  const tileLayerOptions = {
    minZoom: 10,
    maxZoom: 20,
    maxNativeZoom: 19,
  };

  // Methods
  const onResultSelect = (e) => {
    const { center } = e.detail.result;
    zoom = 16;
    map.setCenter([center[0], center[1]], zoom);
    marker.coords[0] = center[1];
    marker.coords[1] = center[0];

    suggestAddress();
  }

  /**
   * On recentre
   */
  const onRecentre = (e) => {
    const { lat, lng } = e.detail.center;
    marker.coords[0] = lat;
    marker.coords[1] = lng;
  }

  /**
   * On drag
   */
  const onDrag = (e) => {
    const { lat, lng } = e.detail.center;
    marker.coords[0] = lat;
    marker.coords[1] = lng;
  }

  /**
   * Suggest address
   */
  const suggestAddress = async () => {
    try {
      const geodata = await mapService.getGeopositionInfo(marker.coords[1], marker.coords[0]);
      const isSupported = mapService.isSegmentSupported(geodata);

      if (isSupported) {
        const { features } = geodata;
        local_suggested_address = features.map(el => el.text).reverse().join(', ');
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Clear suggested address
   */
  const clearSuggestedAddress = () => {
    local_suggested_address = "";
  }

  /**
   * Close map selector
   */
  const closeMapSelector = async () => {
    if (local_suggested_address.length === 0) {
      await suggestAddress();
    }

    const data = {
      suggested_address: local_suggested_address,
      lat: marker.coords[0],
      lng: marker.coords[1],
    }

    dispatch('close', data);
  }

  onMount(() => {
    map.setCenter([
      coords[1],
      coords[0],
    ], zoom);
  });
</script>

{#if browser}
  <div class="absolute z-50 inset-0 h-screen ms-bg-peach">
    <header class="p-2 flex flex-row items-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        class="pr-2 text-gray-700"
        on:click={closeMapSelector}
      >
        <ChevronLeftIcon size="28" />
      </span>
      <div class="relative w-full">
        <SearchIcon
          class="absolute top-[9px] left-3 z-10 text-gray-700"
          size="24"
        />
        <Geocoder
          accessToken={MAPBOX_APIKEY}
          placeholder={$_('actions.search')}
          on:result={onResultSelect}
        />
      </div>
    </header>

    <Map
      accessToken={MAPBOX_APIKEY}
      bind:this={map}
      on:recentre={e => onRecentre(e) }
      on:drag={e => onDrag(e)}
      options={{ scrollZoom: false }}
      {zoom}
    >
      <Marker
        lat={marker.coords[0]}
        lng={marker.coords[1]}
        popup={false}
        color={'#FF5F6D'}
      />
      <NavigationControl />
      <GeolocateControl options={{ some: 'control-option' }} />
    </Map>

    <div class="absolute bottom-0 left-0 right-0 z-10 ms-bg-peach p-4 pb-6 space-y-4 rounded-t-2xl">
      <div class="relative">
        <Textarea
          value={local_suggested_address}
          placeholder={$_("location.search_hint")}
          readonly
          class="w-full !pr-7 resize-none"
        />
        {#if local_suggested_address.length > 0}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class="absolute top-2.5 right-2 z-8"
            on:click={clearSuggestedAddress}
          >
            <XIcon
              class=" text-gray-700"
              size="16"
            />
          </span>
        {/if}
      </div>

      {#if local_suggested_address.length > 0}
        <Button variant="primary" block on:click={closeMapSelector}>
          {$_('actions.confirm')}
        </Button>
      {:else}
        <Button block on:click={suggestAddress}>
          {$_('location.detect_address')}
        </Button>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  :global(.mapboxgl-ctrl-geocoder) {
    border-radius: 8px !important;
    box-shadow: none !important;
  }

  :global(.mapboxgl-ctrl-geocoder--icon) {
    visibility: hidden;
  }
  :global(.mapboxgl-ctrl-geocoder--input) {
    padding: 6px 16px 6px 46px !important;
    height: 42px !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px !important;
    box-shadow: none !important;
  }

  :global(.mapboxgl-map) {
    @apply w-full;
    height: calc(100vh - 150px) !important;
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
