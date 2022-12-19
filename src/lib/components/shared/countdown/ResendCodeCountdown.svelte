<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
  import { _ } from '$lib/config/i18n';

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

<div class={`countdown ${$$props.class || ""}`}>
  {@html $_('pages.phone_validation.resend_timeout', {values: {seconds}})}
</div>

<style scoped lang="scss">
  .countdown {
    span {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  }
</style>
