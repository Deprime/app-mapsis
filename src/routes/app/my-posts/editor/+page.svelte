<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Loader }     from '$lib/components/ui';
  import CategoryStep   from './_copmonents/category-step/CategoryStep.svelte';
  import InfoStep       from './_copmonents/info-step/InfoStep.svelte';
  import PhotoStep      from './_copmonents/photo-step/PhotoStep.svelte';
  import PreviewStep    from './_copmonents/preview-step/PreviewStep.svelte';

  // Services
  import { postApi, dictionaryApi } from '$lib/api';
  import { mapStore } from '$lib/stores';

  // Types
  import type { ICategory, IPhoto, IPost } from '$lib/interfaces';

  // Data
  let step       = 1;
  let preloading = true;
  let loading    = false;
  const MY_POSTS_URL = '/app/my-posts';

  const post: IPost = {
    id: null,
    category: null,
    category_id: null,
    title: "",
    description: "",
    price: "",
    address: "",
    suggested_address: "",
    coords: [
      $mapStore.data.center.lat,
      $mapStore.data.center.lng,
    ],
  };
  let photo_list: IPhoto[] = [];
  let category_list: ICategory[] = [];

  // Methods
  /**
   * Got to step
   */
  const gotoStep = async (stepNumber: number) => {
    step = stepNumber;
  }

  /**
   * Goto my posts
   */
  const gotoMyPosts = () => {
    goto(MY_POSTS_URL)
  }

  /**
   * On category change
   */
  const onCategoryChange = (category: ICategory) => {
    post.category_id = category.id;
    post.category = category;
  }

  /**
   * Save post draft
   */
  const saveDraft = async () => {
    loading = true;
    try {
      const response = !post.id
        ? await postApi.create(post)
        : await postApi.update(post.id, post);

      post.id = response.data.id;
      gotoStep(3)
    }
    catch (error) {
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * On publish
   */
  const onPublish = async () => {
    loading = true;

    try {
      const data = {
        status: 2
      }
      await postApi.setStatus(post.id, data);
      await goto(MY_POSTS_URL);
    }
    catch (error) {
      throw new Error(error);
    }
    finally {
      loading = false;
    }
  }

  /**
   * Get category list
   */
  const getCategoryList = async () => {
    try {
      const response = await dictionaryApi.getCategoryList();
      category_list = response.data;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get post
   */
  const getPost = async (post_id: number) => {
    try {
      const response = await postApi.get(post_id);
      const { data } = response;
      console.log(data)
      Object.keys(data).forEach(key => {
        post[key] = data[key];
      });
    }
    catch (error) {
      throw new Error(error);
    }
  }

  onMount(async () => {
    const post_id = $page.url.searchParams.get("post_id");
    await getCategoryList();
    if (post_id) {
      await getPost(parseInt(post_id));
    }
    preloading = false;
  })
</script>

<svelte:head>
	<title>
    {$_('pages.editor.title')}
  </title>
</svelte:head>

<main class="ms-h-screen ms-bg-peach relative z-50">
  {#if preloading}
    <Loader />
  {:else}
    {#if step === 1}
      <CategoryStep
        {category_list}
        bind:category_id={post.category_id}
        on:change={({detail}) => { onCategoryChange(detail); }}
        on:nextStep={() => {gotoStep(2)}}
        on:back={gotoMyPosts}
      />
    {/if}

    {#if step === 2}
      <InfoStep
        {loading}
        category={post.category}
        bind:title={post.title}
        bind:description={post.description}
        bind:price={post.price}
        bind:address={post.address}
        bind:suggested_address={post.suggested_address}
        bind:coords={post.coords}
        on:nextStep={() => {saveDraft()}}
        on:back={() => {gotoStep(1)}}
      />
    {/if}

    {#if step === 3}
      <PhotoStep
        post_id={post.id}
        {loading}
        bind:photo_list={photo_list}
        on:back={() => {gotoStep(2)}}
        on:nextStep={() => {gotoStep(4)}}
      />
    {/if}

    {#if step === 4}
      <PreviewStep
        {loading}
        {post}
        {photo_list}
        on:back={() => {gotoStep(3)}}
        on:nextStep={() => {onPublish()}}
      />
    {/if}
  {/if}
</main>
