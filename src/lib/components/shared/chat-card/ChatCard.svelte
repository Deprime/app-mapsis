<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import './ChatCard.scss';

  // Props
  export let user: any;
  export let event: any;
  export let message: any;
  export let hasNewMessage = false;

  const dispatch = createEventDispatcher();

  // Methods
  /**
   * On click
   */
  const onClick = (e: CustomEvent) => {
    dispatch('click', e)
  }
</script>

<div
  class={`chat-card ${ hasNewMessage ? 'new-msg' : ''}`}
  on:click={onClick}
>
  <h3 class="chat-card-title">
    {event.title}
  </h3>
  <div class="chat-card-details">
    <div class="chat-card-avatar">
      <img src={user.avatar} alt={user.id} />
    </div>
    <div class="chat-card-summary">
      <h4 class="chat-card-username">
        {user.name}
      </h4>
      <div class="chat-card-last-message">
        {@html message.text}
      </div>
    </div>
  </div>
</div>
