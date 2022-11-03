<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button } from '$lib/components/ui';
  import { PostView } from '$lib/components/shared';
  import { ChevronLeftIcon } from 'svelte-feather-icons';

  // Types
  import type { IPhoto } from '$lib/interfaces';

  // Props
  export let loading = false;
  export let post: any;
  export let photo_list: IPhoto[] = [];

  // Data
  const dispatch = createEventDispatcher();

  // Methods
</script>

<section class="step step-4 ms-h-screen pb-24 overflow-y-scroll">
  <button
    class="ms-bg-peach rounded-full p-2 flex absolute top-2 left-2 z-10"
    on:click={() => { dispatch('back') }}
  >
    <ChevronLeftIcon size="24" />
  </button>

  <PostView
    {post}
    {photo_list}
  />

  <div class="step-switcher !pb-6 pt-3 rounded-t-lg !bottom-0 backdrop-blur-md bg-white/30">
    <Button
      block
      variant="primary"
      disabled={loading}
      {loading}
      on:click={() => { dispatch('nextStep'); }}
    >
      {$_('actions.publicate')}
    </Button>
  </div>
</section>

<style lang="scss">
  @import './style.scss';
</style>
