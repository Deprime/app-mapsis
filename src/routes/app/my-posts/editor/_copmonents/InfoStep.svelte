<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { _ } from '$lib/config/i18n';

  // Components
  import { ChevronLeftIcon, MapIcon } from 'svelte-feather-icons';
  import { Button, Input, Textarea } from '$lib/components/ui';
  import { MapPointSelector } from '$lib/components/shared';

  // Props
  // export let loading = false;
  export let title: string;
  export let description: string;
  export let address: string;
  export let price: string;
  export let suggested_address: string;
  export let coords: number[];

  // Data
  const dispatch = createEventDispatcher();
  const map = {
    visible: false,
  }
  const slideTransition = {
    delay: 50,
    duration: 150,
    easing: quintOut,
  };

  // Methods
  /**
   * On MapSelector open
   */
  const openMapSelector = () => {
    map.visible = true;
  }

  /**
   * On MapSelector close
   * @param e
   */
  const closeMapSelector = (e) => {
    const { lat, lng } = e.detail;
    coords[0] = lat;
    coords[1] = lng;
    suggested_address = e.detail.suggested_address;
    address = suggested_address;
    map.visible = false;
  }
</script>

<section class="step step-1">
  {#if map.visible}
    <MapPointSelector
      {coords}
      {suggested_address}
      on:close={closeMapSelector}
    />
  {/if}

  <header class="p-4 flex flex-row space-x-4 h-[60px]">
    <button on:click={() => { dispatch('back') }}>
      <ChevronLeftIcon size="24" />
    </button>

    <h4 class="font-extrabold text-slate-800">
      {$_('pages.editor.post_info')}
    </h4>
  </header>

  <div class="py-4 px-6">
    <p class="font-medium text-sm text-slate-800">
      {$_('pages.editor.post_info_hint')}
    </p>
  </div>

  <div class="px-4 space-y-4">
    <Input
      class="w-full"
      placeholder={$_('pages.editor.post_title')}
      bind:value={title}
    />
    <Textarea
      class="w-full resize-none"
      placeholder={$_('pages.editor.post_description')}
      rows={6}
      bind:value={description}
    />

    <div class="flex flex-row items-center">
      <Textarea
        class="w-full resize-none"
        placeholder={$_('pages.editor.post_address')}
        bind:value={address}
      />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        class="pl-3 pr-1"
        on:click={openMapSelector}
      >
        <MapIcon size="24" />
      </span>
    </div>

    <Input
      placeholder={$_('pages.editor.post_price')}
      class="w-full"
      type="tel"
      inputmode="numeric"
      required
      bind:value={price}
    />
  </div>

  {#if title.length > 4 && description.length > 4}
    <div
      class="step-switcher"
      in:slide={slideTransition}
    >
      <Button
        block
        variant="primary"
        on:click={() => { dispatch('nextStep') }}
      >
        {$_('actions.continue')}
      </Button>
    </div>
  {/if}
</section>

<style lang="scss">
  @import './style.scss';
</style>
