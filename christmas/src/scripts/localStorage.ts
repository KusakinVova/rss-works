import { IFiltersByRange, IFiltersByValue } from './interfaces';
import { LocalStorageItems } from './consts';

export class LocalStorage {
  public initLocalStorage(): void {
    const sortType = this.getItem(LocalStorageItems.SORT_TYPE);
    const sortByAlphabet = this.getItem(LocalStorageItems.SORT_BY_ALPHABET);
    const sortByYear = this.getItem(LocalStorageItems.SORT_BY_YEAR);
    const sortByCount = this.getItem(LocalStorageItems.SORT_BY_COUNT);
    const filtersByValue = this.getItem(LocalStorageItems.FILTERS_BY_VALUE);
    const filtersByRange = this.getItem(LocalStorageItems.FILTERS_BY_RANGE);
    const chosen = this.getItem(LocalStorageItems.CHOSEN);
    const music = this.getItem(LocalStorageItems.MUSIC);
    const snow = this.getItem(LocalStorageItems.SNOW);
    const tree = this.getItem(LocalStorageItems.TREE);
    const treebg = this.getItem(LocalStorageItems.TREE_BG);

    const defaultFiltersByValue: IFiltersByValue = {
      shape: [],
      color: [],
      size: [],
      favorite: false,
    };

    const defaultFiltersByRange: IFiltersByRange = {
      count: {
        min: 1,
        max: 12,
      },
      year: {
        min: 1940,
        max: 2020,
      },
    };

    const defaultTreeImgSrc = './assets/tree/1.png';
    const defaultTreeBgUrl = 'url("./assets/bg/1.jpg")';

    this.setItem(LocalStorageItems.CHOSEN, chosen || '[]');
    this.setItem(LocalStorageItems.SORT_TYPE, sortType || null);
    this.setItem(LocalStorageItems.SORT_BY_ALPHABET, sortByAlphabet || 'false');
    this.setItem(LocalStorageItems.SORT_BY_YEAR, sortByYear || 'false');
    this.setItem(LocalStorageItems.SORT_BY_COUNT, sortByCount || 'false');
    this.setItem(
      LocalStorageItems.FILTERS_BY_VALUE,
      filtersByValue || JSON.stringify(defaultFiltersByValue)
    );
    this.setItem(
      LocalStorageItems.FILTERS_BY_RANGE,
      filtersByRange || JSON.stringify(defaultFiltersByRange)
    );
    this.setItem(LocalStorageItems.MUSIC, music || 'false');
    this.setItem(LocalStorageItems.SNOW, snow || 'false');
    this.setItem(LocalStorageItems.TREE, tree || defaultTreeImgSrc);
    this.setItem(LocalStorageItems.TREE_BG, treebg || defaultTreeBgUrl);
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string {
    return localStorage.getItem(key);
  }
}
