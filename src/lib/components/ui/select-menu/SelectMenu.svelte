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
  export let confirmable = true;
  export let disabled = false;

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
    if (!disabled) {
      visible = true;
      dispatch('open');
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={openMenu} class="inline-block">
  <slot name="button">
    <div
      class="select-button"
      class:select-button--disabled={disabled}
    >
      <slot name="prefix" />

      <span class="select-button-label" class:empty-value={!item}>
        {item ? item.label : placeholder}
      </span>

      <slot name="chevron">
        <span class="chevron">
          <ChevronDownIcon size="16" />
        </span>
      </slot>
    </div>
  </slot>
</span>

{#if visible}
  <div class="select-menu-wrapper" transition:fade={fadeOption}>
    <aside class={`select-menu ${$$props.class || ""}`} transition:fly={flyOptions}>
      <slot />
    </aside>

    {#if confirmable}
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
    {/if}
  </div>
{/if}
