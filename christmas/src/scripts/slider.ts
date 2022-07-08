import * as noUiSlider from 'nouislider';
import { target } from 'nouislider';
import { Renderer } from './render';
// import 'nouislider/dist/nouislider.css';
import { IFiltersByRange, ISliderOptions } from './interfaces';
import { LocalStorage } from './localStorage';

export class Slider {
  private localStorage: LocalStorage = new LocalStorage();

  private slider: target;

  private leftInput: HTMLElement;

  private rightInput: HTMLElement;

  constructor(
    private container: HTMLElement,
    private options: ISliderOptions,
    private localStorageItem: keyof IFiltersByRange,
    private renderer: Renderer
  ) {
    this.slider = this.container.querySelector('.slider') as target;
    this.leftInput = this.container.querySelector('.from ') as HTMLElement;
    this.rightInput = this.container.querySelector('.to') as HTMLElement;
  }

  public sliderInit(): void {
    noUiSlider.create(this.slider, this.options);

    (this.slider as any).noUiSlider.on('update', (values: string[]): void => {
      const [left, right] = values;

      this.leftInput.innerHTML = Number(left).toFixed();
      this.rightInput.innerHTML = Number(right).toFixed();

      const filters: IFiltersByRange = JSON.parse(
        this.localStorage.getItem('filtersByRange')
      );

      filters[this.localStorageItem] = {
        min: +Number(left).toFixed(),
        max: +Number(right).toFixed(),
      };

      this.localStorage.setItem('filtersByRange', JSON.stringify(filters));
      this.renderer.renderCardsToDom();
    });
  }

  public getLeftInputValue(): number {
    return Number(this.leftInput.innerHTML);
  }

  public getRightInputValue(): number {
    return Number(this.rightInput.innerHTML);
  }
}
