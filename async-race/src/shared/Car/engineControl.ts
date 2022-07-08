import { BaseComponent } from '../baseComponent';
import { Button } from '../button/button';

export class EngineControl extends BaseComponent {
  start = new Button(this.element, ['button', 'button_line'], 'A', false);

  stop = new Button(this.element, ['button', 'button_line', 'button_disabled'], 'B', true);

  classDisabled = 'button_disabled';

  constructor(node: HTMLElement) {
    super(node, 'div', ['engine-control-buttons']);
  }

  toggleButton(button: Button): void {
    if (button.element.disabled) {
      button.element.disabled = false;
    } else {
      button.element.disabled = true;
    }
    button.element.classList.toggle(`${this.classDisabled}`);
  }
}
