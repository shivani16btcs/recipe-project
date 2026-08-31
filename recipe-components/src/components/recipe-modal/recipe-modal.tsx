import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'recipe-modal',
  styleUrl: 'recipe-modal.css',
  shadow: true,
})
export class RecipeModal {
  @Prop() open: boolean = false;
  @Prop() modalTitle: string = 'Recipe details';

  @Event() closeModal: EventEmitter<void>;

  render() {
    if (!this.open) return null;

    return (
      <div class="backdrop" onClick={() => this.closeModal.emit()}>
        <div class="modal" onClick={(event) => event.stopPropagation()}>
          <header>
            <h3>{this.modalTitle}</h3>
            <button type="button" onClick={() => this.closeModal.emit()}>✕</button>
          </header>
          <div class="content">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
