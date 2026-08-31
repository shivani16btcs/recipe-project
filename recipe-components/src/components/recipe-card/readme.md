# recipe-card



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default                |
| ------------- | -------------- | ----------- | --------- | ---------------------- |
| `cuisine`     | `cuisine`      |             | `string`  | `'International'`      |
| `description` | `description`  |             | `string`  | `'A delicious recipe'` |
| `favorite`    | `favorite`     |             | `boolean` | `false`                |
| `image`       | `image`        |             | `string`  | `''`                   |
| `recipeTitle` | `recipe-title` |             | `string`  | `'Recipe'`             |


## Events

| Event            | Description | Type                                                                                   |
| ---------------- | ----------- | -------------------------------------------------------------------------------------- |
| `selectRecipe`   |             | `CustomEvent<{ title: string; image: string; description: string; cuisine: string; }>` |
| `toggleFavorite` |             | `CustomEvent<{ title: string; favorite: boolean; }>`                                   |


## Slots

| Slot     | Description |
| -------- | ----------- |
| `"meta"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
