<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Loader } from '$lib/components/ui';
  import { MapLayer, PostCard } from '$lib/components/shared';
  import FiltersOverlay from './_components/FiltersOverlay.svelte';
  import CardPreview from './_components/CardPreview.svelte';

  // Services
  import { mapStore } from '$lib/stores';
  import { mapService } from '$lib/services';
  import { COORDS_UBUD } from '$lib/constants/map';
  import { searchApi } from '$lib/api';

  // Data
  let coords = COORDS_UBUD;
  let loading = true;
  let mapLoading = true;
  const filters = {
    active: false,
  };

  let markers = [];
  let hash = crypto.randomUUID();

  const preview = {
    marker: null,
    visible: false,
  }

  // Methods
  /**
   * On filter change
   */
  const onFilterSelect = (event: CustomEvent) => {
    const selectedFilters = event.detail;
    markers = (selectedFilters.length === 0)
      ? defaultMarkers.map(i => i)
      : defaultMarkers.filter(i => selectedFilters.includes(i.category.id));
    hash = uuid()
  }

  /**
   * On toggle filters
   */
  const onToggleFilters = (event: CustomEvent) => {
    filters.active = !filters.active;
  }

  /**
   * On marker click
   */
  const onMarkerClick = (e) => {
    preview.marker = e.detail;
    preview.visible = true;
  }

  /**
   * On map layer ready
   */
  const onMapReady = () => {
    mapLoading = false;
  }

  onMount(async () => {
    const currentPostition = $mapStore.data.center;
    coords = (currentPostition && currentPostition?.lat && currentPostition?.lng)
      ? [currentPostition.lat, currentPostition.lng]
      : coords;

    try {
      const geoinfo = await mapService.getGeopositionInfo(coords[1], coords[0]);
      const isSegmentSupported = mapService.isSegmentSupported(geoinfo);

      // SUPPORTED_SEGMENTS
      if (!isSegmentSupported) {
        coords = COORDS_UBUD;
        mapStore.setCenter({
          lat: coords[0],
          lng: coords[1],
        });
      }
    }
    catch (error) {
      throw new Error(error);
    }

    // Load data
    try {
      const response = await searchApi.list();
      markers = response.data
    }
    catch (error) {
      throw new Error(error);
    }

    loading = false;
  });
</script>

<div class="page-map">
  <FiltersOverlay
    isActive={filters.active}
    eventCount={markers.length}
    on:filterSelect={onFilterSelect}
    on:toggle={onToggleFilters}
  />

  <div class="map-wrapper">
    {#if mapLoading}
      <Loader hasOverlay />
    {/if}

    {#if !loading}
      <MapLayer
        {markers}
        coords={mapStore.getData('center')}
        zoom={mapStore.getData('zoom')}
        on:markerClick={onMarkerClick}
        on:ready={onMapReady}
      />
    {/if}
  </div>

  {#if preview.visible && preview.marker}
    <CardPreview bind:visible={preview.visible} >
      <PostCard post={preview.marker} />
    </CardPreview>
  {/if}
</div>

<style lang="scss">
  .map-wrapper {
    @apply w-full;
    @apply relative z-10;
    @apply h-[calc(100vh-120px)];
  }
</style>
