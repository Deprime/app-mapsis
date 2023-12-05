<script lang="ts">
  import { fade } from 'svelte/transition';

  // Props
  export let visible = false;
  export let faderClosable = true;
  export let position: 'center'|'bottom'|'top' = 'center'

  // Data
  const fadeConfig ={  duration: 100 }

  // Methods
  const onFaderClick = () => {
    if (faderClosable) {
      visible = false;
    }
  }
</script>

{#if visible}
  <section class="ms-modal-wrapper ms-modal--position-{position}" transition:fade={fadeConfig}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="ms-fader" on:click={onFaderClick} role="banner" />

    <aside class="ms-modal">
      {#if $$slots.header}
        <header class="ms-modal-header">
          <slot name="header" />
        </header>
      {/if}

      {#if $$slots.body}
        <main class="ms-modal-body">
          <slot name="body" />
        </main>
      {/if}

      {#if $$slots.footer}
        <footer class="ms-modal-footer">
          <slot name="footer" />
        </footer>
      {/if}
    </aside>
  </section>
{/if}


<style lang="scss">
.ms-modal-wrapper {
  @apply fixed inset-0 w-full h-full z-50;
  @apply px-4 grid;

  &.ms-modal--position {
    &-top {
      @apply content-start;
    }
    &-center {
      @apply content-center;
    }
    &-bottom {
      @apply content-end;
    }
  }

  .ms-modal {
    background-color: var(--ms-peach);
    @apply relative z-10;
    @apply rounded-xl;
    @apply my-4 mx-auto;
    @apply w-full max-w-[460px];

    &-header {
      @apply px-4 pt-6 pb-3;
    }
    &-body {
      @apply px-4 pt-3 pb-3;
    }
    &-footer {
      @apply px-4 pt-3 pb-4;
    }
  }
}

.ms-fader {
  @apply absolute inset-0 h-full w-full;
  @apply backdrop-blur-sm bg-black/70;
}
</style>
