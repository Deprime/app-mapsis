<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Components
  import { ChevronLeftIcon } from 'svelte-feather-icons';
	import { Input, Select, Button, CodeInput } from '$lib/components/ui';
  import { Header, PolicyFooter } from '$lib/components/structure';
  import { PasswordControl } from '$lib/components/shared';

  // Services
  import { authApi, userApi, dictionaryApi } from '$lib/api';
  import { userStore } from '$lib/stores';

  // Types
  import type { IPhonePrefix } from '$lib/interfaces';

  // Data
  const codeInput = {
    ref: null,
  };

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
  $: isCodeValid = validateCode(form.validation_code.toString());

  $: isStep1 = !form.is_phone_valid;
  $: isStep2 = form.is_phone_valid && !form.is_phone_verified;
  $: isStep3 = form.is_phone_valid && form.is_phone_verified;

  // Methods
  const checkPhoneNumber = (phoneNumber: string) => phoneNumber.length === 10;
  const validateCode = (code: string) => code.length === 4;

  /**
   * Request Sms Code
   */
  const requestSmsCode = async () => {
    form.loading = true;
    try {
      await authApi.getCsrfCookie();
      const prefix = form.prefix.prefix;
      await authApi.requestSmsCode(prefix, form.phone);
      form.is_phone_valid = true;
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
   * Validate phone
   */
  const validatePhone = async () => {
    form.loading = true;
    try {
      await authApi.getCsrfCookie();
      const prefix = form.prefix.prefix;
      await authApi.validatePhone(prefix, form.phone, form.validation_code);
      form.is_phone_verified = true;
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
   * Signup phone
   */
  const signup = async () => {
    form.loading = true;
    try {
      await authApi.getCsrfCookie();
      const prefix = form.prefix.prefix;
      const response = await authApi.signupPhone(prefix, form.phone, form.password);

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
      e.target.value = e.target.value.substring(0, 10);
    }
  }

  /**
   * On change
   */
  const onChange = (e: CustomEvent) => {
    form.validation_code = e.detail;
    console.log(form.validation_code)
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
      form.prefix = form.prefix.value;
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
	<title>
    {$_('pages.signup.title')}
  </title>
</svelte:head>

<div class="page ms-h-screen">
  <Header>
    <a href="/">
      <ChevronLeftIcon />
    </a>
  </Header>

  <section class="pt-64">
    <div class="text-center pb-6">
      <h4>
        {$_('pages.signup.title')}
      </h4>
    </div>

    {#if isStep1}
      <section class="px-4 space-y-6">
        <div class="flex flex-row ">
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

        {#if form.errors?.phone}
          <div class="validation-error">
            {form.errors.phone || ""}
          </div>
        {/if}

        <div>
          <Button
            block
            disabled={!isPhoneValid}
            on:click={requestSmsCode}
            variant={isPhoneValid ? 'primary' : 'default'}
          >
            {$_('actions.continue')}
          </Button>
        </div>
      </section>
    {/if}

    {#if isStep2}
      <section class="px-4 space-y-6">
        <div class="flex flex-row px-6">
          <div class="flex justify-center w-full">
            <CodeInput
              inputCount={4}
              bind:this={codeInput.ref}
              on:change={onChange}
            />
          </div>
        </div>
        <div class="px-4 pt-6">
          <div class="ms-link pb-6 text-center text-sm">
            {$_('pages.signup.resend_code')}
          </div>

          <Button
            block
            disabled={!isCodeValid}
            variant={isCodeValid ? 'primary' : 'default'}
            on:click={validatePhone}
          >
            {$_('actions.continue')}
          </Button>
        </div>
      </section>
    {/if}

    {#if isStep3}
      <section class="px-4 space-y-6">
        <div>
          <PasswordControl
            bind:password={form.password}
            on:validate={e => {
              form.is_password_valid = e.detail;
            }}
          />
        </div>
        <div>
          <Button
            block
            disabled={!form.is_password_valid}
            variant={form.is_password_valid ? 'primary' : 'default'}
            on:click={signup}
          >
            {$_('actions.signup')}
          </Button>
        </div>
      </section>
    {/if}
  </section>

  <div class="w-full absolute bottom-0 left-0 px-4 pb-8">
    <PolicyFooter />
  </div>
</div>
