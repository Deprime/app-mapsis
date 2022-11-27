<script lang="ts">
  import './Loader.scss';

  // Props
  export let hasOverlay   = false;
  export let overlayColor = "rgba(255, 255, 255, 0.5)";
  export let size: 'sm' | 'md' = 'md';

  $: cssClassList = getCssClassList(size);

  // Methods
  const getCssClassList = ($$size: string): string => {
    const list = [
      `ms-loader`,
      $$size && `ms-loader-${$$size}`,
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

{#if hasOverlay}
  <div
    class="ms-loader-overlay"
    style={`background-color: ${overlayColor}`}
  ></div>
{/if}

<div
  class={cssClassList}
></div>
