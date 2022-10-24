<script lang="ts">
  import './ToastNotification.scss';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  const toastOptions = {
    duration: 4000,       // duration of progress bar tween to the `next` value
    initial: 1,           // initial progress bar value
    next: 0,              // next progress value
    pausable: false,      // pause progress bar tween on mouse hover
    dismissable: true,    // allow dismiss with close button
    reversed: false,      // insert new toast to bottom of stack
    intro: { y: -64 },
    theme: {},
    classes: []
  }
</script>

<div class="ms-toast-wrap">
  <SvelteToast options={toastOptions} />
</div>
