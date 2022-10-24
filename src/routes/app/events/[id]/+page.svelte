<script context="module">
  export async function load({ params }) {
    const { id } = params;
    const props = {
      eventId: id,
    };

    return { props }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  // Components
  import { Loader } from '$lib/components/ui'

  // Props
  export let eventId: number;

  // Data
  let loading = true;
  let marker: any;

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 1100)

    const demoMarkers = localStorage.getItem('demoMarkers');
    if (demoMarkers) {
      const markers = JSON.parse(demoMarkers);
      marker = markers.find((item: any) => parseInt(item.id) === parseInt(eventId));
    }
  })
</script>

<section class="ms-h-screen">
  {#if loading}
    <Loader />
  {:else}
    {#if marker}
      <header class="py-4 px-6 ">
        <h2 class="font-extrabold text-slate-800">
          {marker.title}
        </h2>
      </header>
      <section class="chat-list px-6">
        <p class="mb-4">
          <strong>Category:</strong> {marker.category.title}
        </p>
        {#if marker.promoted}
          <p class="mb-4">
            <strong>Promoted for 300$</strong>
          </p>
        {/if}
        <figure class="text-center pt-6">
          <img src={`/avatars/${marker.user.id}.jpg`} alt="" class="inline-block w-60 h-60 rounded-2xl">
        </figure>
      </section>
    {:else}
      <header class="py-4 px-6 ">
        <h2 class="font-extrabold text-slate-800">
          Event with ID {eventId}
        </h2>
      </header>
      <section class="chat-list px-6 text-center">
        Event data not found
      </section>
    {/if}
  {/if}
</section>
