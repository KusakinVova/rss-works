import { ICard } from './interfaces';
import { Modal } from './modal';
import { LocalStorage } from './localStorage';
import { LocalStorageItems, TOYS_LIMIT } from './consts';

export class ToyCard {
  card: HTMLElement;
  private localStorage: LocalStorage = new LocalStorage();

  constructor(private toy: ICard, private data: ICard[]) {
    this.toy.isChosen = false;
  }

  public createCard(): HTMLElement {
    this.card = <HTMLElement>document.createElement('div');
    this.card.className = 'card';
    this.card.setAttribute('data-num', this.toy.num);
    this.card.innerHTML = `
    <h3 class="card-title card__name">${this.toy.name}</h3>
    <img src="./assets/toys/${this.toy.num}.png" alt="toy" class="card__image card-img">
    <div class="card-description card__info">
      <p class="card__num">Количество: ${this.toy.count}</p>
      <p class="card__year">Год покупки:  ${this.toy.year}</p>
      <p class="card__shape">Форма:  ${this.toy.shape}</p>
      <p class="card__color">Цвет:  ${this.toy.color}</p>
      <p class="card__size">Размер:  ${this.toy.size}</p>
      <p class="card__like">Любимая:  ${this.toy.favorite ? 'да' : 'нет'}</p>
    </div>
    `;

    const storageChosen = JSON.parse(this.localStorage.getItem(LocalStorageItems.CHOSEN));
    storageChosen.forEach((item: ICard) => {
      if (this.toy.num === item.num) {
        this.card.classList.add('choose');
        this.toy.isChosen = true;
      }
    });

    this.card.addEventListener('click', this.cardListener.bind(this));

    return this.card;
  }

  public destroy(): void {
    removeEventListener('click', this.cardListener);
  }

  private cardListener(): void {
    this.toy.isChosen = !this.toy.isChosen;

    if (this.data.filter((card: ICard) => card.isChosen).length <= TOYS_LIMIT) {
      this.toy.isChosen
        ? this.card.classList.add('choose')
        : this.card.classList.remove('choose');
    } else {
      new Modal('Нельзя выбрать больше 20ти игрушек', 'Понятно').createModal();
      this.toy.isChosen = false;
    }

    this.localStorage.setItem(LocalStorageItems.CHOSEN, JSON.stringify(this.data.filter((card: ICard) => card.isChosen)));
    this.showIsFavorite();
  }

  private showIsFavorite(): void {
    document.querySelector('.all_choose').textContent = JSON.parse(this.localStorage.getItem(LocalStorageItems.CHOSEN)).length;
  }
}
