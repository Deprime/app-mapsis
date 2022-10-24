<script lang="ts">
  import "./Chips.scss";
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let variant  = "default"
  export let size     = "md";
  export let disabled = false;

  $: cssClassList = getCssClassList(variant,  disabled, size);

  // Methods
  const getCssClassList = (
    $$variant: string,
    $$disabled: boolean,
    $$size: string,
  ): string => {
    const list = [
      `ms-chips`,
      `ms-chips-${$$variant}`,
      $$disabled && 'ms-chips-disabled',
      ($$size.length > 0) && `ms-chips-${$$size}`,
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<span
  use:events
  {...$$restProps}
  class={cssClassList}
>
  <slot />
</span>
