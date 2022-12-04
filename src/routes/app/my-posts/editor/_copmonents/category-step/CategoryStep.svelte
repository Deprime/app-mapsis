<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button, List, ListItem } from '$lib/components/ui';
  import { XIcon } from 'svelte-feather-icons';

  import type { ICategory } from '$lib/interfaces';

  // Props
  export let category_id: number|null;
  export let category_list: ICategory[] = [];

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
  const onCategorySelect = (category: ICategory) => {
    dispatch('change', category);
  }

  const gotoNextStep = (): void => {
    dispatch('nextStep');
  }

  const gotoBack = (): void => {
    dispatch('back');
  }
</script>

<section class="step step-4 ms-h-screen overflow-y-scroll">
  <header class="p-4 flex flex-row space-x-4 h-[60px] sticky top-0 z-[1] ms-bg-peach">
    <button on:click={gotoBack}>
      <XIcon size="24" />
    </button>

    <h4 class="font-extrabold text-slate-800">
      {$_('pages.editor.new')}
    </h4>
  </header>

  <h4 class="editor-subtitle my-4 mx-6">
    {$_('pages.editor.post_category')}
  </h4>

  <List class="mx-4 mb-24">
    {#each category_list as category }
      <ListItem
        selected={category.id === category_id}
        on:click={() => onCategorySelect(category)}
      >
        {category.title_ru}
      </ListItem>
    {/each}
  </List>

  {#if category_id}
    <footer class="step-switcher" in:slide={slideTransition}>
      <Button block variant="primary" on:click={gotoNextStep}>
        {$_('actions.continue')}
      </Button>
    </footer>
  {/if}
</section>

<style lang="scss">
  @import '../style.scss';
</style>
