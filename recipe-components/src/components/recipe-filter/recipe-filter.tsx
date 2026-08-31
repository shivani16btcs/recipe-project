import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'recipe-filter',
  styleUrl: 'recipe-filter.css',
  shadow: true,
})
export class RecipeFilter {
  @Prop() selected: string = 'all';
  @Prop() options: string[] = ['all', 'breakfast', 'lunch', 'dinner', 'dessert'];

  @Event() filterChange: EventEmitter<string>;

  private handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    this.filterChange.emit(target.value);
  };

  render() {
    return (
      <label class="filter-wrap">
        <span>Filter</span>
        <select onInput={this.handleChange}>
          {this.options.map((option) => (
            <option value={option} selected={option === this.selected}>{option}</option>
          ))}
        </select>
      </label>
    );
  }
}
