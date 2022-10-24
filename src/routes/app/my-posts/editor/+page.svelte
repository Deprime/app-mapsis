<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button, List, ListItem, Input, Textarea } from '$lib/components/ui';
  import { XIcon, ChevronLeftIcon, PlusIcon } from 'svelte-feather-icons';

  // Data
  let step = 1;
  let loading = true;
  let map = {
    visible: false,
  };
  let category_list = [
    {title_ru: 'Аренда', id: 1},
    {title_ru: 'Знакомства и мероприятия', id: 2},
    {title_ru: 'Заведения и клубы', id: 3},
    {title_ru: 'Обмен валюты', id: 4},
    {title_ru: 'Красота и здоровье', id: 5},
    {title_ru: 'Покупка и продажа товаров', id: 6},
  ];
  const post = {
    category: null,
    category_id: null,
    title: "",
    description: "",
    price: "",
    address: "",
  };
  const slideTransition = {
    delay: 50,
    duration: 150,
    easing: quintOut,
  };

  // Methods
  /**
   * Got to step
   */
  const gotoStep = (stepNumber: number) => {
    step = stepNumber;
  }

  /**
   * On category select
   */
  const onCategorySelect = (category) => {
    post.category = category;
    post.category_id = category.id;
  }

  /**
   * On map toggle
   */
  const onMapToggle = (state: boolean) => {
    map.visible = state;
  }

  /**
   * On publish
   */
  const onPublish = () => {

  }

  onMount(() => {
    loading = false;
  })
</script>

<svelte:head>
	<title>
    {$_('pages.editor.title')}
  </title>
</svelte:head>

<main class="ms-h-screen ms-bg-peach relative z-50">
  {#if step === 1}
    <section class="step step-1">
      <header class="p-4 flex flex-row space-x-4 h-[60px]">
        <button on:click={() => { goto('/app/my-posts') }}>
          <XIcon size="24" />
        </button>
        <h3 class="font-extrabold text-slate-800">
          {$_('pages.editor.new')}
        </h3>
      </header>

      <header class="py-4 px-6">
        <h4 class="font-extrabold text-slate-800">
          {$_('pages.editor.post_category')}
        </h4>
      </header>

      <div class="px-4">
        <List>
          {#each category_list as category }
            <ListItem
              selected={post.category && category.id === post.category.id}
              on:click={() => onCategorySelect(category)}
            >
              {category.title_ru}
            </ListItem>
          {/each}
        </List>
      </div>

      {#if post.category}
        <div
          class="step-switcher"
          in:slide={slideTransition}
        >
          <Button
            block
            variant="primary"
            on:click={() => { gotoStep(2) }}
          >
            {$_('actions.continue')}
          </Button>
        </div>
      {/if}
    </section>
  {/if}

  {#if step === 2}
    <section class="step step-1">
      <header class="p-4 flex flex-row space-x-4 h-[60px]">
        <button on:click={() => { gotoStep(1) }}>
          <ChevronLeftIcon size="24" />
        </button>
      </header>

      <header class="py-4 px-6">
        <h4 class="font-extrabold text-slate-800">
          {$_('pages.editor.post_info')}
        </h4>
      </header>

      <div class="px-4 space-y-4">
        <Input
          class="w-full"
          placeholder="Ваше название"
          bind:value={post.title}
        />
        <Textarea
          class="w-full"
          placeholder="Введите описание"
          bind:value={post.description}
        />
        <Input
          class="w-full"
          placeholder="Адрес, место оказания услуги"
          bind:value={post.address}
        />
        <Input
          class="w-full"
          placeholder="Стоимость в рублях"
          bind:value={post.price}
        />
      </div>

      {#if post.title.length > 4 && post.description.length > 4}
        <div
          class="step-switcher"
          in:slide={slideTransition}
        >
          <Button
            block
            variant="primary"
            on:click={() => { gotoStep(3) }}
          >
            {$_('actions.continue')}
          </Button>
        </div>
      {/if}
    </section>
  {/if}

  {#if step === 3}
    <section class="step step-1">
      <header class="p-4 flex flex-row space-x-4 h-[60px]">
        <button on:click={() => { gotoStep(2) }}>
          <ChevronLeftIcon size="24" />
        </button>
      </header>

      <header class="py-4 px-6">
        <h4 class="font-extrabold text-slate-800">
          {$_('pages.editor.post_photos')}
        </h4>
      </header>

      <div class="gallery">
        {#each [...Array(5)] as img }
          <div class="gallery-item">
            <div class="gallery-item--icon">
              <PlusIcon />
            </div>
            <p>
              {$_('actions.add_photo')}
            </p>
          </div>
        {/each}
      </div>

      {#if post.category}
        <div
          class="step-switcher"
        >
          <Button
            block
            variant="primary"
            on:click={() => { gotoStep(4) }}
          >
            {$_('actions.continue')}
          </Button>
        </div>
      {/if}
    </section>
  {/if}

  {#if step === 4}
    <section class="step step-1">
      <header class="p-4 flex flex-row space-x-4 h-[60px]">
        <button on:click={() => { gotoStep(3) }}>
          <ChevronLeftIcon size="24" />
        </button>
      </header>

      <header class="py-4 px-6">
        <h4 class="font-extrabold text-slate-800">
          {$_('pages.editor.post_photos')}
        </h4>
      </header>

      <div class="gallery">
        {#each [...Array(5)] as img }
          <div class="gallery-item">
            <div class="gallery-item--icon">
              <PlusIcon />
            </div>
            <p>
              {$_('actions.add_photo')}
            </p>
          </div>
        {/each}
      </div>

      {#if post.category}
        <div
          class="step-switcher"
        >
          <Button
            block
            variant="primary"
            on:click={onPublish}
          >
            {$_('actions.publicate')}
          </Button>
        </div>
      {/if}
    </section>
  {/if}
</main>

<style lang="scss">
  .step-switcher {
    @apply absolute left-0 right-0 bottom-2 z-30 px-4 pb-4;
  }

  .gallery {
    @apply px-4 grid grid-cols-2 gap-4;

    &-item {
      @apply flex flex-col items-center justify-center;
      @apply rounded-lg bg-white;
      @apply py-6 h-[120px];

      .gallery-item--icon {
        @apply rounded-full p-1 mb-4;
        @apply text-white bg-gray-400;
      }
      p {
        @apply text-sm text-gray-500 font-semibold;
      }
    }
  }
</style>
