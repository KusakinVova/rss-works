import { api } from '../../../shared/api';
import { BaseComponent } from '../../../shared/baseComponent';
import { Button } from '../../../shared/button/button';
import { Car } from '../../../shared/Car/Car';
import { Input } from '../../../shared/input/input';

export class CarUpdateControls extends BaseComponent {
  private name: Input = new Input(this.element, ['text-input'], 'text');

  private color: Input = new Input(this.element, ['color-input'], 'color');

  public button: Button = new Button(this.element, ['button', 'button_blue'], 'Update', true);

  constructor(node: HTMLElement) {
    super(node, 'div', ['update-car_inputs']);
  }

  toggleButtonLock(): void {
    if (this.name.element.value === '') {
      this.button.element.disabled = true;
    } else {
      this.button.element.disabled = false;
    }
  }

  insertSelectedCarInfo(name: string, color: string): void {
    this.name.element.value = name;
    this.color.element.value = color;
  }

  addUpdateListener(car: Car, id: number, carImage: SVGSVGElement, name: HTMLElement): void {
    this.button.element.addEventListener('click', (event) => {
      if (car.selected) {
        event.preventDefault();
        this.updateCar(id, carImage, name);
      }
    }, { once: true });
  }

  updateCar(id: number, carImage: SVGSVGElement, name: HTMLElement): void {
    const body = {
      name: this.name.element.value,
      color: this.color.element.value,
    };
    carImage.style.fill = this.color.element.value;
    name.textContent = this.name.element.value;
    api.updateCar(id, body).then(() => {
      this.clearInputs();
    });
  }

  clearInputs(): void {
    this.name.element.value = '';
    this.color.element.value = '#ffffff';
    this.toggleButtonLock();
  }
}
