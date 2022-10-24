<script lang="ts">
  import { _ } from '$lib/config/i18n';

  import { ChevronLeftIcon } from 'svelte-feather-icons';
	import { Input, Select, Button } from '$lib/components/ui';
  import { Header, PolicyFooter } from '$lib/components/structure'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="page ms-h-screen flex flex-wrap items-end content-center pb-8">
  <Header>
    <a href="/">
      <ChevronLeftIcon />
    </a>
  </Header>

  <section class="basis-full"></section>
  <section class="basis-full">
    <div class="basis-full text-center pb-4">
      <h4>
        {$_('pages.signin.title')}
      </h4>
    </div>

    <div class="basis-full flex flex-row px-4 pb-4">
      <Input placeholder={$_('pages.signup_email.your_email')} class="basis-full" />
    </div>

    <div class="basis-full flex flex-row px-4 pb-4">
      <Input placeholder={$_('pages.signup_email.your_password')} class="basis-full" />
    </div>

    <div class="basis-full flex px-6">
      <a href="#">
        {$_('pages.signin.cant_signin')}
      </a>
    </div>
  </section>

  <div class="basis-full px-4 pt-8">
    <Button block>
      {$_('actions.continue')}
    </Button>
  </div>
</div>
