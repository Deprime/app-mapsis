<script lang="ts">
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Props
  export let disabled = false;
  export let selected = false;

  // Presets
  const events = getEventsAction(current_component);
</script>

<button
  use:events
  class:select-menu-item--disabled={disabled}
  class:select-menu-item--selected={selected}
  class={`select-menu-item ${$$props.class || ""}`}
>
  <slot />
</button>
