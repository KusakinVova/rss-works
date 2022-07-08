import './header.scss';
import { BaseComponent } from '../baseComponent';
import { Menu } from '../menu/menu';

export class Header extends BaseComponent {
  private title = new BaseComponent(this.element, 'h1', ['header-title', 'text-center']);

  private menu: Menu = new Menu(this.element);

  constructor(node: HTMLElement) {
    super(node, 'header', ['header-cont']);
    this.title.element.textContent = 'Async race';
  }
}
