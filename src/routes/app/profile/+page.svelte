<script lang="ts">
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';
  import { toast } from '@zerodevx/svelte-toast'

  import { SettingsIcon } from 'svelte-feather-icons';

  import cloneDeep from 'lodash.clonedeep';
  import isEqual   from 'lodash.isequal';

  import { Input, Button, Modal } from '$lib/components/ui';
  import { userStore, mapStore } from '$lib/stores';

  let user = cloneDeep($userStore.data);
  let userCopy = cloneDeep(user);
  const logoutModal = {
    visible: false,
  }

  // Computed
  $: hasChanges = isEqual(user, userCopy);

  /**
   *
   */
  const onSave = (): void => {
    userStore.setData(user);
    userCopy = cloneDeep(user);
  }

  /**
   *
   */
  const onExit = (): void => {
    localStorage.removeItem("demoMarkers");
    userStore.clear();
    // mapStore.clear();
    goto('/');
  }

  /**
   *
   */
  const showExitModal = (): void => {
    logoutModal.visible = true;
  }

  /**
   *
   */
  const closeLogoutModal = (): void => {
    logoutModal.visible = false;
  }

  /**
   *
   */
  const onClickSettings = () => {
    toast.push('Settings page in development');
  }
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<section class="basis-full ms-h-screen ms-bg-peach-gradient relative">
  <section class="px-6 py-4 h-1/6 relative flex items-center">
    <div class="inline-block w-20 h-20 rounded-full border-4">
      <img src="/avatars/15.jpg" alt="" class="rounded-full">
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="rounded-full w-12 h-12 ms-bg-peach absolute top-1/2 -mt-6 right-6 text-center"
      on:click={onClickSettings}
    >
      <SettingsIcon class="text-slate-600 inline-block mt-3" />
    </div>
  </section>

  <section class="py-4 ms-bg-peach px-6 h-5/6 rounded-t-xl">
    <h3 class="pb-6">
      {$_('pages.profile.user_data')}
    </h3>
    <div class="pb-6">
      <Input class="w-full" bind:value={user.first_name} placeholder="Name" />
    </div>

    <div class="pb-6">
      <Input
        bind:value={user.phone}
        class="w-full"
        type="tel"
        max="10"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        inputmode="numeric"
        placeholder="Phone"
      />
    </div>

    <div class="pb-8">
      <Input
        class="w-full"
        type="email"
        placeholder="Email"
        bind:value={user.email}
      />
    </div>

    <Button
      block
      variant="primary"
      disabled={hasChanges}
      on:click={onSave}
    >
      {$_('actions.save')}
    </Button>

    <div class="fixed bottom-[90px] left-0 right-0 px-4 opacity-70">
      <button class="w-full bg-white p-4 rounded-lg text-sm text-gray-600 font-semibold" on:click={showExitModal}>
        {$_('actions.logout_form_app')}
      </button>
    </div>

    <Modal bind:visible={logoutModal.visible}>
      <header slot="header">
        <h4 class="text-center">Выйти из Mapsis?</h4>
      </header>
      <div slot="body">
        <div class="text-center pb-10">
          <i class="em em-cry text-[36px]" aria-label="CRYING FACE"></i>
        </div>

        <div class="flex flex-row space-x-4">
          <Button block variant="primary" on:click={onExit}>
            {$_('actions.logout')}
          </Button>

          <Button block on:click={closeLogoutModal}>
            {$_('actions.cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  </section>
</section>
