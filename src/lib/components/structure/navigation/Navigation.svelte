<script lang="ts">
  import './Navigation.scss';

  import { _ } from '$lib/config/i18n';
  import { page as currentPage } from '$app/stores';

  // import EventEditor from '$lib/assets/images/nav-icons/event-editor.svg';
  import Im from '$lib/assets/images/nav-icons/im.svg';
  import Search from '$lib/assets/images/nav-icons/search.svg';
  import Posts from '$lib/assets/images/nav-icons/posts.svg';
  import Profile from '$lib/assets/images/nav-icons/profile.svg';

  let page;
  currentPage.subscribe(value => {page = value});

  const nav = [
    {title: 'Search', tag: 'search', link:'/app/map', icon: Search },
    {title: 'Adds', tag: 'posts', link:'/app/my-posts', icon: Posts},
    {title: 'Messenger', tag: 'im', link:'/app/im', icon: Im},
    {title: 'Profile', tag: 'profile', link:'/app/profile', icon: Profile},
  ];
</script>

<nav class="ms-nav">
  {#each nav as item}
    <a
      href={item.link}
      class={`ms-nav-item ${page.url.pathname === item.link ? `ms-nav-item-current` : ``}`}
    >
      <img
        src={item.icon}
        alt={item.tag}
        class="ms-nav-item-icon"
      />
      <span class="ms-nav-item-label">
        {$_(`pages.${item.tag}.nav_title`, {default: item.title})}
      </span>
    </a>
  {/each}
</nav>
