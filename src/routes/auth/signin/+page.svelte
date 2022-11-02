<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';

  import { ChevronLeftIcon } from 'svelte-feather-icons';
	import { Input, Select, Button } from '$lib/components/ui';
  import { Header, PolicyFooter } from '$lib/components/structure';

  // Services
  import { authApi, userApi, dictionaryApi } from '$lib/api';
  import { userStore } from '$lib/stores';

  // Types
  import type { IPhonePrefix } from '$lib/interfaces';

  let prefixList: IPhonePrefix[] = []
  const form = {
    loading: false,
    password: "",
    prefix: null,
    prefix_id: 1,
    phone: "",
    is_phone_valid: false,
    is_phone_verified: false,
    is_password_valid: false,
    validation_code: "",
    errors: {},
  }

  // Reactive
  $: isPhoneValid = checkPhoneNumber(form.phone);

  // Methods
  const checkPhoneNumber = (phoneNumber: string) => phoneNumber.length === form.prefix?.length;

  /**
   * On prefix change
   */
   const onPrefixChange = (e) => {
    form.prefix = prefixList.find(el => el.value === form.prefix_id);
  }

  /**
   * On phone inpur
   */
  const onPhoneInput = (e: CustomEvent) => {
    if (e.target.value.length > form.prefix.length) {
      e.target.value = e.target.value.substring(0, form.prefix.length);
    }
  }

  /**
   * Signup phone
   */
   const signin = async () => {
    form.loading = true;
    try {
      await authApi.getCsrfCookie();
      const prefix = form.prefix.prefix;
      const response = await authApi.signinByPhone(prefix, form.phone, form.password);

      const { token, user } = response.data;
      userStore.setToken(token);
      userStore.setData(user);
      form.errors = {};
      goto('/app/profile')
    }
    catch (error: any) {
      form.errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  /**
   * loadInititalData
   */
  const loadInititalData = async (): Promise<any> => {
    form.loading = true;
    try {
      const request = await dictionaryApi.getPhonePrefixList();
      prefixList = request.data;
      form.prefix = prefixList[0];
      form.prefix_id = form.prefix.value;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  onMount(async () => {
    await loadInititalData();
  })
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="page ms-h-screen flex flex-col justify-between items-end content-center pb-8">
  <Header>
    <a href="/">
      <ChevronLeftIcon />
    </a>
  </Header>

  <section></section>
  <section class="w-full flex flex-col px-4 space-y-4">
    <h4 class="text-center">
      {$_('pages.signin.title')}
    </h4>

    <div class="flex flex-row">
      <Select
        on:change={e => onPrefixChange(e)}
        bind:value={form.prefix_id}
        class="w-5/12"
      >
        {#each prefixList as record }
          <option value={record.value}>
            {record.prefix}
          </option>
        {/each}
      </Select>
      <Input
        class="ml-4 w-full tracking-widest"
        type="tel"
        max={form.prefix?.length || 9}
        placeholder="XXX XXX XXXX"
        inputmode="numeric"
        required
        on:input={e => onPhoneInput(e)}
        bind:value={form.phone}
      />
    </div>

    <div class="">
      <Input
        placeholder={$_('pages.signup_email.your_password')}
        class="w-full"
        type="password"
        bind:value={form.password}
      />
    </div>
    <div class="hidden px-6">
      <a href="#">
        {$_('pages.signin.cant_signin')}
      </a>
    </div>
  </section>

  <div class="w-full px-4 pt-8">
    <Button
      variant="primary"
      block
      disabled={!isPhoneValid || form.password.length < 6}
      on:click={signin}
    >
      {$_('actions.continue')}
    </Button>
  </div>
</div>
