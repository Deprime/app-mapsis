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
  import { ChevronLeftIcon } from 'svelte-feather-icons';
  import { Loader } from '$lib/components/ui'
  import { Header } from '$lib/components/structure';
  import { ChatMessage } from '$lib/components/shared';

  // Props
  export let eventId: number;

  // Data
  let loading = true;
  let marker: any;
  const messageList = [
    {
      id: 1,
      text: 'Добрый день, хотела бы присоединится к вашей компании, буду через 20 мин',
      cteated_at: "2022-08-05 21:34:00",
    },
    {
      id: 2,
      text: 'Здравствуйте, Анастасия минутку',
      cteated_at: "2022-08-05 21:40:00",
    },
    {
      id: 2,
      text: 'Да конечно я буду рад вас видеть. Думаю, что буду находиться здесь еще не меньше двух часов. Так что жду вас!',
      cteated_at: "2022-08-05 21:40:00",
    },
  ]

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
      <Header>
        <a href="/app/im" class="inline-block">
          <ChevronLeftIcon />
        </a>

        <div>
          <img src={`/avatars/${marker.user.id}.jpg`} alt="" class="inline-block w-6 h-6 rounded-full">
          <h4 class="inline-block text-sm font-extrabold pl-1">Николай Алексеевич</h4>
        </div>
        <span class="w-6 h-6"></span>
      </Header>

      <section class="chat-list p-6 mt-12">
        <ul class="msg-list">
          {#each messageList as message, i}
            <ChatMessage
              user={i === 0 ? marker.user : null}
              {message}
              isOwner={i > 0}
            />
          {/each}
        </ul>
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
