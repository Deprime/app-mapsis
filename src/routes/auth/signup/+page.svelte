<script lang="ts">
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  import { ChevronLeftIcon } from 'svelte-feather-icons';
	import { Input, Select, Button, CodeInput } from '$lib/components/ui';
  import { Header, PolicyFooter } from '$lib/components/structure';

  let phone = '';
  const codeInput = {
    value: '',
    ref: null,
  };
  let isCodeValidation = false;
  $: isPhoneValid = validatePhone(phone);
  $: isCodeValid = validateCode(codeInput.value.toString());

  /**
   *
   */
  const validatePhone = (phoneNumber: string) => phoneNumber.length === 10;
  const validateCode = (code: string) => code.length === 4;

  /**
   *
   */
  const getValidationCode = () => {
    isCodeValidation = true;
    setTimeout(() => {
      codeInput.ref.focus()
    }, 100);
  }

  /**
   *
   */
  const sendValidationCode = () => {
    goto('/auth/greeting');
  }

  /**
   *
   */
  const onPhoneInput = (e: InputEvent) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substring(0, 10);
    }
  }

  /**
   *
   */
  const onChange = (e: CustomEvent) => {
    codeInput.value = e.detail;
  }
</script>

<svelte:head>
	<title>Home</title>
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

    {#if !isCodeValidation}
      <div class="flex flex-row px-6">
        <div class="basis-1/4">
          <Select>
            <option value="">+7</option>
            <option value="">+9</option>
            <option value="">+62</option>
            <option value="">+067</option>
          </Select>
        </div>
        <div class="pl-4 basis-full">
          <Input
            class="w-full"
            type="tel"
            max="10"
            placeholder="XXX XXX XXXX"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            inputmode="numeric"
            required
            on:input={onPhoneInput}
            bind:value={phone}
          />
        </div>
      </div>
      <div class="px-4 pt-8">
        <Button
          block
          disabled={!isPhoneValid}
          on:click={getValidationCode}
          variant={isPhoneValid ? 'primary' : 'default'}
        >
          {$_('actions.continue')}
        </Button>
      </div>
      <div class="text-center pt-8">
        <a href="/auth/signup-email">
          {$_('pages.signup_email.title')}
        </a>
      </div>
    {:else}
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
        <div class="ms-link pb-6 text-center">
          {$_('pages.signup.resend_code')}
        </div>

        <Button
          block
          disabled={!isCodeValid}
          variant={isCodeValid ? 'primary' : 'default'}
          on:click={sendValidationCode}
        >
          {$_('actions.continue')}
        </Button>
      </div>
    {/if}
  </section>

  <div class="w-full absolute bottom-0 left-0 px-4 pb-8">
    <PolicyFooter />
  </div>
</div>
