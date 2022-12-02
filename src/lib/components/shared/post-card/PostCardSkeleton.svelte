<script lang="ts">
  // Components
  import { Skeleton } from '$lib/components/ui';
</script>

<div class="bg-white w-full flex flex-col h-[300px] rounded-lg p-4">
  <Skeleton
    height="160px"
    class="rounded-md mb-3"
  />
  <Skeleton
    height="24px"
    class="rounded-md mb-1"
  />
  <Skeleton
    height="24px"
    width="100px"
    class="rounded-md mb-3"
  />

  <Skeleton
    height="14px"
    class="rounded-md mb-0.5"
  />
  <Skeleton
    height="14px"
    width="65%"
    class="rounded-md"
  />
</div>
