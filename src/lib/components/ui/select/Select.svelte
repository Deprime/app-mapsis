<script lang="ts">
  import './Select.scss';
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);
</script>

<select
  use:events
  class={`ms-select ${$$props.class ? $$props.class : ''}`}
>
  <slot />
</select>
