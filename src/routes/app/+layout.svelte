<script lang="ts">
  import { onMount } from 'svelte';

  import { Navigation, ToastNotification } from '$lib/components/structure';
  import { GreetingModal } from '$lib/components/shared';

  import { userService } from '$lib/services';
  import { userStore } from '$lib/stores';

  onMount(async () => {
    if (userStore.isLoggedIn()) {
      await userService.getProfile();
    }
  })
</script>

<div class="page h-screen">
  <slot />
  <Navigation />
  <ToastNotification />

  {#if !$userStore.data?.first_name}
    <GreetingModal />
  {/if}
</div>
