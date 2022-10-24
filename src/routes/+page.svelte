<script lang="ts">
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/stores';

  const user = get(userStore);

  if (user?.data?.name && user?.data?.position) {
    goto('/app/map')
  }
  else {
    goto('/auth')
  }
</script>
