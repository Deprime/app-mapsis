<script lang="ts">
  import Logo from '$lib/assets/images/logo.svg';

  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  import { Button } from '$lib/components/ui';
  import { LanguageSelect } from '$lib/components/shared';

  const APP_NAME = import.meta.env.VITE_APP_NAME;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="page ms-h-screen flex flex-wrap content-end pb-6">
  <div class="basis-full pt-6 pb-2">
    <img src={Logo} alt={APP_NAME} class="my-0 mx-auto"/>
  </div>

  <div class="basis-full text-sm text-center px-4 pt-2">
    <p class="font-normal text-slate-400">
      {@html $_('app.intro')}
    </p>
  </div>

  <div class="basis-full py-12 text-center">
    <LanguageSelect />
  </div>

  <div class="basis-full pt-4 pb-0 px-4">
    <Button
      block
      variant="primary"
      class="mb-4"
      on:click={() => {goto('/auth/signin')}}
    >
      {$_('actions.signin', {default: "Sign in"})}
    </Button>
    <Button
      block
      on:click={() => {goto('/auth/signup')}}
    >
      {$_('actions.signup', {default: "Sign up"})}
    </Button>
  </div>
</div>
