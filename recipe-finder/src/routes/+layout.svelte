<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    try {
      const loaderModule = await import('@shivani16btcs/recipe-components/loader');
      const defineCustomElements = (loaderModule as any).defineCustomElements ?? (loaderModule as any).default?.defineCustomElements;
      if (typeof defineCustomElements === 'function') {
        defineCustomElements(window);
      }
    } catch (error) {
      try {
        const pkgModule = await import('@shivani16btcs/recipe-components');
        const defineCustomElements = (pkgModule as any).defineCustomElements ?? (pkgModule as any).default?.defineCustomElements;
        if (typeof defineCustomElements === 'function') {
          defineCustomElements(window);
        }
      } catch (fallbackError) {
        console.error('Failed to register recipe components', fallbackError);
      }
    }
  });
</script>

<slot />
