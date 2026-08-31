import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'recipe-search',
  styleUrl: 'recipe-search.css',
  shadow: true,
})
export class RecipeSearch {
  @Prop() value: string = '';
  @Prop() placeholder: string = 'Search for recipes';

  @Event() searchInput: EventEmitter<string>;

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.searchInput.emit(target.value);
  };

  render() {
    return (
      <div class="search-box">
        <span class="icon">⌕</span>
        <input type="search" value={this.value} placeholder={this.placeholder} onInput={this.handleInput} />
      </div>
    );
  }
}
