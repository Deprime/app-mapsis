<script lang="ts">
  // import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/config/i18n';

  const CDN_URL = import.meta.env.VITE_CDN_URL;

  import type { IPhoto } from '$lib/interfaces';

  // Props
  // export let loading = false;
  export let photo: IPhoto;

  // Data
  // const dispatch = createEventDispatcher();

  // Methods
</script>
<div class="gallery-item">
  <div class="image-wrapper">
    {#if photo.is_poster}
      <span class="label-poster">
        {$_('pages.editor.is_poster')}
      </span>
    {/if}
    <img
      src={`${CDN_URL}/${photo.url}`}
      alt={`${photo.id}`}
    />
  </div>
</div>
