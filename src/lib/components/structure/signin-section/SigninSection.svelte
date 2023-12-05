<script lang="ts">
  import Modal from "$lib/components/ui/modal/Modal.svelte";
  import Logo from "$lib/components/shared/Logo/Logo.svelte";
  import Button from "$lib/components/ui/button/Button.svelte";
	import XButton from "$lib/components/ui/x-button/XButton.svelte";
  import IconGoogle from "$lib/components/icons/IconGoogle.svelte";
  import IconTelegram from "$lib/components/icons/IconTelegram.svelte";
  // import IconApple from "$lib/components/icons/IconApple.svelte";

  // Props
  export let show = false;

  const onClose = () => {
    show = false;
  }
</script>

<Modal bind:visible={show} position="bottom">
  <svelte:fragment slot="body">
    <section class="flex flex-col items-center py-3">
      <Logo framed class="mb-4" />
      <h1 class="mb-8 text-center">
        Войти через
      </h1>
      <footer class="w-full flex flex-col gap-4 mb-8">
        <Button>
          <IconGoogle class="absolute left-3 top-3" />
          Google аккаунт
        </Button>

        <!-- <Button variant="black">
          <IconApple class="absolute left-3 top-2.5" />
          Продолжить с Apple
        </Button> -->

        <Button variant="blue">
          <IconTelegram class="absolute left-3 top-3"  />
          Telegram аккаунт
        </Button>
      </footer>

      <XButton on:click={onClose} />
    </section>
  </svelte:fragment>
</Modal>
