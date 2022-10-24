<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button } from '$lib/components/ui';
  import { PostCard } from '$lib/components/shared';

  // Data
  let posts: any[] = [];
  let loading = true;

  // Methods
  /**
   *
   */
  const onCreateClick = () => {
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
    const demoData = localStorage.getItem('demoMarkers');
    posts = JSON.parse(demoData);
    loading = false;
  })
</script>

<svelte:head>
	<title>
    {$_('pages.my_posts.title')}
  </title>
</svelte:head>

<section class="ms-h-screen overflow-y-scroll pb-16">
  <header class="py-4 px-6 ">
    <h3 class="font-extrabold text-slate-800">
      {$_('pages.my_posts.title')}
    </h3>
  </header>
  {#if !loading}
    <section class="space-y-3">
      {#each posts as post}
        <PostCard
          {post}
          editable
          on:view={onView}
          on:edit={onEdit}
        />
      {/each}
    </section>
  {/if}

  <div class="sticky bottom-0 z-30 px-4 pb-4">
    <Button
      block
      variant="primary"
      on:click={onCreateClick}
    >
      {$_('actions.create_post')}
    </Button>
  </div>
</section>