<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Components
  import { MapLayer, PostCard } from '$lib/components/shared';
  import FiltersOverlay from './_components/FiltersOverlay.svelte';
  import CardPreview from './_components/CardPreview.svelte';

  // Services
  import { userStore, mapStore } from '$lib/stores';
  import { mapService } from '$lib/services';
  import { COORDS_UBUD } from '$lib/constants/map';
  import { searchApi, dictionaryApi } from '$lib/api';



  // Data
  let coords = COORDS_UBUD;
  let loading = true;
  const filters = {
    active: false,
    categoryList: [
    // {id: 1, title: "Все категории"},
    {id: 0, title: "Знакомства"},
    {id: 1, title: "Развлечения"},
    {id: 2, title: "Поездки"},
    {id: 3, title: "Тусовка"},
    {id: 4, title: "Медитация"},
  ]};

  let markers = [];
  let hash = crypto.randomUUID();

  const preview = {
    marker: null,
    visible: false,
  }

  // Methods
  /**
   * Get random int
   */
  const getRandomInt =(min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
   * Demo data generator
   */
  const generateDemoData = () => {
    pos = $userStore.data?.position;
    coords = (pos && pos?.latitude && pos?.longitude) ? [pos.latitude, pos.longitude] : coords;

    const demoMarkers = [];
    for (let i = 1; i <= 30; i++) {
      let latSign = getRandomInt(1, 10) > 5 ? 1 : -1;
      let lonSign = getRandomInt(1, 10) > 5 ? 1 : -1;

      let lat = coords[0] + (getRandomInt(1, 20) / 200 * latSign);
      let lon = coords[1] + (getRandomInt(1, 20) / 200 * lonSign);
      let title  = `Random event ${i}`;
      let userId = i; // getRandomInt(1, 10);

      const categoryIndex = getRandomInt(0, filters.categoryList.length - 1);
      demoMarkers.push({
        id: i,
        coords: [lat, lon],
        title,
        user: {
          id: userId,
        },
        promoted: [3,10,16,23].includes(i),
        category: {...filters.categoryList[categoryIndex]},
      });
    }
    return demoMarkers;
  }

  /**
   * On marker click
   */
  const onMarkerClick = (e) => {
    preview.marker = e.detail;
    preview.visible = true;
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
    categoires={filters.categoryList}
    eventCount={markers.length}
    on:filterSelect={onFilterSelect}
    on:toggle={onToggleFilters}
  />

  <div class="relative z-10">
    {#if !loading}
      <MapLayer
        coords={mapStore.getData('center')}
        zoom={mapStore.getData('zoom')}
        {markers}
        {hash}
        on:markerClick={onMarkerClick}
      />
    {/if}
  </div>

  {#if preview.visible && preview.marker}
    <CardPreview bind:visible={preview.visible} >
      <PostCard post={preview.marker} />
    </CardPreview>
  {/if}
</div>
