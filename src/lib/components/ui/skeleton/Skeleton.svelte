<script lang="ts">
  // Props
  export let height = "20px";
  export let width = "100%";
</script>

<div
  class={`skeleton-box ${$$props.class || ""}`}
  style={`height: ${height}; width: ${width}`}
></div>

<style lang="scss">
  .skeleton-box {
    @apply bg-[#DDDBDD];
    @apply inline-block relative overflow-hidden;

    &::after {
      @apply absolute inset-0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: shimmer 2s infinite;
      content: '';
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }
</style>
