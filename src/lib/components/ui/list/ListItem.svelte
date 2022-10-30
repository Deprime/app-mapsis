<script lang="ts">
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  // export let disabled = false;
  // export let loading  = false;
  export let selected = false;

  // $: cssClassList = getCssClassList(variant, block, disabled, loading, size);
  $: cssClassList = getCssClassList(selected);

  // Methods
  const getCssClassList = (
    // $$variant: string,
    // $$block: boolean,
    // $$disabled: boolean,
    // $$loading: boolean,
    $$selected: boolean,
  ): string => {
    const list = [
      `ms-list-item`,
      $$selected && `ms-list-item--selected`,
      // `button-${$$variant}`,
      // $$block && 'button-block',
      // $$disabled && 'button-disabled',
      // $$loading && 'button-loading',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<li
  use:events
  {...$$restProps}
  class={cssClassList}
>
  <slot />
</li>
