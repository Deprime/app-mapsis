<script lang="ts">
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  // Props
  export let errorList: string[]|[] = [];

  // Data
  const slideConfig = {
    delay: 250,
    duration: 300,
    easing: quintOut,
  };
</script>

<p class="validation-error" transition:slide={slideConfig}>
  <slot>
    {#each errorList as err}
      <div>
        {err}
      </div>
    {/each}
  </slot>
</p>

<style>
  .validation-error {
    @apply bg-red-100/50 px-3 py-1.5 rounded-md;
    @apply text-[13px] leading-[18px] font-medium text-red-600;
  }
</style>
