<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import dayjs from 'dayjs';

  // Components
  import { Input, Button, Range } from '$lib/components/ui';
  import { SlidersIcon, XIcon } from 'svelte-feather-icons';

  // Props
  // export let categoires = <Array<any>>[];
  export let isActive = false;
  export let eventCount = 0;

  // Data
  const dispatch = createEventDispatcher();
  // let selectedFilters: number[] = [];
  let dateInt = `1`;

  // Reactive
  $: dateLabel = getDateLabel(parseInt(dateInt));

  // Methods
  /**
   * Get date label
   */
  const getDateLabel = (value: number): string => {
    if (value === 1) {
      return $_('pages.filters.today');
    }
    if (value === 2) {
      return $_('pages.filters.tomorrow');

    }

    const date = new Date();
    date.setDate(date.getDate() + value);
    return dayjs(<Date>date).format('DD.MM.YYYY');
  }

  /**
   * On toggle
   */
  const onToggle = (event: MouseEvent) => {
    dispatch('toggle', event);
  }
</script>

<section class={`z-20 w-full bg-orange-50 ${isActive ? 'h-screen z-40 fixed' : 'h-auto relative'}`}>
  {#if isActive}
    <h2 class="font-extrabold text-slate-800 px-4 pt-4 pb-4">
      {$_('pages.filters.title')}
    </h2>
  {/if}

  <header class="py-3 pl-4 flex flex-row items-center">
    <div class="flex flex-grow">
      <Input class="w-full" placeholder={$_("actions.search")} />
    </div>
    <div class="flex flex-shrink px-4">
      <button on:click={onToggle}>
        {#if !isActive}
          <SlidersIcon size="24" />
        {:else}
          <XIcon size="24" />
        {/if}
      </button>
    </div>
  </header>

  {#if isActive}
    <section class="px-4 pt-8 pb-4">
      <div>
        <h4 class="pb-2">
          {$_('pages.filters.event_date')}
        </h4>
        <Range
          min={1}
          max={7}
          step={1}
          bind:value={dateInt}
        />
      </div>

      <div class="pt-4 font-semibold">
        {dateLabel}
      </div>
    </section>

    <footer class="absolute bottom-0 left-0 right-0 px-4 py-4">
      <Button block class="mb-2">
        {$_('pages.filters.reset')}
      </Button>
      <Button variant="primary" block on:click={(e) => onToggle(e)}>
        {$_('pages.filters.show_events', {values: { count: eventCount}})}
      </Button>
    </footer>
  {/if}
</section>
