import { BaseComponent } from '../../shared/baseComponent';
import { TableRow } from './table-cell';
import carImage from '../../assets/car.svg';
import { IWinner } from '../../shared/models/modelWinner';
import { ICarModel } from '../../shared/models/modelCar';

export class WinnersTable extends BaseComponent<HTMLTableElement> {
  private tableHeader: TableRow = new TableRow(this.element, 'tr', ['winners-table_header']);

  tableRowsArray: TableRow[] = [];

  constructor(node: HTMLElement) {
    super(node, 'table', ['winners-table']);
    this.tableHeader.tdNumber.element.textContent = 'Number';
    this.tableHeader.tdCar.element.textContent = 'Car';
    this.tableHeader.tdName.element.textContent = 'Name';
    this.tableHeader.tdWins.element.textContent = 'Wins';
    this.tableHeader.tdBestTime.element.textContent = 'Best time';
  }

  addTableRow(winner: IWinner, car: ICarModel): void {
    const tableRow = new TableRow(this.element);
    tableRow.tdNumber.element.textContent = `${winner.id}`;
    tableRow.tdCar.element.innerHTML = carImage;
    const carImg = tableRow.tdCar.element.querySelector('svg');
    if (carImg) {
      carImg.style.width = '30';
      carImg.style.height = 'auto';
      carImg.style.fill = car.color;
    }
    tableRow.tdName.element.textContent = `${car.name}`;
    tableRow.tdWins.element.textContent = `${winner.wins}`;
    tableRow.tdBestTime.element.textContent = `${winner.time}`;
    if (this.tableRowsArray.length < 10) this.tableRowsArray.push(tableRow);
  }

  addTableHeader(): void {
    this.element.appendChild(this.tableHeader.element);
  }
}
