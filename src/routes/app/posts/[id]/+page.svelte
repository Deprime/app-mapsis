<script lang="ts">
  import { page } from '$app/stores';
  // import { goto } from '$app/navigation';
  // import { _ } from '$lib/config/i18n';

  // Components
  import { PostView } from '$lib/components/shared';

  // Services
  import { searchApi } from '$lib/api';
  import Loader from '$lib/components/ui/loader/Loader.svelte';

  // Data
  let loading = true;
  let post = null;
  let errors = {}
  let { id } = $page.params;
  $: getPost(id);

  // Methods
  /**
   * Get post data
   */
  const getPost = async (post_id: number) => {
    loading = true;

    try {
      const response = await searchApi.get(post_id);
      post = response.data;
      errors = {}
    }
    catch (error) {
      if (error.response?.status && error.response?.status === 404) {
        errors = {
          status: error.response?.status,
          message: error.response?.statusText,
        }
      }
      throw new Error(error);
    }
    finally {
      loading = false;
    }
  }
</script>

<div>
  {#if loading}
    <Loader />
  {:else}
    {#if post?.id}
      <div class="pb-20">
        <PostView
          {post}
          photo_list={post.photos}
        />
      </div>
    {:else}
      {#if error.status}
        <h1>{error.status}</h1>
        <p>{error.message}</p>
      {/if}
    {/if}
  {/if}
</div>
