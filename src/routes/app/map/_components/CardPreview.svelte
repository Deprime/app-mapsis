<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { swipe, Hammer } from 'svelte-hammer';

  // Props
  export let visible = false;

  // Data
  const slideTransition = {
    delay: 50,
    duration: 150,
    easing: quintOut,
  };
  const swipeOptions = {
    direction: Hammer.DIRECTION_ALL,
  };

  // Methods
  /**
  * On swipe down
  */
  const onSwipeDown = (e) => {
    visible = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<section
  class="preview-wrapper"
  transition:slide={slideTransition}
  use:swipe={swipeOptions}
  on:swipedown={onSwipeDown}
>
  <div class="preview-swiper" />
  <slot />
</section>

<style lang="scss">
  .preview-wrapper {
    @apply absolute bottom-0 left-0 right-0 z-20;
    @apply transition-all;
    @apply h-auto;
    @apply pb-16;
    @apply bg-white rounded-t-lg;
  }

  .preview-swiper {
    @apply top-1.5 left-1/2 absolute;
    @apply w-32  -ml-16 h-1 z-10;
    @apply bg-gray-400 rounded-full;
  }
</style>
