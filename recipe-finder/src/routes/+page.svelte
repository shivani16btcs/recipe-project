<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import RecipeForm from '$lib/RecipeForm.svelte';

  type Recipe = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
    strInstructions?: string;
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strIngredient6?: string;
    strIngredient7?: string;
    strIngredient8?: string;
    strIngredient9?: string;
    strIngredient10?: string;
    strMeasure1?: string;
    strMeasure2?: string;
    strMeasure3?: string;
    strMeasure4?: string;
    strMeasure5?: string;
    strMeasure6?: string;
    strMeasure7?: string;
    strMeasure8?: string;
    strMeasure9?: string;
    strMeasure10?: string;
  };

  let recipes: Recipe[] = [];
  let favorites: string[] = [];
  let mealPlan: Record<string, string> = {};
  let loading = true;
  let selectedCategory = 'all';
  let searchTerm = '';
  let selectedRecipe: Recipe | null = null;
  let customRecipes: Recipe[] = [];
  let showForm = false;
  let editingIndex: number | null = null;
  let initialTitle = '';
  let initialDescription = '';
  let initialIngredients = '';
  let initialInstructions = '';
  let initialImage = '';
  let showFavorites = false;

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getLocalStorage = () => {
    if (typeof localStorage === 'undefined') return;
    favorites = JSON.parse(localStorage.getItem('recipe-favorites') || '[]');
    mealPlan = JSON.parse(localStorage.getItem('recipe-meal-plan') || '{}');
    customRecipes = JSON.parse(localStorage.getItem('recipe-custom-list') || '[]');
  };

  const saveLocalStorage = () => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
    localStorage.setItem('recipe-meal-plan', JSON.stringify(mealPlan));
    localStorage.setItem('recipe-custom-list', JSON.stringify(customRecipes));
  };

  const fetchRecipes = async () => {
    loading = true;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const payload = await response.json();
    recipes = (payload.meals || []).slice(0, 12);
    loading = false;
  };

  onMount(() => {
    getLocalStorage();
    fetchRecipes();
  });

  $: filteredRecipes = [...recipes, ...customRecipes].filter((recipe) => {
    const matchesCategory = selectedCategory === 'all' || recipe.strCategory?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchTerm || recipe.strMeal?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const makeIngredientList = (recipe: Recipe) => {
    return Object.entries(recipe)
      .filter(([key, value]) => key.startsWith('strIngredient') && value)
      .map(([key, value]) => value)
      .join(', ');
  };

  const makeInstructionText = (recipe: Recipe) => {
    return recipe.strInstructions || 'No instructions available.';
  };

  const formatRecipe = (recipe: Recipe) => ({
    ...recipe,
    strCategory: recipe.strCategory || 'General',
    strArea: recipe.strArea || 'International',
  });

  const updateFavorite = (title: string, favorite: boolean) => {
    if (favorite) {
      favorites = [...new Set([...favorites, title])];
    } else {
      favorites = favorites.filter((item) => item !== title);
    }
    saveLocalStorage();
  };

  const openRecipe = (recipe: Recipe) => {
    selectedRecipe = formatRecipe(recipe);
  };

  const closeRecipe = () => {
    selectedRecipe = null;
  };

  const saveCustomRecipe = (event: CustomEvent) => {
    const payload = event.detail;
    const normalized: Recipe = {
      idMeal: `custom-${Date.now()}`,
      strMeal: payload.title,
      strMealThumb: payload.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      strCategory: 'Custom',
      strArea: 'Homemade',
      strInstructions: payload.instructions,
      strIngredient1: payload.ingredients,
      strMeasure1: 'As needed',
    };

    if (editingIndex !== null) {
      // preserve the original id when editing
      const existingId = customRecipes[editingIndex].idMeal;
      normalized.idMeal = existingId;
      customRecipes = customRecipes.map((recipe, index) => (index === editingIndex ? normalized : recipe));
      editingIndex = null;
    } else {
      customRecipes = [normalized, ...customRecipes];
    }

    saveLocalStorage();
    showForm = false;
  };

  const startCreateRecipe = () => {
    editingIndex = null;
    initialTitle = '';
    initialDescription = '';
    initialIngredients = '';
    initialInstructions = '';
    initialImage = '';
    showForm = true;
  };

  const startEditRecipe = (index: number) => {
    editingIndex = index;
    const r = customRecipes[index];
    initialTitle = r.strMeal;
    initialDescription = r.strInstructions || '';
    initialIngredients = r.strIngredient1 || '';
    initialInstructions = r.strInstructions || '';
    initialImage = r.strMealThumb || '';
    showForm = true;
  };

  const deleteCustomRecipe = (index: number) => {
    customRecipes = customRecipes.filter((_, itemIndex) => itemIndex !== index);
    saveLocalStorage();
  };

  const assignMeal = (day: string) => {
    const toPlan = selectedRecipe?.strMeal;
    if (!toPlan) return;
    mealPlan = { ...mealPlan, [day]: toPlan };
    saveLocalStorage();
  };

  const removeMeal = (day: string) => {
    const next = { ...mealPlan };
    delete next[day];
    mealPlan = next;
    saveLocalStorage();
  };

  const handleSearch = (event: CustomEvent<string>) => {
    searchTerm = event.detail;
  };

  const handleFilter = (event: CustomEvent<string>) => {
    selectedCategory = event.detail;
  };

  const handleNativeFilter = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    selectedCategory = target.value;
  };

  const handleFavoriteToggle = (event: Event) => {
    const customEvent = event as CustomEvent<{ title: string; favorite: boolean }>;
    updateFavorite(customEvent.detail.title, customEvent.detail.favorite);
  };

  const categoryOptions = ['all', 'beef', 'chicken', 'dessert', 'breakfast', 'vegan'];

$: displayedRecipes = [...recipes, ...customRecipes].filter((recipe) => {
  const matchesCategory = selectedCategory === 'all' || recipe.strCategory?.toLowerCase() === selectedCategory.toLowerCase();
  const matchesSearch = !searchTerm || recipe.strMeal?.toLowerCase().includes(searchTerm.toLowerCase());
  const isFavorite = favorites.includes(recipe.strMeal);
  if (showFavorites) return isFavorite && matchesCategory && matchesSearch;
  return matchesCategory && matchesSearch;
});
</script>

<svelte:head>
  <title>Recipe Finder</title>
</svelte:head>
<div class="page-shell">
  <header class="topbar">
    <div>
      <button type="button" class="eyebrow-button" >Healthy Meal Planner</button>
      <h1>Recipe Finder & Meal Planner</h1>
    </div>
    <div class="actions">
      <app-button label={showFavorites ? 'All' : 'Favorites'} variant="secondary" on:clickAction={() => (showFavorites = !showFavorites)}></app-button>
      <app-button label="Add recipe" variant="primary" on:clickAction={startCreateRecipe}></app-button>
    </div>
  </header>

  <section class="toolbar">
    <recipe-search value={searchTerm} placeholder="Search recipes" on:searchInput={handleSearch}></recipe-search>

    {#if browser && typeof customElements !== 'undefined' && customElements.get('recipe-filter')}
      <recipe-filter selected={selectedCategory} options={categoryOptions} on:filterChange={handleFilter}></recipe-filter>
    {:else}
      <label class="filter-wrap native-filter">
        <span>Filter</span>
        <select value={selectedCategory} on:change={handleNativeFilter}>
          {#each categoryOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      </label>
    {/if}
  </section>

  <section class="stats">
    <div class="stat-card"><span>Recipes</span><strong>{displayedRecipes.length}</strong></div>
    <div class="stat-card"><span>Favorites</span><strong>{favorites.length}</strong></div>
    <div class="stat-card"><span>Planned meals</span><strong>{Object.keys(mealPlan).length}</strong></div>
  </section>

  {#if showForm}
    <button type="button" class="backdrop" aria-label="Close recipe form" on:click={() => (showForm = false)}></button>
    <section class="panel modal-panel" role="dialog" aria-modal="true">
      <h2>{editingIndex !== null ? 'Edit recipe' : 'Add recipe'}</h2>
      <RecipeForm
        {initialTitle}
        {initialDescription}
        {initialIngredients}
        {initialInstructions}
        {initialImage}
        on:saveRecipe={saveCustomRecipe}
        on:cancelRecipe={() => (showForm = false)}
      />
    </section>
  {/if}

  <section class="content-grid">
    <div class="results">
      {#if loading}
        <p>Loading recipes…</p>
      {:else if displayedRecipes.length === 0}
        <p>No recipes match your current filters.</p>
      {:else}
        <div class="recipe-grid">
          {#each displayedRecipes as recipe}
            {#if browser && typeof customElements !== 'undefined' && customElements.get('recipe-card')}
              <recipe-card
                recipe-title={recipe.strMeal}
                image={recipe.strMealThumb}
                description={recipe.strInstructions ? recipe.strInstructions.slice(0, 120) + '…' : 'Fresh and easy to prepare.'}
                cuisine={recipe.strArea || 'International'}
                favorite={favorites.includes(recipe.strMeal)}
                on:selectRecipe={() => openRecipe(recipe)}
                on:toggleFavorite={handleFavoriteToggle}
              >
                <div slot="meta" class="meta-bar">
                  <button class="category-link" on:click={() => { selectedCategory = (recipe.strCategory || 'General').toLowerCase(); }}>
                    {recipe.strCategory || 'General'}
                  </button>
                  {#if customRecipes.some((item) => item.strMeal === recipe.strMeal)}
                    <button class="mini-button" on:click={() => startEditRecipe(customRecipes.findIndex((item) => item.strMeal === recipe.strMeal))}>Edit</button>
                    <button class="mini-button danger" on:click={() => deleteCustomRecipe(customRecipes.findIndex((item) => item.strMeal === recipe.strMeal))}>Delete</button>
                  {/if}
                </div>
              </recipe-card>
            {:else}
              <article class="native-card" on:click={() => openRecipe(recipe)}>
                <div class="native-image-wrap">
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                  <button
                    type="button"
                    class:active={favorites.includes(recipe.strMeal)}
                    class="favorite-button"
                    aria-label={favorites.includes(recipe.strMeal) ? 'Remove from favorites' : 'Add to favorites'}
                    on:click|stopPropagation={() => updateFavorite(recipe.strMeal, !favorites.includes(recipe.strMeal))}
                  >
                    {favorites.includes(recipe.strMeal) ? '♥' : '♡'}
                  </button>
                </div>

                <div class="native-card-content">
                  <span class="native-cuisine">{recipe.strArea || 'International'}</span>
                  <h3>{recipe.strMeal}</h3>
                  <p>{recipe.strInstructions ? recipe.strInstructions.slice(0, 120) + '…' : 'Fresh and easy to prepare.'}</p>

                  <div class="meta-bar">
                    <button class="category-link" on:click|stopPropagation={() => { selectedCategory = (recipe.strCategory || 'General').toLowerCase(); }}>
                      {recipe.strCategory || 'General'}
                    </button>
                    {#if customRecipes.some((item) => item.strMeal === recipe.strMeal)}
                      <button class="mini-button" on:click|stopPropagation={() => startEditRecipe(customRecipes.findIndex((item) => item.strMeal === recipe.strMeal))}>Edit</button>
                      <button class="mini-button danger" on:click|stopPropagation={() => deleteCustomRecipe(customRecipes.findIndex((item) => item.strMeal === recipe.strMeal))}>Delete</button>
                    {/if}
                  </div>
                </div>
              </article>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <aside class="planner">
      <h2>Weekly Meal Planner</h2>
      <div class="day-list">
        {#each dayNames as day}
          <div class="day-item">
            <span>{day}</span>
            <strong>{mealPlan[day] || 'Open'}</strong>
            {#if mealPlan[day]}
              <button type="button" class="mini-button danger" on:click={() => removeMeal(day)}>Remove</button>
            {:else if selectedRecipe}
              <button type="button" class="mini-button" on:click={() => assignMeal(day)}>Assign</button>
            {/if}
          </div>
        {/each}
      </div>
    </aside>
  </section>

  {#if selectedRecipe}
    <recipe-modal open={true} modal-title={selectedRecipe.strMeal} on:closeModal={closeRecipe}>
      <div class="detail-layout">
        <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} class="detail-image" />
        <div>
          <p class="meta-line">{selectedRecipe.strArea} • {selectedRecipe.strCategory}</p>
          <h3>Ingredients</h3>
          <p>{makeIngredientList(selectedRecipe)}</p>
          <h3>Instructions</h3>
          <p>{makeInstructionText(selectedRecipe)}</p>
          <div style="margin-top:1rem">
            <a class="mini-button" href={`/recipes/${selectedRecipe.idMeal}`}>View full recipe page</a>
          </div>
        </div>
      </div>
    </recipe-modal>
  {/if}
</div>

<style>
  .page-shell {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.25rem 3rem;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .eyebrow-button {
    margin: 0 0 0.4rem;
    padding: 0;
    border: none;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.72rem;
    font-weight: 700;
    color: #5f7d68;
    cursor: pointer;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 3vw, 3rem);
  }

  .toolbar,
  .stats,
  .panel,
  .content-grid {
    margin-top: 1.5rem;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 2;
  }

  .toolbar {
    display: grid;
    grid-template-columns: 1.4fr 0.8fr;
    gap: 1rem;
  }

  .filter-wrap {
    display: grid;
    gap: 0.5rem;
    color: #23393c;
    font-weight: 600;
  }

  .native-filter select {
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(35, 59, 61, 0.15);
    padding: 0.8rem 0.9rem;
    font: inherit;
    background: #fff;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .stat-card,
  .panel,
  .planner {
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(35, 59, 61, 0.08);
    border-radius: 18px;
    box-shadow: 0 10px 32px rgba(17, 29, 31, 0.05);
  }

  .stat-card {
    padding: 1rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stat-card span {
    color: #59696b;
  }

  .stat-card strong {
    font-size: 1.8rem;
  }

  .panel {
    padding: 1.25rem;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 40;
  }

  .modal-panel {
    position: fixed;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    width: min(720px, 96%);
    z-index: 50;
  }

  .content-grid {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(280px, 0.9fr);
    gap: 1.25rem;
  }

  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .planner {
    padding: 1rem;
  }

  .day-list {
    display: grid;
    gap: 0.75rem;
  }

  .day-item {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 0.5rem;
    align-items: center;
    padding: 0.75rem 0.85rem;
    background: #f7f5f2;
    border-radius: 12px;
  }

  .mini-button {
    border: none;
    border-radius: 999px;
    padding: 0.4rem 0.7rem;
    background: #e8efe8;
    color: #22473b;
    font-weight: 700;
    cursor: pointer;
  }

  .mini-button.danger {
    background: #f9e7e5;
    color: #7b2f2f;
  }

  .native-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border: 1px solid rgba(35, 59, 61, 0.08);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(17, 29, 31, 0.06);
    cursor: pointer;
  }

  .native-image-wrap {
    position: relative;
    height: 180px;
  }

  .native-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .favorite-button {
    position: absolute;
    top: 12px;
    right: 12px;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 999px;
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .favorite-button.active {
    background: #fdf1ee;
    color: #d14949;
  }

  .native-card-content {
    padding: 1rem;
  }

  .native-cuisine {
    display: inline-block;
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #487d6f;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .native-card-content h3 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
  }

  .native-card-content p {
    margin: 0;
    color: #526265;
    line-height: 1.5;
  }

  .meta-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.8rem;
    font-size: 0.8rem;
    color: #526265;
  }

  .category-link {
    background: transparent;
    border: none;
    color: #526265;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }
  .category-link:hover { text-decoration: underline }

  .detail-layout {
    display: grid;
    grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
    gap: 1rem;
  }

  .detail-image {
    width: 100%;
    border-radius: 16px;
    object-fit: cover;
    min-height: 220px;
  }

  .meta-line {
    color: #5a696e;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .toolbar,
    .content-grid,
    .stats,
    .detail-layout {
      grid-template-columns: 1fr;
    }

    .topbar {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
