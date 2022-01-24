import { SortTypes, LocalStorageItems } from './consts';
import { ICard } from './interfaces';
import { LocalStorage } from './localStorage';
import { Renderer } from './render';

export class Sort {
  public sortCards(data: ICard[]): ICard[] {
    this.sortByAlphabet(data);
    this.sortByYear(data);
    this.sortByCount(data);
    return data;
  }

  private sortByAlphabet(data: ICard[]): void {
    const sortByAlphabet = JSON.parse(
      localStorage.getItem(LocalStorageItems.SORT_BY_ALPHABET)
    );
    const sortType = localStorage.getItem(LocalStorageItems.SORT_TYPE);

    if (!sortByAlphabet) {
      return;
    }

    data.sort((cardA: ICard, cardB: ICard) => {
      if (sortType === LocalStorageItems.ASC) {
        return cardA.name > cardB.name ? 1 : -1;
      }

      if (sortType === LocalStorageItems.DESC) {
        return cardA.name > cardB.name ? -1 : 1;
      }
    });
  }

  private sortByYear(data: ICard[]): void {
    const sortByYear = JSON.parse(
      localStorage.getItem(LocalStorageItems.SORT_BY_YEAR)
    );
    const sortType = localStorage.getItem(LocalStorageItems.SORT_TYPE);

    if (!sortByYear) {
      return;
    }

    data.sort((cardA: ICard, cardB: ICard) => {
      if (sortType === LocalStorageItems.ASC) {
        return +cardA.year - +cardB.year;
      }

      if (sortType === LocalStorageItems.DESC) {
        return +cardB.year - +cardA.year;
      }
    });
  }

  private sortByCount(data: ICard[]): void {
    const sortByCount = JSON.parse(
      localStorage.getItem(LocalStorageItems.SORT_BY_COUNT)
    );
    const sortType = localStorage.getItem(LocalStorageItems.SORT_TYPE);

    if (!sortByCount) {
      return;
    }

    data.sort((cardA: ICard, cardB: ICard) => {
      if (sortType === LocalStorageItems.ASC) {
        return +cardA.count - +cardB.count;
      }

      if (sortType === LocalStorageItems.DESC) {
        return +cardB.count - +cardA.count;
      }
    });
  }
}

export class SortListener {
  private localStorage: LocalStorage = new LocalStorage();

  constructor(private renderer: Renderer) {}

  public createSortSelectListener(): void {
    const select: HTMLSelectElement = document.querySelector('.filter__select-elem');

    select.addEventListener('change', () => {
      switch (select.value) {
        case SortTypes.NAME_UP:
          this.localStorage.setItem(LocalStorageItems.SORT_TYPE, LocalStorageItems.ASC);
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_COUNT, 'false');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'false');
          break;

        case SortTypes.NAME_DOWN:
          this.localStorage.setItem(LocalStorageItems.SORT_TYPE, LocalStorageItems.DESC);
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_COUNT, 'false');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'false');
          break;

        case SortTypes.YEAR_UP:
          this.localStorage.setItem(LocalStorageItems.SORT_TYPE, LocalStorageItems.ASC);
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_COUNT, 'false');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'false');
          break;

        case SortTypes.YEAR_DOWN:
          this.localStorage.setItem(LocalStorageItems.SORT_TYPE, LocalStorageItems.DESC);
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_COUNT, 'false');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'false');
          break;

        case SortTypes.COUNT_UP:
          this.localStorage.setItem(LocalStorageItems.SORT_TYPE, LocalStorageItems.ASC);
          this.localStorage.setItem(LocalStorageItems.SORT_BY_COUNT, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'false');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'false');
          break;
        
        case SortTypes.COUNT_DOWN:
          this.localStorage.setItem(LocalStorageItems.SORT_TYPE, LocalStorageItems.DESC);
          this.localStorage.setItem(LocalStorageItems.SORT_BY_COUNT, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'false');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'false');
          break;
        
        default:
          return;
      }

      this.renderer.renderCardsToDom();
    });
  }
}
