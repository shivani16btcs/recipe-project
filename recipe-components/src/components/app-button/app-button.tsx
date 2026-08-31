import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.css',
  shadow: true,
})
export class AppButton {
  @Prop() label: string = 'Continue';
  @Prop() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Prop() type: 'button' | 'submit' = 'button';

  @Event() clickAction: EventEmitter<void>;

  private handleClick = () => {
    this.clickAction.emit();
  };

  render() {
    return (
      <button class={{ primary: this.variant === 'primary', secondary: this.variant === 'secondary', danger: this.variant === 'danger' }} type={this.type} onClick={this.handleClick}>
        {this.label}
      </button>
    );
  }
}
