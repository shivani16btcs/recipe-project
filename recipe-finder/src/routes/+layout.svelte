<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (typeof window === 'undefined') return;

    try {
      const { defineCustomElements } = await import('@shivani16btcs/recipe-components/loader');
      await defineCustomElements(window);
      console.log('Recipe components loaded successfully');
    } catch (error) {
      console.error('Failed to register recipe components:', error);
      // Mark that components failed to load by setting a flag
      window.recipeComponentsFailed = true;
    }
  });
</script>

<slot />
