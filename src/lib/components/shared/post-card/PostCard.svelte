<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/config/i18n';


  import { Edit3Icon } from 'svelte-feather-icons';

  // Props
  export let post;
  export let viewable = true;
  export let editable = false;

  // Data
  const dispatch = createEventDispatcher();
  const demoStatus = 'Опубликовано';

  // Methods
  /**
   * On view click
   */
  const onViewClick = () => {
    if (viewable) {
      dispatch('view', post);
    }
  }

  /**
   * On edit click
   */
  const onEditClick = () => {
    if (editable) {
      dispatch('edit', post);
    }
  }
</script>

<article class="post-card">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <figure
    on:click={onViewClick}
    class="post-card--poster"
    style={`background-image: url("/avatars/${post.id}.jpg")`}
  >
    <div class="post-card--poster__blur"></div>
    <img
      src={`/avatars/${post.id}.jpg`}
      alt={post.title}
      class="post-card--poster__image"
    >
  </figure>

  <h3 class="post-card--title">
    {post.title}
  </h3>

  <p class="post-card--price">
    1 рубль
  </p>

  <div class="post-card--address">
    Jl. Raya Tumbakbayuh No.6, Tumbak Bayuh, Kec. Mengwi, Kabupaten Badung, Bali...
  </div>

  {#if editable}
    <button
      class="post-card--edit-button"
      on:click={onEditClick}
    >
      <Edit3Icon size="24" />
    </button>
  {/if}
</article>

<style lang="scss">
  .post-card {
    @apply bg-white rounded-lg p-4 relative;

    &--swiper {
      @apply top-1.5 left-1/2 absolute;
      @apply w-32 -ml-16 h-1 ;
      @apply bg-gray-400 rounded-full;
    }

    &--poster {
      @apply flex flex-row items-center justify-center relative;
      @apply mb-3 rounded-lg;
      @apply bg-gray-50 bg-no-repeat bg-cover bg-center;

      &__blur {
        @apply w-full;
        @apply absolute top-0 bottom-0 z-10;
        @apply backdrop-blur-md bg-white/30 rounded-lg;
      }
      &__image {
        @apply h-40;
        @apply relative z-20;
      }
    }

    &--title {
      @apply font-extrabold text-base mb-1;
    }
    &--price {
      @apply font-extrabold text-base mb-3;
    }
    &--address {
      @apply text-xs;
    }

    &--edit-button {
      @apply absolute bottom-3 right-4 p-1;
      @apply rounded-lg;
      @apply bg-white text-red-400;
    }
  }
</style>