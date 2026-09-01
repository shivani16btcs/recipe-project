<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    await import('@shivani16btcs/recipe-components');
  });
</script>

<slot />
