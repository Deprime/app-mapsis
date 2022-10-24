<script lang="ts">
  import { Navigation, ToastNotification } from '$lib/components/structure';
</script>

<div class="page h-screen">
  <slot />
  <Navigation />
  <ToastNotification />
</div>
