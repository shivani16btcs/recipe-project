import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'meal-planner',
  styleUrl: 'meal-planner.css',
  shadow: true,
})
export class MealPlanner {
  @Prop() days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  @Prop() meals: Record<string, string> = {};

  @Event() removeMeal: EventEmitter<string>;

  private handleRemove = (day: string) => {
    this.removeMeal.emit(day);
  };

  render() {
    return (
      <div class="planner-grid">
        {this.days.map((day) => (
          <div class="day-box">
            <div class="day-header">
              <h4>{day}</h4>
              {this.meals[day] ? (
                <button type="button" onClick={() => this.handleRemove(day)}>Remove</button>
              ) : null}
            </div>
            {this.meals[day] ? (
              <div class="meal-content">
                <strong>{this.meals[day]}</strong>
              </div>
            ) : (
              <p>No meal assigned</p>
            )}
          </div>
        ))}
      </div>
    );
  }
}
