<script lang="ts">
  import './ChatMessage.scss'

  // Props
  export let message: any;
  export let user: any|null = null;
  export let isOwner = false;
</script>

<li class="chat-item">
  {#if user}
    <img src={`/avatars/${user.id}.jpg`} alt="" class="chat-item-avatar">
  {:else}
    <figure class="w-10 h-10" />
  {/if}
  <div class={`chat-msg ${isOwner ? "chat-msg-owner" : "chat-msg-opposite"}`}>
    {message.text}
  </div>
</li>
