<script lang="ts">
  import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui';
  import { createEventDispatcher } from 'svelte';
  import type { ICodeInput } from './interface';

  // Presets
  const dispatch = createEventDispatcher();

  export let inputCount = 4;
  export let disabled = false;

  // Data
  let inputList: ICodeInput[] = [];

  // Methods
  /**
   * Focus
   */
  export function focus() {
    if (inputList[0]) {
      inputList[0].ref.focus();
    }
	}

  /**
   * On change
   */
  const onChange = (e: InputEvent, index: number) => {
    const { value } = e.target;
    if (value.length > 0) {
      if (value.length > 1) {
        e.target.value = value.slice(-1);
      }

      const nextIndex = index + 1;
      if (inputList[nextIndex]) {
        inputList[nextIndex].ref.focus();
      }
      else {
        inputList[index].ref.blur();
      }
    }
    else {
      const prevIndex = index - 1;
      if (inputList[prevIndex]) {
        inputList[prevIndex].ref.focus();
      }
    }

    const nums = inputList.map((el, i) => {
        return (i === index)
          ? e.target.value
          : el.value.toString();
      })
      .filter(el => el !== '')
      .map(el => parseInt(el))
    const sum = (nums.length > 0) ? parseInt(nums.join("")) : null;

    dispatch('change', sum);
  }

  onMount(() => {
    const list: ICodeInput[] = []
    for (let i = 1; i <= inputCount; i++) {
      list.push({tabindex: i, ref: null, value: ''});
    }
    inputList = list;
  });
</script>

<div>
  {#each inputList as item, i}
    <Input
      type="tel"
      min="0"
      max="9"
      class="w-12 mx-2 text-center"
      tabindex={item.tabindex}
      inputmode="numeric"
      autocomplete="one-time-code"
      pattern="[0-9]"
      {disabled}
      bind:value={item.value}
      bind:this={item.ref}
      on:input={e => onChange(e, i)}
    />
  {/each}
</div>
