<script lang="ts">
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let selected = false;

  $: cssClassList = getCssClassList(selected);

  // Methods
  const getCssClassList = (
    $$selected: boolean,
  ): string => {
    const list = [
      `ms-list-item`,
      $$selected && `ms-list-item--selected`,
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
