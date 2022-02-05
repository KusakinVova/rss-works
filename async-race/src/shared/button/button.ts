import { BaseComponent } from '../baseComponent';
import './button.scss';

export class Button extends BaseComponent<HTMLButtonElement> {
  constructor(node: HTMLElement, styles: string[] = [], text: string, disabled: boolean) {
    super(node, 'button', styles);
    this.element.textContent = text;
    this.element.disabled = disabled;
  }

  changeHashOnclick(hash: string): void {
    this.element.addEventListener('click', () => {
      window.location.hash = hash;
    });
  }
}
