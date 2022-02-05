import { BaseComponent } from '../../../shared/baseComponent';
import { Button } from '../../../shared/button/button';
import { Input } from '../../../shared/input/input';
import { ICarProps } from '../../../shared/models/modelCarProps';

export class CarCreateControls extends BaseComponent {
  name: Input = new Input(this.element, ['text-input'], 'text');

  color: Input = new Input(this.element, ['color-input'], 'color');

  button: Button = new Button(this.element, ['button', 'button_blue'], 'Create', true);

  constructor(node: HTMLElement) {
    super(node, 'div', ['create-car_inputs']);
    this.name.element.addEventListener('input', () => { this.toggleButtonLock(); });
  }

  getProperties(): ICarProps {
    return {
      name: this.name.element.value,
      color: this.color.element.value,
    };
  }

  clearInputs(): void {
    this.name.element.value = '';
    this.color.element.value = '#ffffff';
    this.toggleButtonLock();
  }

  toggleButtonLock(): void {
    if (this.name.element.value === '') {
      this.button.element.disabled = true;
    } else {
      this.button.element.disabled = false;
    }
  }
}
