import { api } from '../api';
import { BaseComponent } from '../baseComponent';
import { CarControl } from './carControl';
import { EngineControl } from './engineControl';
import { IWinnerData } from '../models/modelWinner';
import carImage from '../../assets/car.svg';
import './Car.scss';

export class Car extends BaseComponent {
  private flag = new BaseComponent(this.element, 'span', ['finish-flag']);

  public id: number;

  private car = new BaseComponent(this.element, 'span', ['car']);

  private carControls = new CarControl(this.element);

  name = new BaseComponent(this.element, 'h3', ['car-name']);

  private engineControl = new EngineControl(this.element);

  selected = false;

  carAnimation = 0;

  constructor(node: HTMLElement, name: string, color: string, id: number,
    callback: () => void) {
    super(node, 'li', ['car-item']);
    this.car.element.innerHTML = carImage;
    this.car.element.style.fill = `${color}`;
    const carColor = this.car.element.querySelector('svg');
    if (carColor) carColor.style.fill = `${color}`;
    this.id = id;
    this.name.element.textContent = `${name}`;
    this.carControls.remove.element.addEventListener('click', () => this.delete(callback));
    this.engineControl.start.element.addEventListener('click', () => this.drive().catch(() => {}));
    this.engineControl.stop.element.addEventListener('click', () => this.stop());
  }

  onSelect(callback: () => void): void {
    this.carControls.selectCar(() => {
      callback();
    });
  }

  delete(callback: () => void): void {
    api.deleteCar(this.id);
    api.delWinner(this.id);
    this.element.remove();
    callback();
  }

  drive(): Promise<IWinnerData> {
    return new Promise((resolve, reject) => {
      this.engineControl.toggleButton(this.engineControl.start);
      api.startEngine(this.id).then((response) => {
        this.engineControl.toggleButton(this.engineControl.stop);
        const time = response.distance / response.velocity;
        const start = Date.now();
        this.carAnimation = requestAnimationFrame(() => { this.animate(time, start); });
        api.driveCar(this.id).then((result) => {
          if (!result.success) {
            cancelAnimationFrame(this.carAnimation);
            reject(new Error('The engine has stopped'));
          } else {
            resolve({
              id: this.id,
              name: this.name.element.textContent,
              time: Number((time / 1000).toFixed(2)),
            });
          }
        });
      });
    });
  }

  animate(duration: number, start: number): void {
    let timeFraction = (Date.now() - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    this.car.element.style.left = `calc(${timeFraction * 73}% + 50px)`;
    if (timeFraction < 1) {
      this.carAnimation = requestAnimationFrame(() => this.animate(duration, start));
    }
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      api.stopEngine(this.id).then(() => {
        this.engineControl.toggleButton(this.engineControl.start);
        resolve();
      });
      cancelAnimationFrame(this.carAnimation);
      this.engineControl.toggleButton(this.engineControl.stop);
      this.car.element.style.left = '50px';
    });
  }
}
