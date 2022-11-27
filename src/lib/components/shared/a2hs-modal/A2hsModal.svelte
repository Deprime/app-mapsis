<script lang="ts">
  import { onMount } from "svelte";
  import { _ }  from '$lib/config/i18n';

  // Components
  import { Modal, Button } from "$lib/components/ui";

  // Data
  let deferredPrompt: any;
  let visible = false;

  // Methods
  /**
   * Is app standalone
   */
  const isStandalone = (): void => {
    const setupOffer = localStorage.getItem('setup_canceled');
    if (!setupOffer) {
      visible = !window.matchMedia('(display-mode: standalone)').matches;
    }
  }

  /**
   * Capture install event
   */
  const captureInstallEvent = (): void => {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
    });
  }

  /**
   * On cancel
   */
  const onCancel = (): void => {
    visible = false;
    localStorage.setItem('setup_canceled', "true")
  }

  /**
   * On Add 2 home screen
   */
  const onInstall = (): void => {
    try {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          // Add analyticcs event
        }
        deferredPrompt = null
      });
    }
    catch (error: any) {
      throw new Error(error);
    }
  }

  onMount(async () => {
    captureInstallEvent();
    isStandalone();
  });
</script>

<Modal {visible} faderClosable={false}>
  <header slot="header" class="text-center">
    <h4>
      {$_('setup.title')}
    </h4>
  </header>

  <div slot="body" class="px-2 pb-2 text-sm">
    <div class="text-center pb-10">
      <i class="em em-iphone text-[36px]" aria-label="MOBILE PHONE"></i>
    </div>
    <p>
      {$_('setup.description')}
    </p>
  </div>

  <footer slot="footer" class="flex flex-col space-y-4">
    <Button block variant="primary" on:click={onInstall}>
      {$_('actions.install')}
    </Button>

    <Button block on:click={onCancel}>
      {$_('actions.cancel')}
    </Button>
  </footer>
</Modal>
