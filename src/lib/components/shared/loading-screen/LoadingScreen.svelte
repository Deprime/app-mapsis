<script lang="ts">
  import Logo from '$lib/assets/images/logo.svg';
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  import { fade } from 'svelte/transition';
	// import { quintOut } from 'svelte/easing';

  // Data
  const transitionConfig = {
    delay: 300,
    duration: 300,
    // easing: elasticOut,
  };
</script>

<section
  class="loading-screen ms-bg-peach"
  transition:fade={transitionConfig}
>
  <img src={Logo} alt={APP_NAME} class=" mx-auto"/>
  <p>
    Loading...
  </p>
</section>

<style lang="scss">
  .loading-screen {
    @apply fixed z-50 inset-0;
    @apply flex flex-col justify-center;
    @apply space-y-4 text-center;
  }
</style>
