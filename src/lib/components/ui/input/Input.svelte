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

  $: cssClassList = getCssClassList(disabled, loading);

  // Methods
  const isInteger = (val: string|number) => {
    return !isNaN(val) && parseInt(Number(val)) == value && !isNaN(parseInt(val, 10));
  }
  /**
   * On input
   */
  const onInput = (e: InputEvent): void  => {
    const val = e.target?.value;

    if (val.length > 0) {
      if ($$props.inputmode && $$props.inputmode === 'numeric') {
        if (!isInteger(val)) {
          const parsed = isNaN(parseInt(val)) ? "" : parseInt(val);
          e.target.value = parsed;
          value = parsed;
          return
        }
      }
    }
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
  {disabled}
  class={cssClassList}
/>

