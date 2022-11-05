<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount, onDestroy } from 'svelte';

  // Props
  export let seconds = 0;

  // Data
  const dispatch = createEventDispatcher();
	let timer: any = null;

	onMount(() => {
		timer = setInterval(() => {
			seconds -= 1;
	  }, 1000);
	})


	onDestroy(() => {
		if (timer) {
			clearInterval(timer);
		}
	})

	$: {
		if (seconds === 0) {
			clearInterval(timer);
			timer = null;
			dispatch('completed');
		}
	}
</script>

<div class="countdown font-family-system-ui">
  {seconds}
</div>

<style scoped lang="scss">
  .countdown {
    @apply flex flex-row;
  }
</style>
