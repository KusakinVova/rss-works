import { LocalStorage } from './localStorage';
import { LocalStorageItems, SortTypes } from './consts';

export class Settings {
  localstorage: LocalStorage = new LocalStorage();

  public applySettings(): void {
    const valueFilters = JSON.parse(localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE));
    const sortType = this.localstorage.getItem(LocalStorageItems.SORT_TYPE);
    const sortAlphabet = this.localstorage.getItem(LocalStorageItems.SORT_BY_ALPHABET);
    const sortYear = this.localstorage.getItem(LocalStorageItems.SORT_BY_YEAR);
    const sortCount = this.localstorage.getItem(LocalStorageItems.SORT_BY_COUNT);

    if (sortType === 'asc' && sortAlphabet === 'true') {
      document.querySelector(`option[value=${SortTypes.NAME_UP}]`).setAttribute('selected', 'true');
    } else if (sortType === 'desc' && sortAlphabet === 'true') {
      document.querySelector(`option[value=${SortTypes.NAME_DOWN}]`).setAttribute('selected', 'true');
    } else if (sortType === 'asc' && sortYear === 'true') {
      document.querySelector(`option[value=${SortTypes.YEAR_UP}]`).setAttribute('selected', 'true');
    } else if (sortType === 'desc' && sortYear === 'true') {
      document.querySelector(`option[value=${SortTypes.YEAR_DOWN}]`).setAttribute('selected', 'true');
    } else if (sortType === 'asc' && sortCount === 'true') {
      document.querySelector(`option[value=${SortTypes.COUNT_UP}]`).setAttribute('selected', 'true');
    } else if (sortType === 'desc' && sortCount === 'true') {
      document.querySelector(`option[value=${SortTypes.COUNT_DOWN}]`).setAttribute('selected', 'true');
    } else {
      document.querySelectorAll('option').forEach((option) => {
        option.selected = false;
      });
    }

    const shapeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.shape-select button');
    const sizeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.filter__size-elem button');
    const colorControls: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color-select button');
    const favoriteControl: HTMLInputElement = document.querySelector('.filter__favorite input');

    shapeControls.forEach((btn): void => {
      const value = btn.getAttribute('data-shape');
      if (valueFilters.shape.includes(value)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    sizeControls.forEach((btn): void => {
      const value = btn.getAttribute('data-size');
      if (valueFilters.size.includes(value)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    colorControls.forEach((btn): void => {
      const value = btn.getAttribute('data-color');
      if (valueFilters.color.includes(value)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (valueFilters.favorite) {
      favoriteControl.setAttribute('checked', 'true');
    } else {
      favoriteControl.checked = false;
    }
  }
}
