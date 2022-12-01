<script lang="ts">
  import "./Selectmenu.scss";

  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { _ } from '$lib/config/i18n';

  // Components
  import Button from '$lib/components/ui/button/Button.svelte'
  import { ChevronDownIcon } from 'svelte-feather-icons';
  // import SelectmenuItem from './SelectMenuItem.svelte'

  import type ISelectmenuItem from "./interfacess";

  // Props
  export let visible = false;
  export let item: ISelectmenuItem|null = null;
  export let placeholder = $_('actions.select_value');

  // Data
  const dispatch = createEventDispatcher();
  const flyOptions = {
    y: 30,
    duration: 200,
  };
  const fadeOption = {
    duration: 200,
  };

  // Methods
  /**
   * On confirm
   */
  const onConfirm = (): void => {
    dispatch('confirm');
  }

  /**
   * On cancel
   */
  const onCancel = (): void => {
    dispatch('cancel');
  }

  /**
   * Open menu
   */
  const openMenu = (): void => {
    visible = true;
    dispatch('open');
  }
</script>

<button on:click={openMenu}>
  <slot name="button">
    <div class="select-button">
      <slot name="prefix" />

      <span class:empty-value={!item}>
        {item ? item.label : placeholder}
      </span>

      <slot name="chevron">
        <span class="chevron">
          <ChevronDownIcon size="16" />
        </span>
      </slot>
    </div>
  </slot>
</button>

{#if visible}
  <div class="select-menu-wrapper" transition:fade={fadeOption}>
    <div transition:fly={flyOptions}>
      <aside class={`select-menu ${$$props.class || ""}`}>
        <slot />
      </aside>

      <footer class="select-menu-footer">
        <Button class="!w-full" on:click={onCancel}>
          {$_('actions.cancel')}
        </Button>

        <Button
          variant="primary"
          class="!w-full"
          on:click={onConfirm}
        >
          {$_('actions.confirm')}
        </Button>
      </footer>
    </div>
  </div>
{/if}
