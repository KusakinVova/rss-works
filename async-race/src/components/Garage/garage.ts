import { generateCar } from '../../shared/additionalFunctions/generateCar';
import { api } from '../../shared/api';
import { BaseComponent } from '../../shared/baseComponent';
import { Button } from '../../shared/button/button';
import { Car } from '../../shared/Car/Car';
import { LAST_ELEMENT_INDEX, PAGE_LENGTH } from '../../shared/constants';
import { ICarModel } from '../../shared/models/modelCar';
import { ICarProps } from '../../shared/models/modelCarProps';
import { IWinnerData } from '../../shared/models/modelWinner';
import { GarageControl } from './Garage control/garageControl';
import './garage.scss';

export class Garage extends BaseComponent {
  private garageControl: GarageControl = new GarageControl(this.element);

  private pageName = new BaseComponent(this.element, 'h2', ['page-title', 'text-center']);

  private pageText = new BaseComponent(this.element, 'p', ['page-number']);

  private carsList = new BaseComponent(this.element, 'ul', ['cars-list']);

  private carsArray: Car[] = [];

  private paginationContainer = new BaseComponent(this.element, 'div', ['pagination-buttons']);

  private prevPageBtn = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Prev', true);

  private nextPageBtn = new Button(this.paginationContainer.element, ['button', 'button_green'], 'Next', false);

  private pageNumber = 1;

  private winMessage = new BaseComponent(this.element, 'div', ['win-message-container', 'visually-hidden']);

  private winner: IWinnerData = { id: 0, name: null, time: 0 };

  constructor(node: HTMLElement) {
    super(node, 'section', ['garage']);
    this.pageText.element.textContent = `Page #${this.pageNumber}`;
    this.renderGarage();
    this.addCreateCarListener();
    this.prevPageBtn.element.addEventListener('click', () => this.changePage(this.prevPageBtn));
    this.nextPageBtn.element.addEventListener('click', () => this.changePage(this.nextPageBtn));
    this.element.addEventListener('click', () => this.updatePaginationButtons());
    const { generateCars } = this.garageControl.controlButtons;
    const { race } = this.garageControl.controlButtons;
    const { reset } = this.garageControl.controlButtons;
    generateCars.element.addEventListener('click', (event) => {
      event.preventDefault();
      this.addCars(100, () => generateCar());
    });
    race.element.addEventListener('click', () => { this.startRace(); });
    reset.element.addEventListener('click', () => { this.resetRace(); });
  }

  renderGarage(): void {
    this.renderCars();
    this.updatePageName();
    this.updatePaginationButtons();
  }

  renderCars(): void {
    api.getCars(this.pageNumber).then((cars) => {
      const { items } = cars;
      if (this.carsArray.length < PAGE_LENGTH) {
        for (let i = this.carsArray.length; i < items.length; i++) {
          const newCarOnPage = new Car(this.carsList.element, items[i].name, items[i].color, items[i].id,
            () => { this.updatePageName(); this.updatePage(); });
          this.carsArray.push(newCarOnPage);
        }
      } else {
        this.replaceCars(this.pageNumber);
        this.addMissingCars(this.pageNumber);
      }
      this.addSelectListener();
    });
  }

  addSelectListener(): void {
    this.carsArray.forEach((element) => {
      element.onSelect(() => {
        this.carsArray.forEach((el) => { el.selected = false; });
        element.selected = true;
        this.updateSelectedCar(element);
      });
    });
  }

  async updateSelectedCar(element: Car): Promise<void> {
    const car = await api.getCar(element.id);
    this.garageControl.insertSelectedCarInfo(car.name, car.color);
    const carImage = element.element.querySelector('svg');
    if (carImage) {
      this.garageControl.updateCar.addUpdateListener(
        element,
        car.id,
        carImage,
        element.name.element,
      );
    }
  }

  async updatePage(): Promise<void> {
    const pageItems = (await api.getCars(this.pageNumber)).items;
    if (pageItems.length === 0 && this.pageNumber > 1) {
      this.changePage(this.prevPageBtn);
    } else if (pageItems.length > 0 && pageItems.length < PAGE_LENGTH && this.pageNumber === 1) {
      this.updateCarsArray();
    } else if (pageItems.length === PAGE_LENGTH) {
      this.renderLastElement(pageItems);
    }
  }

  renderLastElement(pageItems: ICarModel[]): void {
    const lastElement = pageItems[LAST_ELEMENT_INDEX];
    const car = new Car(
      this.carsList.element,
      lastElement.name, lastElement.color,
      lastElement.id,
      () => { this.updatePageName(); this.updatePage(); },
    );
    this.carsArray.push(car);
    this.updateCarsArray();
  }

