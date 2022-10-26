<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Components
	import { Input } from '$lib/components/ui';
  import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons';

  // Props
  export let password = "";

  // Types
  interface IRequirement {
    label: string;
    validator: any;
  }

  // Reactive
  $: isPasswordValid = checkIsPasswordValid(password)

  // Data
  let visible = false;
  const dispatch = createEventDispatcher();
  const requirements: IRequirement[] = [
    {
      label: 'password_requirements.upper_lower',
      validator: (str: string) => /[A-Z]/.test(str) !== false && /[a-z]/.test(str) !== false
    }, {
      label: 'password_requirements.digits',
      validator: (str: string) => str?.match(/\d/g) !== null
    }, {
      label: 'password_requirements.length',
      validator: (str: string) => str?.length >= 6
    },
  ];

  // Methods
  /**
   * Check: is password valid
   */
  const checkIsPasswordValid = (pwd: string): boolean => {
    let result = true;
    requirements.forEach(el => {
      result = el.validator(pwd) ? result : false;
    });

    dispatch('validate', result);
    return result;
  }
</script>


<section class="space-y-4">
  <div class="relative">
    <Input
      class="w-full"
      label={$_('pages.profile.password')}
      placeholder={$_('pages.signup.enter_password')}
      togglable
      type={visible ? "text" : "password"}
      bind:value={password}
    />

    <button
      class="absolute top-2.5 right-3 text-slate-700"
      on:click={() => { visible = !visible; }}
    >
      {#if visible}
        <EyeOffIcon />
      {:else}
        <EyeIcon />
      {/if}
    </button>
  </div>

  <div class="requirements">
    <div class="requirements-list">
      {#each requirements as requirement}
        <div class="requirements-list-item">
          <span class={requirement.validator(password) ? "valid" : "invalid"} />
          <p>
            {$_(requirement.label)}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
.requirements {
  @apply flex flex-col;

  .info {
    @apply font-medium mb-3;
  }

  &-list {
    @apply flex flex-col space-y-2;

    &-item {
      @apply flex flex-row;
      @apply space-x-3 px-2;

      span {
        @apply w-2 h-2 flex flex-shrink-0 rounded-full mt-[4px];
        @apply bg-gray-400;

        &.valid {
          @apply bg-green-500;
        }
        &.invalid {
          @apply bg-red-500;
        }
      }

      p {
        @apply text-xs font-normal;
      }
    }
  }
}
</style>
