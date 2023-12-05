<script lang="ts">
  import { createEventDispatcher } from "svelte";

  // Components
  import { Loader } from "$lib/components/ui"

  type TVariant = 'default'|'primary'|'blue'|'black'|'danger';

  // Props
  export let disabled = false;
  export let loading  = false;
  export let block    = true;
  export let variant: TVariant = "default"
  export let size     = "";

  // Data
  let touch = false;
  const dispatch = createEventDispatcher();
  $: cssClassList = getCssClassList(variant, block, disabled, loading, size);

  // Methods
  const getCssClassList = (
    $$variant: string,
    $$block: boolean,
    $$disabled: boolean,
    $$loading: boolean,
    $$size: string,
  ): string => {
    const list = [
      `ms-button`,
      `ms-button-${$$variant}`,
      $$block && 'ms-button-block',
      $$disabled && 'ms-button-disabled',
      $$loading && 'ms-button-loading',
      ($$size.length > 0) ? `ms-button-${$$size}` : '',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }

  const onClick = (e: CustomEvent) => {
    if (!disabled) {
      dispatch('click', e)
    }
  }

  const onTouchStart = () => {
    if (!disabled) {
      touch = true;
    }
  }

  const onTouchEnd = () => {
    if (!disabled) {
      touch = false;
    }
  }
</script>

<button
  {...$$restProps}
  {disabled}
  class="{cssClassList} transition-transform {touch ? 'translate-y-0.5' : ''}"
  on:click={onClick}
  on:touchstart={onTouchStart}
  on:touchend={onTouchEnd}
>
  <slot />
  {#if loading}
    <Loader size="sm" />
  {/if}
</button>


<style lang="scss">
.ms-button {
  @apply relative inline-block;
  @apply font-semibold text-sm text-center;
  @apply py-3.5 px-5;
  @apply rounded-xl;
  @apply outline-none;
  @apply transition-all duration-200 ease-in-out;
  @apply select-none;

  // Block state
  &-block {
    @apply block w-full;
  }

  // Variants
  &-default {
    @apply bg-[#F0EBE3];
    @apply text-gray-600;

    &:hover,
    &:active {
      @apply bg-[#F3E8D8];
      @apply text-gray-600;
    }

    &.ms-button-disabled {
      @apply bg-[#EBEBEB];
      @apply text-gray-400;
    }
  }

  &-primary {
    background-color: #FF5F6D;
    background: linear-gradient(93.87deg, #FF5F6D -10.04%, #FFC371 103.84%);
    @apply text-white;
    @apply transition-all;

    &:active {
      background: linear-gradient(93.87deg, #FFC371 -10.04%, #FF5F6D 103.84%);
    }

    &.ms-button-disabled {
      background: #EBEBEB;
      @apply text-[#8C8E94];
    }
  }

  &-blue {
    @apply bg-[#37AEE2];
    @apply text-white;

    &:hover,
    &:active {
      @apply bg-[#35a4d4];
      @apply text-white;
    }

    &.ms-button-disabled {
      @apply bg-[#55bde9];
      @apply text-white;
    }
  }

  &-black {
    @apply bg-[#171C22];
    @apply text-white;

    &:hover,
    &:active {
      @apply bg-[#11151a];
      @apply text-white;
    }

    &.ms-button-disabled {
      @apply bg-[#2c3136];
      @apply text-white;
    }
  }

  &-danger {
    @apply bg-red-600;
    @apply text-white;

    &:hover {
      @apply bg-red-700;
    }
    &:active {
      @apply bg-red-800;
    }
  }

  &-disabled {
    @apply cursor-not-allowed;
  }

  &-loading {
    color: transparent !important;
  }
}

</style>
