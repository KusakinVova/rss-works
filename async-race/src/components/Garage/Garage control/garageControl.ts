import { BaseComponent } from '../../../shared/baseComponent';
import { CarCreateControls } from './CarCreateControl';
import { CarUpdateControls } from './CarUpdateControls';
import { ControlButtons } from './ControlButtons';
import './garageControl.scss';

export class GarageControl extends BaseComponent {
  createCar: CarCreateControls = new CarCreateControls(this.element);

  updateCar: CarUpdateControls = new CarUpdateControls(this.element);

  controlButtons: ControlButtons = new ControlButtons(this.element);

  constructor(node: HTMLElement) {
    super(node, 'form', ['garage-control']);
  }

  insertSelectedCarInfo(name: string, color: string): void {
    this.updateCar.insertSelectedCarInfo(name, color);
    this.updateCar.toggleButtonLock();
  }
}
