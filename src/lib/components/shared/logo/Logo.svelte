
<script lang="ts">
  import Logo from '$lib/assets/images/logo.svg';
  const APP_NAME = import.meta.env.VITE_APP_NAME;

  // Props
  export let framed = false;
</script>

<figure class="{framed ? 'bg-white rounded-3xl px-3 py-4 w-fit' : ''} {$$props.class}">
  <img src={Logo} alt={APP_NAME} class="my-0 mx-auto"/>
</figure>
