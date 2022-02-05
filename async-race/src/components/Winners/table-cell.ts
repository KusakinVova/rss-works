import { BaseComponent } from '../../shared/baseComponent';

export class TableRow extends BaseComponent<HTMLTableRowElement> {
  tdNumber = new BaseComponent(this.element, 'td', ['winners-table_cell']);

  tdCar = new BaseComponent(this.element, 'td', ['winners-table_cell']);

  tdName = new BaseComponent(this.element, 'td', ['winners-table_cell']);

  tdWins = new BaseComponent(this.element, 'td', ['winners-table_cell']);

  tdBestTime = new BaseComponent(this.element, 'td', ['winners-table_cell']);

  constructor(node: HTMLTableElement, tag: keyof HTMLElementTagNameMap = 'tr', styles = ['winners-table_line']) {
    super(node, tag, styles);
  }
}
