<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Edit3Icon } from 'svelte-feather-icons';

  // Config
  const CDN_URL = import.meta.env.VITE_CDN_URL;

  // Props
  export let post;
  export let viewable = true;
  export let editable = false;
  export let showStatus = false;

  // Data
  const dispatch = createEventDispatcher();
  // const demoStatus = 'Опубликовано';

  // Reactive
  $: posterUrl = getPosterUrl(post);

  // Methods
  /**
   * On view click
   */
  const onViewClick = (): void => {
    if (viewable) {
      dispatch('view', post);
    }
  }

  /**
   * On edit click
   */
  const onEditClick = (): void => {
    if (editable) {
      dispatch('edit', post);
    }
  }

  /**
   * Get post URL
   */
  const getPosterUrl = ($$post): string => {
    return ($$post.poster)
      ? `${CDN_URL}/${post.poster.url}`
      : "`https://usezon.ru/images/noimg.png`";
  }
</script>

<article class="post-card">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <figure
    on:click={onViewClick}
    class="post-card--poster"
    style={`background-image: url("${posterUrl}")`}
  >
    <div class="post-card--poster__blur" />
    <img
      src={posterUrl}
      alt={post.title}
      class="post-card--poster__image"
    >

    {#if showStatus && post.status?.mui_key}
      <span class="post-card--poster__status">
        {$_(`status.${post.status.mui_key}`, {default: post.status.title})}
      </span>
    {/if}
  </figure>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h3
    class="post-card--title"
    on:click={() => { goto(`/app/posts/${post.id}`); }}
  >
    {post.title}
  </h3>

  <p class="post-card--price">
    {post.price} ₽
  </p>

  {#if post.address?.length > 5}
    <div
      class="post-card--address"
      class:pr-10={editable}
    >
      {post.address}
    </div>
  {/if}

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

      &__status {
        @apply absolute bottom-2 left-2 z-[20];
        @apply bg-gray-600/70;
        @apply flex;
        @apply px-2 py-0.5;
        @apply rounded-md;
        @apply text-xs text-white font-medium;
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
