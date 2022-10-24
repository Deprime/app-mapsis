<script lang="ts">
  import "./Avatar.scss";
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let disabled = false;
  export let rounded = false;
  // export let variant  = "default"
  export let size     = "";
  export let src      = "";
  export let title    = "";

  $: cssClassList = getCssClassList(disabled, rounded, size);

  // Methods
  const getCssClassList = (
    $$disabled: boolean,
    $$rounded: boolean,
    $$size: string,
  ): string => {
    const list = [
      `ms-avatar`,
      $$rounded && 'ms-avatar-rounded',
      $$disabled && 'ms-avatar-disabled',
      ($$size.length > 0) ? `ms-avatar-${$$size}` : '',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<figure
  use:events
  {...$$restProps}
  {disabled}
  class={cssClassList}
  {title}
>
  <div
    class="ms-avatar-inner"
    style={`background-image: url('${src}')`}
  >
    <!-- <img {src} alt={title} /> -->
  </div>
  <svg class="ms-avatar-corner" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.8986 6.75C4.5137 7.41667 3.55145 7.41667 3.16655 6.75L0.135467 1.5C-0.249433 0.833333 0.23169 -6.72981e-08 1.00149 0H7.06367C7.83347 6.72981e-08 8.31459 0.833333 7.92969 1.5L4.8986 6.75Z" fill="white"/>
  </svg>
</figure>
