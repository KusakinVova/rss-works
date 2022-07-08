import './input.scss';
import { BaseComponent } from '../baseComponent';

export class Input extends BaseComponent<HTMLInputElement> {
  constructor(node: HTMLElement, styles: string[], type: string) {
    super(node, 'input', styles);
    this.element.type = type;
  }
}
