<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button, List, ListItem } from '$lib/components/ui';
  import { XIcon } from 'svelte-feather-icons';

  // Props
  // export let loading = false;
  export let category_id: number|null;
  export let category_list: any[] = [];

  // Data
  const dispatch = createEventDispatcher();
  const slideTransition = {
    delay: 50,
    duration: 150,
    easing: quintOut,
  };

  // Methods
  /**
   * On category select
   */
  const onCategorySelect = (category: any) => {
    category_id = category.id;
  }
</script>

<section class="step step-4 ms-h-screen overflow-y-scroll">
  <header class="p-4 flex flex-row space-x-4 h-[60px] sticky top-0 z-[1] ms-bg-peach">
    <button on:click={() => { dispatch('back') }}>
      <XIcon size="24" />
    </button>

    <h4 class="font-extrabold text-slate-800">
      {$_('pages.editor.new')}
    </h4>
  </header>

  <header class="py-4 px-6">
    <h4 class="font-extrabold text-slate-800">
      {$_('pages.editor.post_category')}
    </h4>
  </header>

  <div class="px-4 pb-24">
    <List>
      {#each category_list as category }
        <ListItem
          selected={(category_id && category.id === category_id)}
          on:click={() => onCategorySelect(category)}
        >
          {category.title_ru}
        </ListItem>
      {/each}
    </List>
  </div>

  {#if category_id}
    <div
      class="step-switcher"
      in:slide={slideTransition}
    >
      <Button
        block
        variant="primary"
        on:click={() => { dispatch('nextStep'); }}
      >
        {$_('actions.continue')}
      </Button>
    </div>
  {/if}
</section>

<style lang="scss">
  @import '../style.scss';
</style>
