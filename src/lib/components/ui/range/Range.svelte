<script lang="ts">
  import './Range.scss';

  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let value = `1`;
  export let step  = 1;
  export let min   = 1;
  export let max   = 7;
  export let disabled = false;
  export let loading  = false;

  $: cssClassList = getCssClassList(disabled, loading);

  // Methods
  /**
   * On input
   */
  const onInput = (e: CustomEvent): void  => {
    const val = e.target?.value;
    value = val;
  };

  const getCssClassList = ($$disabled: boolean, $$loading: boolean): string => {
    const list = [
      `ms-range`,
      $$disabled && 'ms-range-disabled',
      $$loading && 'ms-range-loading',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<input
  type="range"
  class={cssClassList}
  use:events
  on:input={onInput}
  {min}
  {max}
  {value}
  {step}
  {disabled}
  {...$$restProps}
/>
