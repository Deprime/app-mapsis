<script lang="ts">
  import { fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  // Props
  export let url = "";
</script>

{#key url}
  <div in:fade="{{ duration: 750, easing: quintOut}}">
    <slot/>
  </div>
{/key}
