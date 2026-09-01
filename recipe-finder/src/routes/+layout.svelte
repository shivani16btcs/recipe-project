<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    // Import the Stencil loader to register web components from the published package
    try {
      await import('@shivani16btcs/recipe-components/loader');
    } catch (e) {
      // fallback: import package entry if loader path isn't available
      await import('@shivani16btcs/recipe-components');
    }
  });
</script>

<slot />
