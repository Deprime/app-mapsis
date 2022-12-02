<script lang="ts">
  import { fade } from 'svelte/transition';
	// import { quintOut } from 'svelte/easing';
  import { swipe, Hammer } from 'svelte-hammer';
  import { _ } from '$lib/config/i18n';

  const CDN_URL = import.meta.env.VITE_CDN_URL;

  // Types
  import type { IPhoto } from '$lib/interfaces';

  // Props
  // export let loading = false;
  export let post: any;
  export let photo_list: IPhoto[] = [];

  // Data
  let active_photo = 0;
  let total_photo = photo_list.length;
  const slideTransition = {
    duration: 150,
  };

  const swipeOptions = {
    direction: Hammer.DIRECTION_ALL,
  };

  // Methods
  /**
  * On swipe down
  */
  const onSwipeLeft = () => {
    if (total_photo > 1) {
      const last_index = total_photo - 1;
      const next_index = active_photo + 1;
      active_photo = (next_index > last_index)
        ? 0
        : next_index;
    }
    return;
  }

  /**
   * On swipe right
   */
  const onSwipeRight = () => {
    if (total_photo > 1) {
      const last_index = total_photo - 1;
      active_photo = (active_photo === 0)
        ? last_index
        : active_photo - 1;
    }
    return;
  }
</script>

<section class="post-view">
  <div
    class="post-slider"
    use:swipe={swipeOptions}
    on:swipeleft={onSwipeLeft}
    on:swiperight={onSwipeRight}
  >
    {#each photo_list as photo, index}
      {#if active_photo === index}
        <div
          transition:fade={slideTransition}
          class="post-slider-item bg-slate-300"
          style={`background-image: url("${CDN_URL}/${photo.url}")`}
        >

        <div class="post-slider-item__blur" />
        <img
          src={`${CDN_URL}/${photo.url}`}
          alt={post.title}
          class="post-slider-item__image"
        >
        </div>
      {/if}
    {/each}

    {#if total_photo > 1}
      <div class="post-slider-dots">
        {#each photo_list as photo, index}
          <div class={active_photo === index ? "active" : ""}></div>
        {/each}
      </div>
      <span class="post-slider-counter ms-bg-peach">
        {active_photo+1}/{total_photo}
      </span>
    {/if}
  </div>

  <div class="post-content">
    <h2 class="post-title" itemprop="name">
      {post.title}
    </h2>

    <p class="post-price" itemprop="price">
      {post.price} ₽
    </p>

    {#if post.address?.length > 5}
      <p class="post-address">
        {post.address}
      </p>
    {/if}

    <button class="ms-link mb-4 text-sm">
      {$_('actions.show_on_map')}
    </button>

    <div class="post-description">
      {post.description}
    </div>
  </div>

  <footer class="post-contacts">
    <button class="instagram">
      Instagram
    </button>
    <button class="whatsapp">
      Whatsapp
    </button>
    <button class="telegram">
      Telegram
    </button>
  </footer>
</section>

<style lang="scss">
  .post-slider {
    @apply relative h-[340px] overflow-hidden;
    @apply rounded-b-lg;
    @apply mb-5;

    &-counter {
      @apply hidden;
      @apply absolute left-1/2 bottom-3;
      @apply px-2 py-1 rounded-lg;
      @apply text-sm text-slate-800;
    }

    &-dots {
      @apply absolute left-4 right-4 bottom-3 z-10;
      @apply flex flex-row space-x-1;

      div {
        @apply rounded-lg;
        @apply h-1 w-full;
        @apply bg-orange-50/70;
        @apply transition-all;

        &.active {
          background: linear-gradient(93.87deg, #FF5F6D -10.04%, #FFC371 103.84%);
        }
      }
    }

    &-item {
      @apply h-[340px];
      @apply bg-no-repeat bg-cover bg-center;
      @apply relative;
      @apply flex flex-col items-center justify-center;

      &__blur {
        @apply absolute inset-0 z-[1];
        @apply backdrop-blur-md bg-white/30 rounded-b-lg;
      }

      &__image {
        @apply relative z-[3];
        @apply h-auto w-auto;
        @apply max-h-full max-w-full;
      }
    }
  }

  .post-content {
    @apply px-4 mb-4;

    .post-title {
      @apply text-xl font-extrabold;
      @apply mb-2;
    }

    .post-price {
      @apply text-xl font-extrabold;
      @apply mb-4;
    }

    .post-address {
      @apply mb-4 text-xs;
    }

    .post-description {
      @apply whitespace-pre-line text-sm;
    }
  }

  .post-contacts {
    @apply flex flex-row justify-between;
    @apply px-4 py-4;
    @apply space-x-2;

    button {
      @apply text-sm font-medium;
      @apply bg-white;
      @apply py-2 px-3;
      @apply rounded-lg;
      @apply w-1/3;
    }
  }
</style>
