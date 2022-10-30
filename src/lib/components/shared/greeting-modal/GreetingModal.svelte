<script lang="ts">
import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Copmonents
  import { MapPinIcon } from 'svelte-feather-icons';
	import { Input, Button, Modal } from '$lib/components/ui';

  // Services
  import { mapStore } from '$lib/stores';
  import { userApi } from '$lib/api';
  import { userService } from '$lib/services';

  // Data
  const form = {
    first_name: '',
    loading: false,
  }
  let coords = {};
  let locationStatus = $_('location.detecting');
  const geoModal = {
    visible: false
  }

  // Methods
  /**
   * Update profile
   */
  const updateProfile = () => {
    try {
      const data = {
        first_name: form.first_name
      }
      userApi.updateProfile(data);
      userService.getProfile();
      goto('/app/map');
    }
    catch (error) {
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
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
      locationStatus = $_('location.detected');
    }
    else {
      locationStatus = $_('location.not_detected');
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
    if ($mapStore.data.center?.lat && $mapStore.data.center?.lng) {
      locationStatus = $_('location.detected');
    }
    else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCurrentPosition, positionError, {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 0
        });
      }
    }
  });
</script>

<div class="absolute z-50 inset-0 ms-bg-peach">
  <div class="page ms-h-screen pb-16 flex flex-col items-center justify-center">
    <section class="w-full px-6 space-y-6">
      <div class="text-center">
        <h4>
          {$_('pages.profile.whats_your_name')}
        </h4>
      </div>

      <div>
        <Input
          placeholder={$_('pages.profile.enter_name')}
          class="w-full"
          bind:value={form.first_name}
        />
      </div>

      <div class="pl-12 relative  text-slate-700">
        <MapPinIcon class="absolute top-1 left-2" />

        <p class="text-xs">
          {locationStatus}
          {#if $mapStore.data.center?.lat}
            <br>lat: {$mapStore.data.center?.lat} / lng: {$mapStore.data.center?.lng}
          {/if}
        </p>
      </div>

      <div class="w-full">
        <Button block
          variant="primary"
          disabled={(form.first_name.length <= 1)}
          loading={form.loading}
          on:click={updateProfile}
        >
          {$_('actions.lets_go')}
        </Button>
      </div>
    </section>
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
