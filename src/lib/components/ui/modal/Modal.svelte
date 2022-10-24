<script lang="ts">
  import './Modal.scss';

  // Props
  export let visible = false;
  export let faderClosable = true;

  // Methods
  const onFaderClick = (e: CustomEvent): void => {
    if (faderClosable) {
      visible = false;
    }
  }
</script>

{#if visible}
  <section class="ms-modal-wrapper">
    <div
      class="ms-fader"
      on:click={onFaderClick}
    ></div>

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
