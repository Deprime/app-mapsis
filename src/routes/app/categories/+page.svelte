<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

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

    <div class="category-list">
      {#each $dictionaryStore.categories as category}
        <div class="category-item">
          <h3 class="category-item--title">
            {category.slug}
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
      @apply bg-white rounded-xl;
      @apply py-2 px-4;
      @apply h-[120px];

      &--title {
        @apply text-lg font-medium;
      }
    }
  }
</style>
