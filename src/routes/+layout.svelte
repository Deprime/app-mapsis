<script lang="ts">
  import "$lib/assets/scss/app.scss";

  import { onMount } from "svelte";
  import { get } from "svelte/store";
  // import { page } from '$app/stores';
  import { isLocaleLoaded, _ } from '$lib/config/i18n';
  import { appStore } from '$lib/stores';

  // Serivces
  import { i18nService } from "$lib/services";

  // Components
  import { LoadingScreen } from "$lib/components/shared";
  import { Modal, Button } from "$lib/components/ui";
  // import PageTransitions    from '$lib/components/effects/PageTransition.svelte';

  import { DEFAULT_LOCALE } from '$lib/constants/languages';

  // Data
  const MINIMAL_HEIGHT = 600;
  let screenHeight = `${MINIMAL_HEIGHT}px`;
  let setupButton;
  const setupModal = {
    visible: false,
  }

  // Methods
  const onResize = (event: UIEventHandler<Window>|null = null, needAlert = false): void => {
    const height = (event)
      ? event.target.innerHeight
      : window.innerHeight;
    screenHeight = (height < MINIMAL_HEIGHT)
      // ? `${MINIMAL_HEIGHT}`
      ? `${MINIMAL_HEIGHT}px`
      : `${height}px`;
  }

  /**
   * Is app standalone
   */
  const isStandalone = () => {
    const setupOffer = localStorage.getItem('setup_canceled');
    if (!setupOffer) {
      setupModal.visible = !window.matchMedia('(display-mode: standalone)').matches;
    }
  }

  /**
   *
   */
  const onCancel = () => {
    setupModal.visible = false;
    localStorage.setItem('setup_canceled', "true")
  }

  /**
   * App imitialization
   */
  onMount(async () => {
    onResize(null, true);
    isStandalone();

    const $$app = get(appStore);
    const defaultLocale = $$app?.data?.locale || DEFAULT_LOCALE;
    await i18nService.setupLocale(defaultLocale);
  });
</script>

<!-- <svelte:window on:resize={onResize} /> -->
<div class="app-wrapper relative ms-h-screen" style={`--mobile-screen: ${screenHeight};`}>
  <main class="app-body">
    {#if $isLocaleLoaded}
      <slot />

      <Modal bind:visible={setupModal.visible} faderClosable={false}>
        <header slot="header" class="text-center">
          <h4>
            {$_('setup.title')}
          </h4>
        </header>

        <div slot="body" class="px-2 pb-2 text-sm">
          <div class="text-center pb-10">
            <i class="em em-iphone text-[36px]"  aria-label="MOBILE PHONE"></i>
          </div>
          <p>
            {$_('setup.description')}
          </p>
        </div>

        <footer slot="footer" class="flex flex-col space-y-4">
          <Button block variant="primary" bind:this={setupButton}>
            {$_('actions.install')}
          </Button>

          <Button block on:click={onCancel}>
            {$_('actions.cancel')}
          </Button>
        </footer>
      </Modal>
    {:else}
      <LoadingScreen />
    {/if}
  </main>


</div>
