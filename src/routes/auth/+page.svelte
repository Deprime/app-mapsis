<script lang="ts">
  import { _ } from '$lib/config/i18n';

  // Components
  import { Button } from '$lib/components/ui';
  import { LanguageSelect, Logo } from '$lib/components/shared';
  import { SigninSection } from '$lib/components/structure';

  // Data
  let showSignin = false;

  // Methods
  const onSigninClick = () => {
    showSignin = true;
  }
</script>

<svelte:head>
	<title>Authentication</title>
</svelte:head>

<div class="page ms-h-screen flex flex-col justify-end --justify-between px-4">
  <div class="basis-6/12 text-center hidden">
    <p class="text-sm font-semibold mt-10">
      {$_('pages.partnership.title')}
    </p>
  </div>

  <div class="basis-6/12 flex flex-col justify-between">
    <div class="flex flex-col gap-y-6 items-center">
      <Logo />
      <p class="text-center text-sm font-semibold">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html $_('app.intro')}
      </p>
      <LanguageSelect  />
    </div>

    <footer class="mb-12">
      <Button variant="primary" on:click={onSigninClick}>
        {$_('actions.signin')}
      </Button>
    </footer>
  </div>

  <SigninSection bind:show={showSignin} />
</div>
