<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    await import('@recipe-works/recipe-components');
  });
</script>

<slot />
