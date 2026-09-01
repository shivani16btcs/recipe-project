<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (typeof window === 'undefined') return;

    try {
      const { defineCustomElements } = await import('@shivani16btcs/recipe-components/loader');
      await defineCustomElements(window);
    } catch (error) {
      console.error('Failed to register recipe components', error);
    }
  });
</script>

<slot />
