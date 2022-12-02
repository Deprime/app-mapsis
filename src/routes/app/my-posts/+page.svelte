<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button } from '$lib/components/ui';
  import { PostCard, PostCardSkeleton } from '$lib/components/shared';

  // Services
  import { postApi } from '$lib/api';

  // Data
  let posts: any[] = [];
  let loading = true;

  // Methods
  /**
   * Get post list
   */
  const getPostList = async () => {
    try {
      const response = await postApi.list();
      posts = response.data.post_list;
    }
    catch(error) {
      throw new Error(error);
    }
    finally {
      loading = false;
    }
  }

  /**
   * On Create
   */
  const onCreate = () => {
    goto(`/app/my-posts/editor`)
  }

  /**
   * On edit
   */
  const onEdit = (event: CustomEvent) => {
    const postId = event.detail.id;
    goto(`/app/my-posts/editor?post_id=${postId}`);
  }

  /**
   * On view
   */
  const onView = (event: CustomEvent) => {
    const postId = event.detail.id;
    goto(`/app/my-posts/${postId}`);
  }

  onMount(() => {
    getPostList();
  });
</script>

<svelte:head>
	<title>
    {$_('pages.my_posts.title')}
  </title>
</svelte:head>

<section class="ms-h-screen overflow-y-scroll pb-36">
  <header class="py-4 px-6">
    <h3 class="font-extrabold text-slate-800">
      {$_('pages.my_posts.title')}
    </h3>
  </header>
  <section class="space-y-3">
   {#if loading}
      {#each [...Array(3)] as _el}
        <PostCardSkeleton />
      {/each}
   {:else}
      {#each posts as post}
        <PostCard
          {post}
          editable
          showStatus
          on:view={onView}
          on:edit={onEdit}
        />
      {/each}
    {/if}
  </section>

  <div class="fixed bottom-16 w-full z-30 px-4 pb-4">
    <Button
      block
      variant="primary"
      on:click={onCreate}
    >
      {$_('actions.create_post')}
    </Button>
  </div>
</section>
