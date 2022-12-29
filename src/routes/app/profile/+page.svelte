<script lang="ts">
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';
  import { toast } from '@zerodevx/svelte-toast'

  import { SettingsIcon } from 'svelte-feather-icons';

  import cloneDeep from 'lodash.clonedeep';
  import isEqual   from 'lodash.isequal';

  import { Input, Button, Modal, Checkbox } from '$lib/components/ui';
  import { LanguageSelect } from '$lib/components/shared';
  import { userStore } from '$lib/stores';

  let user = cloneDeep($userStore.data);
  let userCopy = cloneDeep(user);
  let logoutActive = false;
  const logoutModal = {
    visible: false,
  }

  // Computed
  $: hasChanges = isEqual(user, userCopy);

  /**
   * On save
   */
  const onSave = (): void => {
    userStore.setData(user);
    userCopy = cloneDeep(user);
  }

  /**
   * On exit
   */
  const onExit = (): void => {
    localStorage.removeItem("demoMarkers");
    userStore.clear();
    goto('/');
  }

  /**
   * Show exit modal
   */
  const showLogoutModal = (): void => {
    logoutModal.visible = true;
  }

  /**
   * Close lo
   */
  const closeLogoutModal = (): void => {
    logoutModal.visible = false;
    logoutActive = false;
  }

  /**
   * On click settings
   */
  const onClickSettings = () => {
    toast.push('Settings page in development');
  }
</script>

<svelte:head>
	<title>
    {$_('pages.profile.title')}
  </title>
</svelte:head>

<section class="basis-full ms-h-screen ms-bg-peach-gradient relative">
  <header class="page-header">
    <div class="avatar">
      <img src="/avatars/15.jpg" alt="">
    </div>

    <button
      class="button-settings ms-bg-peach"
      on:click={onClickSettings}
    >
      <SettingsIcon />
    </button>
  </header>

  <section class="page-body ms-bg-peach">
    <h3 class="pb-4">
      {$_('pages.profile.user_data')}
    </h3>

    <section class="flex flex-col space-y-4 mb-6">
      <Input
        class="w-full"
        bind:value={user.first_name}
        placeholder="Name"
      />
      <Input
        bind:value={user.phone}
        class="w-full"
        inputmode="numeric"
        disabled
        readonly
      />
      <Input
        class="w-full"
        type="email"
        placeholder="Email"
        bind:value={user.email}
      />
      <LanguageSelect />
    </section>

    <h3 class="pb-4">
      {$_('pages.profile.contact_data')}
    </h3>
    <section class="space-y-6 mb-4">
      <div>
        <div class="flex flex-row">
          <Input class="w-full" placeholder="Instagram" />
          <input type="checkbox" class="ml-4" >
        </div>
      </div>

      <div>
        <div class="mb-2">
          <Checkbox>
            Контакт привязан к телефону
          </Checkbox>
        </div>
        <div class="flex flex-row">
          <Input class="w-full" placeholder="WhatsApp" />
          <input type="checkbox" class="ml-4" >
        </div>
      </div>

      <div>
        <div class="mb-2">
          <Checkbox>
            Контакт привязан к телефону
          </Checkbox>
        </div>
        <div class="flex flex-row">
          <Input class="w-full" placeholder="Telegram" />
          <input type="checkbox" class="ml-4" >
        </div>
      </div>
    </section>

    <Button
      block
      variant="primary"
      disabled={hasChanges}
      on:click={onSave}
    >
      {$_('actions.save')}
    </Button>

    <button
      class="button-logout"
      on:click={showLogoutModal}
    >
      {$_('actions.logout_form_app')}
    </button>
  </section>
</section>

<Modal bind:visible={logoutModal.visible}>
  <header slot="header">
    <h4 class="text-center">
      {$_('actions.logout_form_app')}?
    </h4>
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


<style scoped lang="scss">
.page-header {
  @apply px-6 py-4 h-1/6 relative flex items-center;
}

.page-body {
  @apply py-4 px-6 h-5/6 rounded-t-xl overflow-y-scroll;
}

.avatar {
  @apply inline-block w-20 h-20 rounded-full border-4;

  > img {
    @apply rounded-full;
  }
}

.button-logout {
  @apply w-full py-3 px-4 mt-6 mb-20;
  @apply bg-white;
  @apply rounded-xl;
  @apply text-sm text-gray-600 font-semibold;
}

.button-settings {
  @apply rounded-full w-12 h-12;
  @apply absolute top-1/2 -mt-6 right-6;
  @apply flex flex-col items-center justify-center;
  @apply text-slate-600;
}
</style>
