<script lang="ts">
  // Components
  import { Button } from "$lib/components/ui";

  const refreshPage = () => {
    window.location.reload();
  }
</script>

<section class="error-page ms-h-screen ms-bg-peach">
  <div class="text-center px-6">
    <h3 class="mb-2">
      Something went wrong
    </h3>
    <p class="text-sm font-medium mb-4">
      Please check your internet connection
    </p>

    <Button variant="primary" class="!px-8" on:click={refreshPage}>
      Refresh page
    </Button>
  </div>
</section>

<style>
.error-page {
  @apply  inset-0 w-full absolute z-[100];
  @apply  flex flex-col justify-center;
}
</style>