  updateCarsArray(): void {
    api.getCars(this.pageNumber).then((respone) => {
      const { items } = respone;
      this.carsArray.forEach((car) => {
        let check = false;
        items.forEach((item) => {
          if (car.id === item.id) {
            check = true;
          }
        });
        if (check === false) {
          this.carsArray.splice(this.carsArray.indexOf(car), 1);
        }
      });
    });
  }

  addCreateCarListener(): void {
    const createCarBtn = this.garageControl.createCar.button.element;
    createCarBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.addCars(1, () => this.garageControl.createCar.getProperties());
    });
  }

  updatePageName(): void {
    api.getCars(this.pageNumber).then((result) => {
      this.pageName.element.textContent = `Garage (${result.count})`;
    });
  }

  updatePageNumber(num: number): void {
    this.pageText.element.textContent = `Page #${num}`;
  }

  changePage(direction: Button): void {
    if (direction === this.prevPageBtn) {
      this.updatePageNumber(--this.pageNumber);
      this.addMissingCars(this.pageNumber);
    } else if (direction === this.nextPageBtn) {
      this.updatePageNumber(++this.pageNumber);
      this.removeExtraCars(this.pageNumber);
    }
    this.replaceCars(this.pageNumber);
  }

  removeExtraCars(page: number): void {
    api.getCars(page).then((respone) => {
      const { items } = respone;
      if (items.length < PAGE_LENGTH) {
        for (let i = items.length; i < PAGE_LENGTH; i++) {
          this.carsArray[i].element.remove();
        }
      }
    });
  }

  addMissingCars(page: number): void {
    let thisPage = page;
    api.getCars(++thisPage).then((respone) => {
      const { items } = respone;
      if (items.length < PAGE_LENGTH) {
        for (let i = 0; i < PAGE_LENGTH; i++) {
          this.carsList.element.appendChild(this.carsArray[i].element);
        }
      }
    });
  }

  replaceCars(page: number): void {
    api.getCars(page).then((response) => {
      const { items } = response;
      for (let i = 0; i < items.length; i++) {
        this.carsArray[i].id = items[i].id;
        const carImage = this.carsArray[i].element.querySelector('svg');
        if (carImage) carImage.style.fill = items[i].color;
        this.carsArray[i].name.element.textContent = items[i].name;
      }
    });
  }

  updatePaginationButtons(): void {
    this.prevPageBtn.element.disabled = this.pageNumber === 1;
    api.getCars(this.pageNumber + 1).then((response) => {
      const { items } = response;
      this.nextPageBtn.element.disabled = items.length === 0;
    });
  }

  async addCars(quantity: number, getBody: () => ICarProps): Promise<void> {
    const newCars = [];
    for (let i = 0; i < quantity; i++) {
      newCars.push(api.createCar(getBody()));
    }
    await Promise.all(newCars);
    this.renderCars();
    this.updatePaginationButtons();
    this.updatePageName();
    this.garageControl.createCar.clearInputs();
  }

  async startRace(): Promise<void> {
    this.garageControl.controlButtons.race.element.disabled = true;
    this.garageControl.controlButtons.reset.element.disabled = true;
    const promiseArray: Promise<IWinnerData>[] = [];
    this.carsArray.forEach((car) => {
      promiseArray.push(car.drive());
    });
    await Promise.any(promiseArray).then((winner: IWinnerData) => {
      this.winner = winner;
      this.updateWinners();
      this.showWinMessage(winner);
    }).catch(Error);
    this.garageControl.controlButtons.reset.element.disabled = false;
  }

  updateWinners(): void {
    api.getWinner(this.winner.id).then((result) => {
      if (Object.keys(result).length === 0) {
        api.createWinner({ id: this.winner.id, wins: 1, time: this.winner.time });
      } else {
        const wins = ++result.wins;
        if (result.time < this.winner.time) api.updateWinner(this.winner.id, { wins, time: result.time });
        else api.updateWinner(this.winner.id, { wins, time: this.winner.time });
      }
    });
  }

  async resetRace(): Promise<void> {
    this.garageControl.controlButtons.reset.element.disabled = true;
    this.winMessage.element.classList.add('visually-hidden');
    const promiseArray: Promise<void>[] = [];
    this.carsArray.forEach((car) => {
      promiseArray.push(car.stop());
    });
    await Promise.all(promiseArray);
    this.garageControl.controlButtons.race.element.disabled = false;
  }

  showWinMessage(winner: IWinnerData): void {
    this.winMessage.element.classList.remove('visually-hidden');
    this.winMessage.element.innerHTML = `${winner.name}<br>won first<br>(${winner.time}s)`;
  }
}
