import './menu.scss';

import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';

export class Menu extends BaseComponent {
  private togoGarage: Button = new Button(this.element, ['button', 'menu__button'], 'to garage', false);

  private togoWinners: Button = new Button(this.element, ['button', 'menu__button'], 'to winners', false);

  constructor(node: HTMLElement) {
    super(node, 'div', ['menu']);
    this.togoGarage.changeHashOnclick('/garage');
    this.togoWinners.changeHashOnclick('/winners');
  }
}
