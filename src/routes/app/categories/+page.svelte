<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

  import BeautyHealth   from '$lib/assets/images/categories/beauty_health.svg';
  import Clubs   from '$lib/assets/images/categories/clubs.svg';
  import DigitalServices   from '$lib/assets/images/categories/digital_services.svg';
  import Events   from '$lib/assets/images/categories/events.svg';
  import Exchange   from '$lib/assets/images/categories/exchange.svg';
  import GoodsShipment   from '$lib/assets/images/categories/goods_shipment.svg';
  import Job   from '$lib/assets/images/categories/job.svg';
  import Other   from '$lib/assets/images/categories/other.svg';
  import PhotoVideo   from '$lib/assets/images/categories/photo_video.svg';
  import Rent   from '$lib/assets/images/categories/rent.svg';
  import Trainings   from '$lib/assets/images/categories/trainings.svg';
  import VisasEscorts   from '$lib/assets/images/categories/visas_escorts.svg';

  const icons = {
    beauty_health: BeautyHealth,
    clubs: Clubs,
    digital_services: DigitalServices,
    events: Events,
    exchange: Exchange,
    goods_shipment: GoodsShipment,
    job: Job,
    other: Other,
    photo_video: PhotoVideo,
    rent: Rent,
    trainings: Trainings,
    visas_escorts: VisasEscorts,
  };

  // Components
  import { Loader } from '$lib/components/ui';
  import { SearchFilters } from '$lib/components/structure';

  // Services
  import { dictionaryService } from '$lib/services';
  import { dictionaryStore } from '$lib/stores';
  import { searchApi } from '$lib/api';

  // Data
  let loading = true;
  const filters = {
    active: false,
  };

  // Methods
  /**
   * On filter change
   */
  const onFilterSelect = (event: CustomEvent) => {
    const selectedFilters = event.detail;
  }

  /**
   * On toggle filters
   */
  const onToggleFilters = (event: CustomEvent) => {
    filters.active = !filters.active;
  }

  onMount(async () => {
    await dictionaryService.getCategoryList();
    loading = false;
  });
</script>

<div class="page pb-20">
  {#if loading}
    <Loader hasOverlay />
  {:else}
    <header class="sticky top-0 z-[21]">
      <SearchFilters
        isActive={filters.active}
        eventCount={0}
        on:filterSelect={onFilterSelect}
        on:toggle={onToggleFilters}
      />
    </header>

    <h2 class="py-4 mx-4">
      {$_('pages.categories.title')}
    </h2>

    <div class="category-list">
      {#each $dictionaryStore.categories as category}
        <div class="category-item">
          <img
            src={icons[category.slug]}
            alt={category.slug}
            class="category-item--icon"
          />

          <h3 class="category-item--title">
            {category.title_ru}
          </h3>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .category {

    &-list {
      @apply px-4;
      @apply space-y-4
    }

    &-item {
      @apply flex flex-row items-center;
      @apply bg-white rounded-xl;
      @apply py-3 px-4;
      @apply space-x-4;

      &--icon {
        @apply w-7 h-7;
      }

      &--title {
        @apply text-sm font-semibold;
      }
    }
  }
</style>
