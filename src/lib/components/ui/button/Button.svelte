<script lang="ts">
  import "./Button.scss";
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Components
  import { Loader } from "$lib/components/ui"

  // Props
  export let disabled = false;
  export let loading  = false;
  export let block    = true;
  export let variant: "default"|"primary" = "default"
  export let size     = "";

  $: cssClassList = getCssClassList(variant, block, disabled, loading, size);

  // Methods
  const getCssClassList = (
    $$variant: string,
    $$block: boolean,
    $$disabled: boolean,
    $$loading: boolean,
    $$size: string,
  ): string => {
    const list = [
      `ms-button`,
      `ms-button-${$$variant}`,
      $$block && 'ms-button-block',
      $$disabled && 'ms-button-disabled',
      $$loading && 'ms-button-loading',
      ($$size.length > 0) ? `ms-button-${$$size}` : '',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<button
  use:events
  {...$$restProps}
  {disabled}
  class={cssClassList}
>
  <slot />
  {#if loading}
    <Loader size="sm" />
  {/if}
</button>
