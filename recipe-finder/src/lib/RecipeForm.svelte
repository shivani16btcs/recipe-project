<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let initialTitle = '';
  export let initialDescription = '';
  export let initialIngredients = '';
  export let initialInstructions = '';
  export let initialImage = '';

  const dispatch = createEventDispatcher();

  let title = initialTitle;
  let description = initialDescription;
  let ingredients = initialIngredients;
  let instructions = initialInstructions;
  let image = initialImage;

  let errors: string[] = [];

  const validate = () => {
    errors = [];
    if (!title || title.trim().length < 3) errors.push('Title is required (min 3 chars).');
    if (!ingredients || ingredients.trim().length < 3) errors.push('Provide at least one ingredient.');
    return errors.length === 0;
  };

  const save = () => {
    if (!validate()) return;
    dispatch('saveRecipe', {
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
      image: image.trim(),
    });
  };

  const cancel = () => dispatch('cancelRecipe');
</script>

<div class="form">
  {#if errors.length}
    <ul class="errors">
      {#each errors as err}
        <li>{err}</li>
      {/each}
    </ul>
  {/if}

  <label>
    Title
    <input bind:value={title} placeholder="Recipe title" />
  </label>

  <label>
    Image URL
    <input bind:value={image} placeholder="Optional image URL" />
  </label>

  <label>
    Ingredients (comma separated)
    <textarea bind:value={ingredients} placeholder="eg. 2 eggs, 1 cup flour"></textarea>
  </label>

  <label>
    Instructions
    <textarea bind:value={instructions} placeholder="How to prepare"></textarea>
  </label>

  <div class="actions">
    <button class="btn" on:click={save}>Save</button>
    <button class="btn muted" on:click={cancel} type="button">Cancel</button>
  </div>
</div>

<style>
  .form { display:flex; flex-direction:column; gap:0.6rem }
  label { display:flex; flex-direction:column; font-weight:600; font-size:0.9rem }
  input, textarea { padding:0.6rem; border-radius:8px; border:1px solid #ddd }
  textarea { min-height:100px }
  .actions { display:flex; gap:0.5rem; margin-top:0.5rem }
  .btn { background:#22473b; color:white; padding:0.5rem 0.9rem; border-radius:8px; border:none }
  .btn.muted { background:#eee; color:#333 }
  .errors { color:#7b2f2f; margin:0 0 0.5rem 0 }
</style>
