<script lang="ts">
  import Logo from '$lib/assets/images/logo.svg';
  const APP_NAME = import.meta.env.VITE_APP_NAME;
</script>

<section class="fixed z-50 top-0 bottom-0 left-0 right-0">
  <div class="blur-sm absolute z-20 h-screen w-screen"></div>
  <div class="absolute z-20 text-center w-full pt-80">
    <img src={Logo} alt={APP_NAME} class="my-0 mb-4 mx-auto"/>
    Loading...
  </div>
</section>
