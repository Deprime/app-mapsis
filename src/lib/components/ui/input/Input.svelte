<script lang="ts">
  import "./Input.scss";
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let disabled = false;
  export let loading  = false;
  // export let block    = false;
  // export let variant  = "default"
  // export let size     = "";
  export let value: string|number|undefined = "";
  let ref: any;

  export function focus() {
		ref.focus();
	}

  export function blur() {
		ref.blur();
	}

  // $: cssClassList = getCssClassList(variant, block, disabled, loading, size);
  $: cssClassList = getCssClassList(disabled, loading);

  // Methods
  /**
   * On input
   */
  const onInput = (e: InputEvent): void  => {
    const val = e.target?.value;
    value = val;
  };

  const getCssClassList = ($$disabled: boolean, $$loading: boolean): string => {
    const list = [
      `ms-input`,
      $$disabled && 'ms-input-disabled',
      $$loading && 'ms-input-loading',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<input
  use:events
  {...$$restProps}
  {value}
  on:input={onInput}
  bind:this={ref}
  class={cssClassList}
/>

