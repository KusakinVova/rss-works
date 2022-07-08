import { ICard, IToy } from './interfaces';
import { LocalStorage } from './localStorage';
import { LocalStorageItems } from './consts';
import data from './data';

export class TreeToys {
  private localStorage: LocalStorage = new LocalStorage();
  private toysContainer = document.querySelector('.tree__toys-selected');

  public fillInTreeToysSlots(): void {
    const favorites = JSON.parse(
      this.localStorage.getItem(LocalStorageItems.CHOSEN)
    );
    this.toysContainer.innerHTML = '';
    if (favorites.length) {
      favorites.forEach(this.createToyBox.bind(this));
    } else {
      const defaultToys = data.slice(0, 20);
      defaultToys.forEach(this.createToyBox.bind(this));
    }
  }

  private createToyBox(toy: ICard | IToy): void {
    const toyBox = document.createElement('div');
    toyBox.className = 'tree-toy';
    toyBox.setAttribute('data-num', toy.num);
    const toyCount = document.createElement('span');
    toyCount.className = 'tree-toy__count';
    toyCount.textContent = toy.count;
    toyBox.append(toyCount);
    let i = 0;
    while (i < +toy.count) {
      const toyImage = document.createElement('img');
      toyImage.className = 'tree-toy__image';
      toyImage.draggable = true;
      toyImage.setAttribute('data-imgnum', toy.num);
      toyImage.src = `./assets/toys/${toy.num}.png`;
      toyImage.addEventListener('mousedown', this.toyImageListener);
      toyImage.ondragstart = () => false;
      toyBox.append(toyImage);
      i++;
    }
    this.toysContainer.append(toyBox);
  }

  private toyImageListener(e: MouseEvent): void {
    const image = e.target as HTMLImageElement;
    const shiftX = e.clientX - image.getBoundingClientRect().left;
    const shiftY = e.clientY - image.getBoundingClientRect().top;
    image.style.position = 'absolute';
    image.style.zIndex = '1000';
    document.body.append(image);
    let targetArea: Element;

    function moveAt(pageX: number, pageY: number) {
      image.style.left = `${pageX - shiftX}px`;
      image.style.top = `${pageY - shiftY}px`;
    }

    function onMouseMove(e: MouseEvent) {
      moveAt(e.pageX, e.pageY);
      image.hidden = true;
      targetArea = document.elementFromPoint(e.clientX, e.clientY);
      image.hidden = false;
    }

    function onMouseUp() {
      const home = document.querySelector(`.tree-toy[data-num = "${image.dataset.imgnum}"]`);
      const homeCoords = home.getBoundingClientRect();
      if (targetArea.tagName === 'AREA') {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      } else {
        image.style.left = `${homeCoords.left + 10}px`;
        image.style.top = `${homeCoords.top + 10}px`;
        home.append(image);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      const currentToyNum = home.querySelector('span');
      const imagesArrayLength: number = home.querySelectorAll('img').length;
      currentToyNum.textContent = `${imagesArrayLength}`;
    }
    moveAt(e.pageX, e.pageY);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
