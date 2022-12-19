<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';
  import dayjs from 'dayjs';

  // Components
  import { ChevronLeftIcon } from 'svelte-feather-icons';
	import { Input, Select, Button, CodeInput, ValidationError } from '$lib/components/ui';
  import { Header, PolicyFooter } from '$lib/components/structure';
  import { PasswordControl, ResendCodeCountdown } from '$lib/components/shared';

  // Services
  import {
    checkPhoneNumberLenght,
    checkVerificationCodeLenght,
    generatePhonePlaceholde
  } from '$lib/helpers/phone';
  import { getPassedSecondsFromTS } from '$lib/helpers/datetime';

  import { authApi } from '$lib/api';
  import { userStore, dictionaryStore } from '$lib/stores';

  // Types
  // import type { IPhonePrefix } from '$lib/interfaces';

  // Data

  const codeInput = {
    ref: null,
    visible: true,
    timeout: 30,
  };
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
  $: isPhoneValid = checkPhoneNumberLenght(form.phone, form.prefix?.length);
  $: isCodeValid = checkVerificationCodeLenght(form.validation_code);
  $: phonePlaceholder = form.prefix?.length ? generatePhonePlaceholde(form.prefix.length) : ""

  $: isStep1 = !form.is_phone_valid;
  $: isStep2 = form.is_phone_valid && !form.is_phone_verified;
  $: isStep3 = form.is_phone_valid && form.is_phone_verified;

  // Methods

  const getCodeRequestedAt = (): string|null => {
    return localStorage.getItem('code_requested_at');
  }

  const setCodeRequestedAt = (): number => {
    const timestamp = dayjs().unix();
    localStorage.setItem('code_requested_at', `${timestamp}`);
    return timestamp;
  }

  const removeCodeRequestedAt = (): void => {
    localStorage.removeItem('code_requested_at');
  }

  /**
   * Check is request verification code available
   */
  const checkIsRequestCodeAvailable = (): boolean => {
    const codeRequestedAt = getCodeRequestedAt();
    if (codeRequestedAt) {
      const seconds = getPassedSecondsFromTS(parseInt(codeRequestedAt))
      return (seconds > codeInput.timeout);
    }
    return true;
  }

  /**
   * Request valdiation code
   */
  const requestValidationCode = async () => {
    form.loading = true;
    const isAvailable = checkIsRequestCodeAvailable();
    if (!isAvailable)
      return;

    try {
      await authApi.getCsrfCookie();
      const prefix = form.prefix.prefix;
      await authApi.requestValidationCode(prefix, form.phone);

      // Set next step, set verification code TS
      form.is_phone_valid = true;
      setCodeRequestedAt();
      codeInput.visible = false;
      form.errors = {};
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
      await authApi.verifyValidationCode(prefix, form.phone, form.validation_code);

      // Set next step, clean verification code TS
      form.is_phone_verified = true;
      removeCodeRequestedAt();
      form.errors = {};
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
    form.prefix = $dictionaryStore.prefixes.find(el => el.value === form.prefix_id);
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
   * On validation code change
   */
  const onValidationCodeChange = (e: CustomEvent) => {
    form.validation_code = e.detail;
  }

  /**
   * loadInititalData
   */
  const loadInititalData = async (): Promise<any> => {
    form.prefix    = $dictionaryStore.prefixes[0];
    form.prefix_id = form.prefix.value;
  }

  onMount(async () => {
    codeInput.visible = checkIsRequestCodeAvailable();
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
    <a href="/auth">
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
        <div>
          <div class="flex flex-row pb-2">
            <Select
              on:change={e => onPrefixChange(e)}
              bind:value={form.prefix_id}
              class="w-5/12"
            >
              {#each $dictionaryStore.prefixes as record }
                <option value={record.value}>
                  {record.prefix}
                </option>
              {/each}
            </Select>
            <Input
              class="ml-4 w-full tracking-widest"
              type="tel"
              max={form.prefix?.length || 9}
              placeholder={phonePlaceholder}
              inputmode="numeric"
              required
              on:input={e => onPhoneInput(e)}
              bind:value={form.phone}
            />
          </div>

          {#if form.errors?.phone}
            <ValidationError>
              {$_('validation.phone_registred')}
            </ValidationError>
          {/if}
          {#if form.errors?.trottling}
            <ValidationError>
              {$_('validation.trottling')}
            </ValidationError>
          {/if}
        </div>

        <div class="text-center">
          {#if !codeInput.visible}
            <div class="pb-8 text-sm">
              <ResendCodeCountdown
                seconds={30}
                class="font-semibold text-gray-500"
                on:completed={() => codeInput.visible = true}
              />
            </div>
          {/if}

          <Button
            block
            disabled={!isPhoneValid || !codeInput.visible}
            on:click={requestValidationCode}
            variant={isPhoneValid ? 'primary' : 'default'}
          >
            {$_('actions.continue')}
          </Button>
        </div>
      </section>
    {/if}

    {#if isStep2}
      <section class="px-4 space-y-8">
        <div class="flex flex-row px-6">
          <div class="flex justify-center w-full">
            <CodeInput
              inputCount={4}
              bind:this={codeInput.ref}
              on:change={onValidationCodeChange}
            />
          </div>
        </div>

        <div class="text-center">
          <div class="pb-8 text-sm">
            {#if codeInput.visible}
              <button class="ms-link" on:click={requestValidationCode}>
                {$_('pages.signup.resend_code')}
              </button>
            {:else}
              <ResendCodeCountdown
                seconds={30}
                class="font-semibold text-gray-500"
                on:completed={() => codeInput.visible = true}
              />
            {/if}
          </div>

          <Button
            block
            disabled={!isCodeValid}
            variant='primary'
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
