import { LocalStorageItems, Filters } from './consts';
import { LocalStorage } from './localStorage';
import { ICard, IFiltersByRange, IFiltersByValue } from './interfaces';
import { Modal } from './modal';
import { Renderer } from './render';

export class FilterByRange {
  private localStorage: LocalStorage = new LocalStorage();

  private filters: [string, string] = ['count', 'year'];

  constructor(private data: ICard[]) {}

  public filter(): void {
    const filtersSettings: IFiltersByRange = JSON.parse(
      this.localStorage.getItem(LocalStorageItems.FILTERS_BY_RANGE)
    );

    this.data
      .filter((card: ICard) => card.isShow)
      .forEach((card: ICard) => {
        card.isShow = this.filters.every((filter: string) => this.filterByField(filter, filtersSettings, card));
      });
  }

  private filterByField(
    filter: string,
    filtersSettings: IFiltersByRange,
    card: ICard
  ): boolean {
    switch (filter) {
      case 'count':
        return (
          +card.count >= filtersSettings[filter].min
          && +card.count <= filtersSettings[filter].max
        );
      case 'year':
        return (
          +card.year >= filtersSettings[filter].min
          && +card.year <= filtersSettings[filter].max
        );
      default:
        return true;
    }
  }
}

export class FilterByValue {
  private localStorage: LocalStorage = new LocalStorage();

  private filters: Filters[] = [Filters.COLOR, Filters.SHAPE, Filters.FAVORITE, Filters.SIZE];

  constructor(private data: ICard[]) {}

  public filter(): void {
    const filtersSettings: IFiltersByValue = JSON.parse(
      this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
    );
    this.data.forEach((card: ICard) => {
      card.isShow = this.filters.every((filter: Filters) => this.filterByField(filter, filtersSettings, card));
    });
  }

  private filterByField(
    filter: Filters,
    filtersSettings: IFiltersByValue,
    card: ICard
  ): boolean {
    switch (filter) {
      case Filters.SHAPE:
        return filtersSettings[filter].length
          ? filtersSettings[filter].includes(card.shape)
          : true;
      case Filters.COLOR:
        return filtersSettings[filter].length
          ? filtersSettings[filter].includes(card.color)
          : true;
      case Filters.SIZE:
        return filtersSettings[filter].length
          ? filtersSettings[filter].includes(card.size)
          : true;
      case Filters.FAVORITE:
        return filtersSettings[filter]
          ? filtersSettings[filter] === card.favorite
          : true;
      default:
        return true;
    }
  }
}

export class FilterBySearch {
  constructor(private data: ICard[]) {}

  public filter(value: string): void {
    this.data
      .filter((card: ICard) => card.isShow)
      .forEach((card: ICard) => {
        card.isShow = card.name.toLowerCase().includes(value.toLowerCase());
      });
  }
}

export class FilterListener {
  private localStorage: LocalStorage;

  constructor(private renderer: Renderer) {
    this.localStorage = new LocalStorage();
  }

  public createFiltersListener(): void {
    const shapeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.filter__shape button');
    const sizeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.filter__size button');
    const colorControls: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filter__color button');
    const favoriteControl: HTMLInputElement = document.querySelector('.filter__favorite input');

    shapeControls.forEach((item): void => {
      item.addEventListener('click', (): void => {
        const filters = JSON.parse(
          this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
        );
        const filterValue = item.getAttribute('data-shape');

        item.classList.toggle('active');
        if (filters.shape.includes(filterValue)) {
          filters.shape.splice(filters.shape.indexOf(filterValue), 1);
        } else {
          filters.shape.push(filterValue);
        }

        this.localStorage.setItem(
          LocalStorageItems.FILTERS_BY_VALUE,
          JSON.stringify(filters)
        );

        this.renderer.renderCardsToDom();
        if (!document.querySelector('.toys-block__cards').children.length) {
          new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
        }
      });
    });
    
    sizeControls.forEach((item): void => {
      item.addEventListener('click', (): void => {
        const filters = JSON.parse(
          this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
        );
        const filterValue = item.getAttribute('data-size');
        item.classList.toggle('active');
        if (filters.size.includes(filterValue)) {
          filters.size.splice(filters.size.indexOf(filterValue), 1);
        } else {
          filters.size.push(filterValue);
        }

        this.localStorage.setItem(
          LocalStorageItems.FILTERS_BY_VALUE,
          JSON.stringify(filters)
        );
        this.renderer.renderCardsToDom();
        if (!document.querySelector('.toys-block__cards').children.length) {
          new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
        }
      });
    });

    colorControls.forEach((item): void => {
      item.addEventListener('click', (): void => {
        const filters = JSON.parse(
          this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
        );
        const filterValue = item.getAttribute('data-color');
        item.classList.toggle('active');
        if (filters.color.includes(filterValue)) {
          filters.color.splice(filters.color.indexOf(filterValue), 1);
        } else {
          filters.color.push(filterValue);
        }

        this.localStorage.setItem(
          LocalStorageItems.FILTERS_BY_VALUE,
          JSON.stringify(filters)
        );
        this.renderer.renderCardsToDom();
        if (!document.querySelector('.toys-block__cards').children.length) {
          new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
        }
      });
    });

    favoriteControl.addEventListener('input', (): void => {
      const filters = JSON.parse(
        this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
      );
      if (favoriteControl.checked) {
        (filters.favorite = true);
      } else {
        (filters.favorite = false);
      }

      this.localStorage.setItem(
        LocalStorageItems.FILTERS_BY_VALUE,
        JSON.stringify(filters)
      );
      this.renderer.renderCardsToDom();
      if (!document.querySelector('.toys-block__cards').children.length) {
        new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
      }
    });
    
  }
}
