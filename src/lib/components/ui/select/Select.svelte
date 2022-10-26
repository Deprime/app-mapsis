<script lang="ts">
  import './Select.scss';
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let disabled = false;
  export let value: number|string = "";
</script>

<select
  {disabled}
  bind:value
  {...$$restProps}
  class={`ms-select ${$$props.class ? $$props.class : ''}`}
  use:events
>
  <slot />
</select>
