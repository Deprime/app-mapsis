<script lang="ts">
  import '../style.scss';
  import './PhotoStep.scss';

  import { createEventDispatcher, onMount } from 'svelte';
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { _ } from '$lib/config/i18n';

  // Components
  import { ChevronLeftIcon, PlusIcon  } from 'svelte-feather-icons';
  import { Button, Loader } from '$lib/components/ui';
  import PhotoItem from './PhotoItem.svelte';

  import { authApi, photoApi } from '$lib/api';

  import type { IPhoto } from '$lib/interfaces';

  // Props
  export let loading = false;
  export let photo_list: IPhoto[] = [];
  export let post_id: number;

  // Data
  let uploading = false;
  let max_size = 10485760;
  let photos: any;
  let errors = {};
  let inputFileHidden: HTMLInputElement;

  const dispatch = createEventDispatcher();
  const slideTransition = {
    delay: 50,
    duration: 150,
    easing: quintOut,
  };

  // Methods
  /**
   * Load photo list
   */
  const loadPhotos = async (postId: number) => {
    loading = true;
    try {
      const response = await photoApi.list(postId);
      photo_list = response.data.photos;
      max_size = response.data.max_size;
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error);
    }
    finally {
      loading = false;
    }
  }

  /**
   * Set photo as a poster
   */
  const setPoster = async (photo: any, index: number) => {
    try {
      await photoApi.setPoster(post_id, photo.id);
      photo_list = photo_list.map((el: any) => {
        el.is_poster = 0;
        return el;
      });
      photo_list[index].is_poster = 1;
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * Remove editor data
   */
  const remove = async (photo_id: number) => {
    loading = true;
    try {
      await photoApi.remove(post_id, photo_id);
      await loadPhotos(post_id);
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * On file change
   */
  const onFileChange = async (e: Event): Promise<any> => {
    uploading = true;

    try {
      const file_list = getFileListFromEvent(e);
      const files_arr = getNativeArrayFromFileList(file_list);
      const payload   = new FormData();

      files_arr.forEach((file: any, i) => {
        payload.append(`photos[${i}]`, file);
      });

      await photoApi.create(post_id, payload);
      await loadPhotos(post_id);
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      uploading = false;
    }
  };

  /**
   * Get file list from event
   */
  const getFileListFromEvent = (e) => e.target.files || e.dataTransfer.files;

  /**
   * Get native array from file list
   */
  const getNativeArrayFromFileList = (file_list: any) => Object.values(file_list);

  onMount(async () => {
    await loadPhotos(post_id);
    // if (window.File && window.FileReader && window.FormData) {
    //   console.log('File uploading is supported');
    // }
    // else {
    //   alert('File uploading is NOT supported for your browser');
    // }
  })
</script>

<section class="step step-3 ms-h-screen overflow-y-scroll">
  <header class="p-4 flex flex-row space-x-4 h-[60px] sticky top-0 z-[2] ms-bg-peach">
    <button on:click={() => { dispatch('back') }}>
      <ChevronLeftIcon size="24" />
    </button>

    <h4 class="font-extrabold text-slate-800">
      {$_('pages.editor.post_photos')}
    </h4>
  </header>

  <div class="gallery pt-2 pb-24">
    {#each photo_list as photo, index}
      <PhotoItem {photo} />
    {/each}

    {#if uploading}
      <div class="gallery-item relative">
        <Loader />
      </div>
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if !uploading}
      <div class="gallery-item" on:click={() => inputFileHidden.click()}>
        <div class="gallery-item--icon">
          <PlusIcon />
        </div>
        <p>
          {$_('actions.add_photo')}
        </p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            disabled={uploading}
            bind:files={photos}
            on:change={e => onFileChange(e)}
            bind:this={inputFileHidden}
          />
      </div>
    {/if}
  </div>

  {#if photo_list.length > 0}
    <div
      class="step-switcher"
      in:slide={slideTransition}
    >
      <Button
        block
        variant="primary"
        loading={uploading}
        disabled={loading || uploading}
        on:click={() => { dispatch('nextStep') }}
      >
        {$_('actions.continue')}
      </Button>
    </div>
  {/if}
</section>
