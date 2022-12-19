<script lang="ts">
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/stores';

  const url = ($userStore.token) ? '/app/categories' : '/auth';
  goto(url);
</script>
