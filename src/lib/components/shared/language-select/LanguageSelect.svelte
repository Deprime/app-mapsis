<script lang="ts">
  import { appStore } from '$lib/stores';
  import { i18nService } from '$lib/services';

  // Components
	import { SelectMenu, SelectMenuItem } from '$lib/components/ui';
  import LocaleSelector from '$lib/assets/images/locale-selector.svg';

  import { LANGUAGE_LIST } from '$lib/constants/languages';

  // Data
  // let selectedLocale = $appStore.data.locale;
  let selectedLocale = LANGUAGE_LIST.find(el => el.locale === $appStore.data.locale);
  let currentLocale  = selectedLocale;
  let visible = false;

  // Methods
  /**
   * Close menu
   */
  const closeMenu = (): void => {
    visible = false;
  }

  /**
   * On locale select
   */
  const onSelect = (index: number): void => {
    selectedLocale = LANGUAGE_LIST[index];
  }

  /**
   * On locale change
   */
  const onChange = async (): Promise<any> => {
    await i18nService.setupLocale(selectedLocale.locale);
    currentLocale = selectedLocale;
    visible = false;
  }
</script>

<SelectMenu
  bind:visible
  item={{label: currentLocale.native_title, value: currentLocale.locale}}
  on:confirm={onChange}
  on:cancel={closeMenu}
>
  <span slot="prefix">
    <img src={LocaleSelector} class="-ml-1 -my-1 w-6 h-6">
  </span>

  {#each LANGUAGE_LIST as lang, index}
    <SelectMenuItem
      selected={selectedLocale.locale === lang.locale}
      on:click={() => { onSelect(index); }}
    >
      {lang.native_title}
    </SelectMenuItem>
  {/each}
</SelectMenu>

