# recipe-components

A reusable **StencilJS component library** for building recipe-based applications. This library provides a collection of web components designed specifically for recipe finder and recipe management apps.

## Features

✨ **Web Components** - Framework-agnostic, works with any JavaScript framework or vanilla JS
🏗️ **Built with StencilJS** - High-performance, lightweight components
📦 **Scoped Package** - Published as `@shivani16btcs/recipe-components` on npm
🎨 **Reusable UI Elements** - Pre-built components for recipe display, search, and filtering
🧪 **Fully Tested** - Comprehensive test coverage with Jest and E2E tests
📖 **TypeScript Support** - Full TypeScript definitions included

## Installation

```bash
npm install @shivani16btcs/recipe-components
```

Or with yarn:

```bash
yarn add @shivani16btcs/recipe-components
```

Or with pnpm:

```bash
pnpm add @shivani16btcs/recipe-components
```

## Usage

### In a Web Application

1. **Import the component library in your HTML:**

```html
<script type="module" src="node_modules/@shivani16btcs/recipe-components/dist/recipe-components/recipe-components.esm.js"></script>
<link rel="stylesheet" href="node_modules/@shivani16btcs/recipe-components/dist/recipe-components/recipe-components.css">
```

2. **Use the components in your HTML:**

```html
<recipe-card>
  <h2>Chocolate Chip Cookies</h2>
  <p>A delicious classic recipe</p>
</recipe-card>
```

### In a SvelteKit Application

```svelte
<script>
  import '@shivani16btcs/recipe-components';
  import { RecipeCard } from '@shivani16btcs/recipe-components';
</script>

<recipe-card title="Pasta Carbonara" description="Authentic Italian pasta" />
```

### In a React Application

```jsx
import '@shivani16btcs/recipe-components';

function App() {
  return (
    <recipe-card title="Biryani" description="Aromatic Indian rice dish" />
  );
}
```

## Available Components

This library includes the following web components:

- **`<recipe-card>`** - Display individual recipe information
- **`<recipe-search>`** - Search component for finding recipes
- **`<recipe-filter>`** - Filter recipes by cuisine, diet, etc.
- **`<recipe-list>`** - Display multiple recipes in a grid or list

*(Expand this section with your actual components)*

## Development

### Build

```bash
npm run build
```

Generates optimized distribution files in the `dist/` directory.

### Start Dev Server

```bash
npm start
```

Starts a development server with hot reload.

### Run Tests

```bash
npm test
```

Runs unit tests and E2E tests using Jest.

## Project Structure

```
recipe-components/
├── src/
│   ├── components/     # Component source files
│   ├── index.ts       # Main entry point
│   └── types/         # TypeScript definitions
├── dist/              # Compiled output (generated)
├── package.json       # Package configuration
└── stencil.config.ts  # Stencil configuration
```

## Publishing

This package is automatically published to npm when changes are pushed to the `recipe-components/` directory on the `main` branch via GitHub Actions.

To publish a new version:

1. Update the version in `package.json`
2. Commit and push to `main`
3. GitHub Actions will automatically build and publish

## Technologies Used

- **[StencilJS](https://stenciljs.com/)** - Web component compiler
- **TypeScript** - Type-safe development
- **Jest** - Unit testing
- **Stencil E2E** - End-to-end testing

## License

MIT License - feel free to use this in your projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or feature requests, please open an issue on [GitHub](https://github.com/shivani16btcs/recipe-project).

---

**Made with ❤️ by shivani16btcs**
