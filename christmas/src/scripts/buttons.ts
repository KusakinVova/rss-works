import { LocalStorageItems } from './consts';
import { LocalStorage } from './localStorage';
import { TreeToys } from './treeToys';
import { TreePageListeners } from './tree';

export class NavigationButtonListeners {
  private localStorage:LocalStorage = new LocalStorage();
  private treePageListeners: TreePageListeners = new TreePageListeners();
  private treeToys: TreeToys = new TreeToys();
  private logoBtn: HTMLElement = document.querySelector('.menu__btngotohome');
  private toysPageBtn: HTMLElement = document.querySelector('.menu__btngototoys');
  private treePageBtn: HTMLElement = document.querySelector('.menu__btngototree');
  private startBtn: HTMLElement = document.querySelector('.main-page__btn');
  private pages: NodeListOf<HTMLElement> = document.querySelectorAll('.pages');
  private firstPage: HTMLElement = document.querySelector('.main-page');
  private toysPage: HTMLElement = document.querySelector('.toys-page');
  private treePage: HTMLElement = document.querySelector('.tree-page');

  public createNavigateListeners(): void {
    this.treePageListeners.createTreePageListeners();
    this.logoBtn.addEventListener('click', this.handleLogoClick.bind(this));
    this.toysPageBtn.addEventListener('click', this.handleToysBtnClick.bind(this));
    this.treePageBtn.addEventListener('click', this.handleTreeBtnClick.bind(this));
    this.startBtn.addEventListener('click',this.handleStartBtnClick.bind(this));
  }

  private handleLogoClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });
    this.firstPage.classList.remove('hide');
  }

  private handleToysBtnClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });
    this.toysPage.classList.remove('hide');
    this.deleteAbsolutePositionedToys();
  }

  private handleStartBtnClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });
    this.toysPage.classList.remove('hide');
  }

  private handleTreeBtnClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });
    this.treePage.classList.remove('hide');
    this.treePageListeners.mainTree.src = this.localStorage.getItem(LocalStorageItems.TREE);
    this.treePageListeners.mainTreeBg.style.backgroundImage = this.localStorage.getItem(LocalStorageItems.TREE_BG);
    const isSnow = JSON.parse(this.localStorage.getItem(LocalStorageItems.SNOW));
    const isMusic = JSON.parse(this.localStorage.getItem(LocalStorageItems.MUSIC));
    if (isSnow) {
      this.treePageListeners.interval = setInterval(this.treePageListeners.createSnowFlake.bind(this.treePageListeners), 50);
      this.treePageListeners.snowBtn.classList.add('active');
    }
    if (isMusic) {
      this.treePageListeners.audio.src = './assets/audio/audio.mp3';
      this.treePageListeners.audio.play();
      this.treePageListeners.volumeBtn.classList.add('active');
    }
    this.treeToys.fillInTreeToysSlots();
  }

  private deleteAbsolutePositionedToys() {
    Array.from(document.body.children).forEach((child) => {
      if (child.tagName === 'IMG') {
        child.remove();
      }
    });
  }
}
