<script lang="ts">
  import Logo from '$lib/assets/images/logo.svg';

  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  import { Button } from '$lib/components/ui';
  import { LanguageSelect } from '$lib/components/shared';

  const APP_NAME = import.meta.env.VITE_APP_NAME;

  // Methods
  const gotoSignIn = () => {
    goto('/auth/signin');
  }

  const gotoSignUp = () => {
    goto('/auth/signup');
  }
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="page ms-h-screen flex flex-col justify-between px-4">
  <div class="basis-6/12 text-center">
    <p class="text-sm font-semibold mt-10">
      {$_('pages.partnership.title')}
    </p>
  </div>

  <div class="basis-6/12 flex flex-col justify-between">
    <div class="text-center">
      <figure class="mb-6">
        <img src={Logo} alt={APP_NAME} class="my-0 mx-auto"/>
      </figure>
      <p class="text-sm font-semibold mb-8">
        {@html $_('app.intro')}
      </p>
      <div class="mx-auto w-48">
        <LanguageSelect />
      </div>
    </div>

    <footer class="space-y-4 w-full mb-10">
      <Button block variant="primary" on:click={gotoSignIn}>
        {$_('actions.signin', {default: "Sign in"})}
      </Button>
      <Button block on:click={gotoSignUp}>
        {$_('actions.signup', {default: "Sign up"})}
      </Button>
    </footer>
  </div>
</div>
