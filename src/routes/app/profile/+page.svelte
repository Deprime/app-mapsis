<script lang="ts">
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';
  import { toast } from '@zerodevx/svelte-toast'

  import { SettingsIcon } from 'svelte-feather-icons';

  import cloneDeep from 'lodash.clonedeep';
  import isEqual   from 'lodash.isequal';

  import { Input, Button } from '$lib/components/ui';
  import { userStore, mapStore } from '$lib/stores';

  let user = cloneDeep($userStore.data);
  let userCopy = cloneDeep(user);

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
    mapStore.clear();

    goto('/');
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

    <Button
      class="mt-24"
      block
      variant="danger"
      on:click={onExit}
    >
      Clear test data and exit
    </Button>
  </section>

</section>
