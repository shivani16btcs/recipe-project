<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  let recipe: any = null;
  let loading = true;

  $: id = $page.params.id;

  const fetchRecipe = async (id: string) => {
    loading = true;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const payload = await res.json();
    recipe = (payload.meals && payload.meals[0]) || null;
    loading = false;
  };

  $: if (id) {
    fetchRecipe(id);
  }

  const makeIngredientList = (r: any) => {
    if (!r) return '';
    return Object.entries(r)
      .filter(([k, v]) => k.startsWith('strIngredient') && v)
      .map(([k, v]) => v)
      .join(', ');
  };
</script>

<svelte:head>
  <title>{recipe ? recipe.strMeal : 'Recipe'}</title>
</svelte:head>

{#if loading}
  <p>Loading recipe…</p>
{:else if !recipe}
  <p>Recipe not found.</p>
{:else}
  <div class="page-shell">
    <header>
      <h1>{recipe.strMeal}</h1>
      <p class="meta-line">{recipe.strArea} • {recipe.strCategory}</p>
    </header>

    <section class="detail-layout">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} class="detail-image" />
      <div>
        <h3>Ingredients</h3>
        <p>{makeIngredientList(recipe)}</p>
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
      </div>
    </section>
  </div>
{/if}

<style>
  .page-shell { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
  .detail-layout { display: grid; grid-template-columns: 320px 1fr; gap: 1rem; }
  .detail-image { width: 100%; border-radius: 12px; object-fit: cover; }
</style>
