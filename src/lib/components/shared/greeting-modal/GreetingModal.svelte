<script lang="ts">
import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  import { MapPinIcon } from 'svelte-feather-icons';
	import { Input, Button, Modal } from '$lib/components/ui';
  import { PolicyFooter } from '$lib/components/structure';

  import { userStore, mapStore } from '$lib/stores';

  let name = '';
  let instagram = '';
  let telegram = '';
  let whatsapp = '';
  let coords = {};
  let locationStatus = "Trying to detect your location ..."
  const geoModal = {
    visible: true
  }

  // Methods
  /**
   * Save user name
   */
  const saveName = () => {
    const user = {
      position: {...coords},
      name,
      phone: "",
      email: "",
    };
    userStore.setData(user);
    goto('/app/map');
  }

  /**
   * Set user's current position
   */
  function setCurrentPosition(position) {
    coords.accuracy = position.coords.accuracy;
    coords.altitude = position.coords.altitude;
    coords.altitudeAccuracy = position.coords.altitudeAccuracy;
    coords.heading   = position.coords.heading;
    coords.latitude  = position.coords.latitude;
    coords.longitude = position.coords.longitude;
    coords.speed     = position.coords.speed;

    if (coords?.latitude) {
      mapStore.setCenter({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      locationStatus = "Your location has been successfully detected.";
    }
    else {
      locationStatus = "The location could not be detected.";
    }
  }

  /***
   * Position error
   */
  function positionError(error) {
    switch ( error.code ) {
      case error.PERMISSION_DENIED:
        console.error( "User denied the request for Geolocation." );
        break;

      case error.POSITION_UNAVAILABLE:
        console.error( "Location information is unavailable." );
        break;

      case error.TIMEOUT:
        console.error( "The request to get user location timed out." );
        break;

      case error.UNKNOWN_ERROR:
        console.error( "An unknown error occurred." );
        break;
    }
  }

  onMount(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentPosition, positionError, {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 0
      });
    }
  });
</script>

<div class="absolute z-50 inset-0 ms-bg-peach">
  <div class="page ms-h-screen pb-8 flex flex-col items-center justify-center">
    <section>
      <div class="text-center pb-4">
        <h4>
          {$_('pages.profile.whats_your_name')}
        </h4>
      </div>

      <div class="px-6 pb-8">
        <Input
          placeholder={$_('pages.profile.name')}
          class="w-full"
          bind:value={name}
        />
      </div>

      <div class="px-6 pb-8">
        <Input
          placeholder={`${$_('pages.profile.instagram')} (${$_('attrs.not_required')})`}
          class="w-full"
          bind:value={instagram}
        />
      </div>

      <div class="px-6 pb-8">
        <Input
          placeholder={`${$_('pages.profile.whatsapp')} (${$_('attrs.not_required')})`}
          class="w-full"
          bind:value={whatsapp}
        />
      </div>

      <div class="px-6 pb-8">
        <Input
          placeholder={`${$_('pages.profile.telegram')} (${$_('attrs.not_required')})`}
          class="w-full"
          bind:value={telegram}
        />
      </div>

      <div class="pr-6 pl-16 pb-6 relative text-sm text-slate-700">
        <MapPinIcon class="absolute top-1 left-6" />
        {locationStatus}
        {#if coords?.latitude}
          <br>lat: {coords.latitude} / lng: {coords.longitude}
        {/if}
      </div>
    </section>

    <div class="w-full px-6">
      <Button block
        variant="primary"
        disabled={(name.length <= 1)}
        on:click={saveName}
      >
        {$_('actions.lets_go')}
      </Button>
    </div>
  </div>

  <Modal bind:visible={geoModal.visible}>
    <svelte:fragment slot="header">
      <h3 class="text-center mb-2">
        Mapsis хочет использовать вашу геопозицию
      </h3>
      <p class="text-center text-sm mb-4">
        Нам нужно знать ваше местоположение, чтобы приложение работало корректно
      </p>
    </svelte:fragment>

    <svelte:fragment slot="footer">
      <Button
        block
        class="mb-4"
        on:click={() => {geoModal.visible = false}}
      >
        Разрешать всегда
      </Button>
      <Button
        block
        on:click={() => {geoModal.visible = false}}
      >
        Запретить
      </Button>
    </svelte:fragment>
  </Modal>
</div>
