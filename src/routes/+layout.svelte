<script lang="ts">
  import "$lib/assets/scss/app.scss";

  import { onMount }        from "svelte";
  import { get }            from "svelte/store";
  import { isLocaleLoaded } from '$lib/config/i18n';
  import { appStore }       from '$lib/stores';

  // Serivces
  import { i18nService, dictionaryService } from "$lib/services";

  // Components
  import { LoadingScreen, ErrorNoConnection, A2hsModal } from "$lib/components/shared";
  // import PageTransitions    from '$lib/components/effects/PageTransition.svelte';

  import { DEFAULT_LOCALE } from '$lib/constants/languages';

  // Data
  let loading = true;
  let errors: any = null;
  const MINIMAL_HEIGHT = 600;
  let screenHeight = `${MINIMAL_HEIGHT}px`;

  // Methods
  /**
   * On resize
   */
  const onResize = (event: UIEventHandler<Window>|null = null): void => {
    const height = (event)
      ? event.target.innerHeight
      : window.innerHeight;

    screenHeight = (height < MINIMAL_HEIGHT)
      // ? `${MINIMAL_HEIGHT}`
      ? `${MINIMAL_HEIGHT}px`
      : `${height}px`;
  }

  /**
   * App imitialization
   */
  onMount(async () => {
    onResize(null);

    const $$app = get(appStore);
    const defaultLocale = $$app?.data?.locale || DEFAULT_LOCALE;

    try {
      await i18nService.setupLocale(defaultLocale);
      await Promise.all([
        await dictionaryService.getPhonePrefixList(),
        await dictionaryService.getCategoryList(),
      ]);
    }
    catch (error: any) {
      errors = error;
      throw new Error(error);
    }
    finally {
      loading = false;
    }
  });
</script>

<!-- <svelte:window on:resize={onResize} /> -->
<div class="app-wrapper relative ms-h-screen" style={`--mobile-screen: ${screenHeight};`}>
  <main class="app-body">
    {#if $isLocaleLoaded && !loading}
      {#if errors}
        <ErrorNoConnection />
      {:else}
        <slot />
        <A2hsModal />
      {/if}
    {:else}
      <LoadingScreen />
    {/if}
  </main>
</div>
