<script lang="ts">
  import { _ } from '$lib/config/i18n';

  const CDN_URL = import.meta.env.VITE_CDN_URL;

  import type { IPhoto } from '$lib/interfaces';

  // Props
  export let photo: IPhoto;

  // Data
  let src = `${CDN_URL}/${photo.url}`
  // let alt = `poster-${photo.id}`
</script>

<div class="gallery-item" style={`background-image: url(${src})`}>
  {#if photo.is_poster}
    <span class="label-poster">
      {$_('pages.editor.is_poster')}
    </span>
  {/if}
  <!-- <img src={src} {alt} /> -->
</div>
