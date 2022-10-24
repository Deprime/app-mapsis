<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from '$lib/config/i18n';

  // Components
  import { ChatCard } from '$lib/components/shared'

  // Data
  let eventChatList = [];
  const messages = [
    'Очень завораживающее место <i class="em em-heart_eyes" aria-role="presentation" aria-label="SMILING FACE WITH HEART-SHAPED EYES"></i> Я уже выдвигаюсь туда, где будет удобней всего встретиться и затусить',
    'Добрый день, хотела бы присоединится к вашей компании <i class="em em-rocket" aria-role="presentation" aria-label="ROCKET"></i> буду через 20 минут',
    'Подскажите, что делать? <i class="em em-anguished" aria-role="presentation" aria-label="ANGUISHED FACE"></i> Я пришел по адресу, но не могу попасть внутрь, охрана меня выгоняет и их аргумент - что я похожа на бомжа',
  ];
  const events = [
    'Восхождение на гору Олимп',
    'Веселая party под открытым небом',
    'VK Group meetup',
  ];
  const users = [
    'Валера Дутти',
    'Джимбо Старс',
    'Катеринка'
  ]

  // Methods
  const getEventChatList = () => {
    eventChatList = [...Array(3).keys()].map((el: number, i: number) => {
      const id = i + 1;
      return {
        id,
        title: events[i],
        user: {
          name: users[i],
          avatar: `/avatars/${id}.jpg`
        },
        message: {
          text: messages[i],
          created_at: '2022-08-05 10:32:00',
        }
      }
    })
  };

  /**
   *
   */
  const onChatClick = (event) => {
    goto(`/app/im/${event.id}`)
    console.log(event)
  }

  onMount(() => {
    getEventChatList();
  })
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="ms-h-screen">
  <header class="py-4 px-6 ">
    <h3 class="font-extrabold text-slate-800">
      {$_('pages.im.chats')}
    </h3>
  </header>
  <section class="chat-list px-6">
    {#each eventChatList as event}
      <ChatCard
        user={event.user}
        event={event}
        message={event.message}
        hasNewMessage={event.id < 2}
        on:click={() => onChatClick(event)}
      />
    {/each}
  </section>
</section>
