import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'recipe-card',
  styleUrl: 'recipe-card.css',
  shadow: true,
})
export class RecipeCard {
  @Prop() recipeTitle: string = 'Recipe';
  @Prop() image: string = '';
  @Prop() description: string = 'A delicious recipe';
  @Prop() cuisine: string = 'International';
  @Prop() favorite: boolean = false;

  @Event() selectRecipe: EventEmitter<{ title: string; image: string; description: string; cuisine: string }>;
  @Event() toggleFavorite: EventEmitter<{ title: string; favorite: boolean }>;

  private onSelect = () => {
    this.selectRecipe.emit({
      title: this.recipeTitle,
      image: this.image,
      description: this.description,
      cuisine: this.cuisine,
    });
  };

  private onFavoriteClick = (event: Event) => {
    event.stopPropagation();
    this.toggleFavorite.emit({ title: this.recipeTitle, favorite: !this.favorite });
  };

  render() {
    return (
      <article class="card" onClick={this.onSelect}>
        <div class="image-wrap">
          {this.image ? <img src={this.image} alt={this.recipeTitle} /> : <div class="placeholder">No image</div>}
          <button
            type="button"
            class={{ favoriteButton: true, active: this.favorite }}
            aria-label={this.favorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={this.onFavoriteClick}
          >
            {this.favorite ? '♥' : '♡'}
          </button>
        </div>

        <div class="content">
          <span class="eyebrow">{this.cuisine}</span>
          <h3>{this.recipeTitle}</h3>
          <p>{this.description}</p>
          <slot name="meta" />
        </div>
      </article>
    );
  }
}
