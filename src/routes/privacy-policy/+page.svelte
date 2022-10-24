<script lang="ts">
  import { _ } from '$lib/config/i18n';

  import { ChevronLeftIcon } from 'svelte-feather-icons';
  import { Header } from '$lib/components/structure'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="page h-screen flex flex-wrap items-end content-between pb-8">
  <Header>
    <a href="/">
      <ChevronLeftIcon />
    </a>
  </Header>

  <section class="basis-full"></section>
  <section class="basis-full">
    <div class="basis-full text-center pb-4">
      <h4>
        {$_('pages.privacy.title')}
      </h4>
    </div>
  </section>
</div>
