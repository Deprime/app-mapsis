<script lang="ts">
  import "$lib/assets/scss/app.scss";

  import { onMount } from "svelte";
  import { get } from "svelte/store";
  // import { page } from '$app/stores';
  import { isLocaleLoaded } from '$lib/config/i18n';
  import { appStore } from '$lib/stores';

  // Serivces
  import { i18nService } from "$lib/services";

  // Components
  import { LoadingScreen } from "$lib/components/shared";
  // import PageTransitions    from '$lib/components/effects/PageTransition.svelte';

  import { DEFAULT_LOCALE } from '$lib/constants/languages';

  const MINIMAL_HEIGHT = 650;
  let screenHeight = `${MINIMAL_HEIGHT}px`;

  // Methods
  const onResize = (event: UIEventHandler<Window>|null = null): void => {
    const height = (event)
      ? event.target.innerHeight
      : window.innerHeight;
    screenHeight = (height < MINIMAL_HEIGHT)
      // ? `${MINIMAL_HEIGHT}`
      ? `auto`
      : `${height}px`;
  }

  /**
   * App imitialization
   */
  onMount(async () => {
    onResize();

    const $$app = get(appStore);
    const defaultLocale = $$app?.data?.locale || DEFAULT_LOCALE;
    await i18nService.setupLocale(defaultLocale)
  });
</script>

<!-- <svelte:window on:resize={onResize} /> -->
<div class="app-wrapper relative ms-h-screen" style={`--mobile-screen: ${screenHeight};`}>
  <main class="app-body">
    {#if $isLocaleLoaded}
      <slot />
    {:else}
      <LoadingScreen />
    {/if}
  </main>
</div>
