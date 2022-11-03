<script lang="ts">
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button } from "$lib/components/ui";
</script>

<section class="error-page ms-h-screen ms-bg-peach">
  <div class="text-center px-6">
    <h3 class="mb-2">
      {$_('errors.no_connection.title', {default: 'Something went wrong'})}
    </h3>
    <p class="text-sm font-medium mb-4">
      {$_('errors.no_connection.description', {default: 'Please check your internet connection'})}
    </p>

    <Button variant="primary" class="!px-8">
      {$_('actions.update', {default: 'Refresh page'})}
    </Button>
  </div>
</section>

<style>
.error-page {
  @apply  inset-0 w-full absolute z-[100];
  @apply  flex flex-col justify-center;
}
</style>
