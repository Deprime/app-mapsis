<script lang="ts">
  import './PolicyFooter.scss';
  import { _ } from '$lib/config/i18n';
</script>

<div class="ms-policy-footer">
  {@html $_('pages.policy.footer', {values: { terms_url: '/service-terms', privacy_url: '/privacy-policy' }})}
</div>
