<script lang="ts">
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/stores';

  if ($userStore.token) {
    goto('/app/map');
  }
  else {
    goto('/auth');
  }
</script>
