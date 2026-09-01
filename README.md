# Recipe Finder & Meal Planner

This project contains a SvelteKit app and a reusable StencilJS component library in separate folders:

- `recipe-finder/` — SvelteKit application
- `recipe-components/` — StencilJS component library

## Stack

- SvelteKit
- Svelte 5
- StencilJS
- TypeScript
- TheMealDB public API

## Setup

1. Install the component library dependencies:
   ```bash
   cd recipe-components
   npm install
   ```
2. Build the component library:
   ```bash
   npm run build
   ```
3. Install the app dependencies:
   ```bash
   cd ../recipe-finder
   npm install
   ```
4. Start the app:
   ```bash
   npm run dev
   ```

## npm publish

From the `recipe-components` folder:

```bash
npm login
npm publish --access public
```

The library is named as:

```text
@recipe-works/recipe-components
```

## Published package

- npm: https://www.npmjs.com/package/@shivani16btcs/recipe-components

## GitHub repository

- Add your GitHub repo URL here

## Assumptions

- The app uses the public TheMealDB API for recipe discovery.
- Favorite recipes and weekly meal-plan details are stored in browser localStorage.
- The app intentionally uses npm package consumption rather than source imports for the Stencil UI library.
