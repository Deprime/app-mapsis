<script lang="ts">
  import { appStore } from '$lib/stores';
  import { i18nService } from '$lib/services';

  import { LANGUAGE_LIST } from '$lib/constants/languages';
	import { Select } from '$lib/components/ui';

  //
  let selectedLocale = $appStore.data.locale;

  // Methods
  const onChangeLocale = async (event: CustomEvent) => {
    const $$locale = event.target.value;
    i18nService.setupLocale($$locale);
  }
</script>

<Select class="w-full" on:change={onChangeLocale} bind:value={selectedLocale}>
  {#each LANGUAGE_LIST as lang}
    <option
      value={lang.locale}
      label={lang.native_title}
    >
      {lang.native_title}
    </option>
  {/each}
</Select>
