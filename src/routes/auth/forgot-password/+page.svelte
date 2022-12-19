<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';

  import { ChevronLeftIcon } from 'svelte-feather-icons';
	import { CodeInput, Button, ValidationError } from '$lib/components/ui';
  import { PhoneInput, PasswordControl } from '$lib/components/shared';
  import { Header } from '$lib/components/structure';

  // Services
  import { authApi } from '$lib/api';
  import { userStore, dictionaryStore } from '$lib/stores';
  import { checkVerificationCodeLenght } from '$lib/helpers/phone';
  import { mapErrors, cleanErrors } from '$lib/helpers/errors';

  // Types
  import type {  IValidationError } from '$lib/interfaces';

  // Data
  const codeInput = {
    ref: undefined,
    visible: true,
    timeout: 30,
  };
  const form = {
    loading: false,
    password: "",
    prefix: {},
    prefix_id: 1,
    phone: "",
    flag: "restore",
    is_phone_valid: false,
    is_phone_verified: false,
    is_password_valid: false,
    validation_code: "",
  }
  let isPhoneValid = false;
  let errors: IValidationError = {
    'prefix': [],
    'phone': [],
    'code': [],
    'password': [],
  };

  // Reactive
  $: isStep1 = !form.is_phone_valid;
  $: isStep2 = form.is_phone_valid && !form.is_phone_verified;
  $: isStep3 = form.is_phone_valid && form.is_phone_verified;
  $: isCodeValid = checkVerificationCodeLenght(form.validation_code);
  $: isPasswordValid = form.password.length >= 6

  // Methods
  /**
   * Request validation code
   */
  const requestValidationCode = async () => {
    form.loading = true;
    try {
      await authApi.getCsrfCookie();
      const prefix = form.prefix.prefix;
      await authApi.requestValidationCode(prefix, form.phone, form.flag);

      // Set next step
      form.is_phone_valid = true;
      errors = cleanErrors(errors)
    }
    catch (error: any) {
      if (error.response?.data) {
        errors = mapErrors(errors, error.response.data);
      }
      throw new Error(error);
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
      await authApi.verifyValidationCode(prefix, form.phone, form.validation_code, form.flag);

      // Set next step, clean verification code TS
      form.is_phone_verified = true;
      errors = cleanErrors(errors)
    }
    catch (error: any) {
      if (error.response?.data) {
        errors = mapErrors(errors, error.response.data);
      }
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  /**
   * Restore password
   */
  const restorePassword = async () => {
    form.loading = true;
    try {
      await authApi.getCsrfCookie();
      const prefix = form.prefix.prefix;
      await authApi.restorePassword(prefix, form.phone, form.validation_code, form.password, form.flag);

      errors = cleanErrors(errors);

      const response = await authApi.signinByPhone(prefix, form.phone, form.password);
      const { token, user } = response.data;
      userStore.setToken(token);
      userStore.setData(user);
      goto('/app/profile');
    }
    catch (error: any) {
      if (error.response?.data) {
        errors = mapErrors(errors, error.response.data);
      }
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  /**
   * On validation code change
   */
  const onValidationCodeChange = (e: CustomEvent): void => {
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
    await loadInititalData();
  })
</script>

<svelte:head>
	<title>Restoring access</title>
</svelte:head>

<div class="page ms-h-screen flex flex-col justify-between items-end content-center">
  <Header>
    <a href="/auth">
      <ChevronLeftIcon />
    </a>
  </Header>

  <section class="basis-5/12"></section>
  <section class="basis-6/12 w-full flex flex-col px-4 space-y-4">
    {#if isStep1}
      <header>
        <h4 class="text-center">
          {$_('pages.access_restore.title')}
        </h4>
      </header>
      <div class="space-y-2">
        <PhoneInput
          bind:phone={form.phone}
          bind:prefix={form.prefix}
          bind:isPhoneValid
        />

        {#if errors.phone?.length > 0}
          <ValidationError errorList={errors.phone} />
        {/if}
      </div>
    {/if}

    {#if isStep2}
      <header class="text-center">
        <h4>
          {$_('pages.phone_validation.title')}
        </h4>
        <p class="text-sm">
          {$_('pages.phone_validation.subtitle')}
        </p>
      </header>

      <div class="space-y-2">
        <div class="flex justify-center w-full">
          <CodeInput
            inputCount={4}
            bind:this={codeInput.ref}
            on:change={onValidationCodeChange}
          />
        </div>

        {#if errors.code?.length > 0}
          <ValidationError errorList={errors.code} />
        {/if}
      </div>
    {/if}

    {#if isStep3}
      <header class="text-center">
        <h4>
          {$_('pages.signup.create_password')}
        </h4>
      </header>
      <div class="space-y-2 px-4">
        <PasswordControl
          bind:password={form.password}
          on:validate={e => {
            form.is_password_valid = e.detail;
          }}
        />

        {#if errors.password?.length > 0}
          <ValidationError errorList={errors.password} />
        {/if}
      </div>
    {/if}
  </section>

  <div class="basis-1/12 w-full px-4 pt-8 mb-12">
    {#if isStep1}
      <Button
        variant="primary"
        block
        disabled={!isPhoneValid || form.loading}
        loading={form.loading}
        on:click={requestValidationCode}
      >
        {$_('actions.continue')}
      </Button>
    {/if}

    {#if isStep2}
      <Button
        variant="primary"
        block
        disabled={!isCodeValid || form.loading}
        loading={form.loading}
        on:click={validatePhone}
      >
        {$_('actions.confirm')}
      </Button>
    {/if}

    {#if isStep3}
      <Button
        variant="primary"
        block
        disabled={!isPasswordValid || form.loading}
        loading={form.loading}
        on:click={restorePassword}
      >
        {$_('actions.update_password')}
      </Button>
    {/if}
  </div>
</div>
