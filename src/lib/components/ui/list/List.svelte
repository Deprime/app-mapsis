<script lang="ts">
  import "./List.scss";
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let disabled = false;
  export let loading  = false;
  export let block    = false;
  export let variant  = "default"
  export let size     = "";

  // $: cssClassList = getCssClassList(variant, block, disabled, loading, size);
  $: cssClassList = getCssClassList(variant, block, disabled, loading, size);

  // Methods
  const getCssClassList = (
    // $$variant: string,
    // $$block: boolean,
    // $$disabled: boolean,
    // $$loading: boolean,
  ): string => {
    const list = [
      `ms-list`,
      // `button-${$$variant}`,
      // $$block && 'button-block',
      // $$disabled && 'button-disabled',
      // $$loading && 'button-loading',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<ul
  {...$$restProps}
  class={cssClassList}
>
  <slot />
</ul>
