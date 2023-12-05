<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { XIcon } from 'svelte-feather-icons';

  // Props
  export let disabled = false;

  // On click
  const onClick = (e) => {
    if (!disabled) {
      dispatch('click', e)
    }
  }
</script>

<button
  class="w-[34px] h-[34px] rounded-full flex justify-center items-center bg-white"
  {disabled}
  on:click={onClick}
>
  <XIcon />
</button>
