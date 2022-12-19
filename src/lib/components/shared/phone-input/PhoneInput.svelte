<script lang="ts">

  // Components
	import { Input, SelectMenu, SelectMenuItem } from '$lib/components/ui';

  // Stores
  import { dictionaryStore } from '$lib/stores';

  // Helpers
  import { checkPhoneNumberLenght, generatePhonePlaceholde } from '$lib/helpers/phone';

  // Types
  import type { IPhonePrefix } from '$lib/interfaces';

  // Props
  export let prefixList: IPhonePrefix[] = $dictionaryStore.prefixes;
  export let prefix: IPhonePrefix = prefixList[0] || {};
  export let phone ='';
  export let disabled = false;
  export let isPhoneValid = false;

  // Data
  let visible = false;
  const DEFAULT_PHONE_LENGTH = 9;

  // Reactive
  $: phonePlaceholder = prefix?.length ? generatePhonePlaceholde(prefix.length) : "";
  $: validatePhone(phone, prefix?.length);

  // Methods
  /**
   * Validate phone length
   */
  const validatePhone = ($$phone: string, $$length = DEFAULT_PHONE_LENGTH) => {
    isPhoneValid = checkPhoneNumberLenght($$phone, $$length);
  }

  /**
   * On phone input
   */
  const onPhoneInput = (e: CustomEvent) => {
    if (e?.target?.value?.length > prefix.length) {
      e.target.value = e.target.value.substring(0, prefix.length);
    }
  }

  /**
   * On prefix select
   */
  const onPrefixSelect = (item: IPhonePrefix): void => {
    prefix = item;
    visible = false;
  }
</script>

<div class="ms-phone-control">
  <SelectMenu
    bind:visible
    item={{label: prefix.prefix, value: prefix.value}}
    confirmable={false}
    {disabled}
  >
    {#each prefixList as item}
      <SelectMenuItem
        selected={prefix.value === item.value}
        on:click={() => { onPrefixSelect(item); }}
      >
        <span class="font-family-system-ui ms-prefix-item">
          {item.prefix}
        </span>
        {item.country}
      </SelectMenuItem>
    {/each}
  </SelectMenu>

  <div class="ms-phone-input">
    <Input
      required
      type="tel"
      max={prefix?.length || DEFAULT_PHONE_LENGTH}
      placeholder={phonePlaceholder}
      inputmode="numeric"
      class="w-full"
      {disabled}
      on:input={onPhoneInput}
      bind:value={phone}
    />
  </div>
</div>

<style lang="scss">
  .ms-phone-control {
    @apply flex flex-row;

    :global(.select-button-label) {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .ms-prefix-item {
      @apply inline-block w-[45px] ml-1;
      @apply text-left;
    }

    .ms-phone-input {
      @apply flex flex-grow;
      @apply ml-4 tracking-widest;
    }
  }
</style>
