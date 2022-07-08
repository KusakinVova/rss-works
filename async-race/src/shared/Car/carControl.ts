import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';

export class CarControl extends BaseComponent {
  private select = new Button(this.element, ['button', 'button_blue'], 'Select', false);

  remove = new Button(this.element, ['button', 'button_blue'], 'Remove', false);

  constructor(node: HTMLElement) {
    super(node, 'div', ['car-control-buttons']);
  }

  selectCar(callback: () => void): void {
    this.select.element.addEventListener('click', (event) => {
      event.preventDefault();
      callback();
    });
  }
}
