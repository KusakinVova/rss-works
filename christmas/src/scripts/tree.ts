import { LocalStorage } from './localStorage';
import { LocalStorageItems } from './consts';
import { Lights } from './lights';

export class TreePageListeners {
  private localStorage: LocalStorage = new LocalStorage();

  private lights: Lights = new Lights();

  private toggleLightsBtn: HTMLElement = document.querySelector('.lights__switch-button');
  private switherLightsBtn: HTMLElement = document.querySelector('.lights__swither');

  private colorLigtsBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.lights__color-button');

  public snowBtn = document.querySelector('.controls__snow');
  public volumeBtn = document.querySelector('.controls__music');
  private treesContainer: HTMLElement = document.querySelector('.tree__select-tree');
  private bgContainer: HTMLElement = document.querySelector('.tree__select-bg');
  public mainTree: HTMLImageElement = document.querySelector('.tree__picture img');
  public mainTreeBg: HTMLElement = document.querySelector('.tree__picture');
  public audio = new Audio();
  public snowContainer = document.querySelector('.snow');

  private resetSettingsBtn = document.querySelector('.tree-page__reset-settings');

  public interval: ReturnType<typeof setInterval>;

  public createTreePageListeners(): void {
    this.volumeBtn.addEventListener('click', this.handleVolumeBtnClick.bind(this));
    this.snowBtn.addEventListener('click', this.handleSnowBtnClick.bind(this));
    this.treesContainer.addEventListener('click', this.handleTreesContainerClick.bind(this));
    this.bgContainer.addEventListener('click', this.handleBgContainerClick.bind(this));
    this.toggleLightsBtn.addEventListener('click', this.handleToggleLightsBtn.bind(this));
    this.colorLigtsBtns.forEach((btn) => btn.addEventListener('click', this.handleColorLigtsBtns.bind(this)));
    this.resetSettingsBtn.addEventListener('click', this.handleResetSettingsBtnClick.bind(this));
  }

  private handleVolumeBtnClick(): void {
    const method = this.audio.paused ? 'play' : 'pause';
    this.audio.src = './assets/audio/audio.mp3';
    this.audio[method]();
    this.volumeBtn.classList.toggle('active');
    this.localStorage.setItem(LocalStorageItems.MUSIC, this.volumeBtn.classList.contains('active') ? 'true' : 'false');
  }

  private handleSnowBtnClick(): void {
    if (!this.snowBtn.classList.contains('active')) {
      this.snowBtn.classList.add('active');
      this.interval = setInterval(this.createSnowFlake.bind(this), 50);
    } else {
      clearInterval(this.interval);
      this.snowBtn.classList.remove('active');
    }

    this.localStorage.setItem(LocalStorageItems.SNOW, this.snowBtn.classList.contains('active') ? 'true' : 'false');
  }

  private handleTreesContainerClick(e: Event) {
    const target = <HTMLElement>e.target;
    if (target.hasAttribute('data-tree')) {
      this.mainTree.src = `./assets/tree/${target.dataset.tree}.png`;
      this.localStorage.setItem(LocalStorageItems.TREE, this.mainTree.src);
    }
  }

  private handleBgContainerClick(e: Event) {
    const target = <HTMLElement>e.target;
    if (target.hasAttribute('data-bg')) {
      this.mainTreeBg.style.backgroundImage = `url("./assets/bg/${target.dataset.bg}.jpg")`;
      this.localStorage.setItem(LocalStorageItems.TREE_BG, this.mainTreeBg.style.backgroundImage);
    }
  }

  private handleToggleLightsBtn(): void {
    this.toggleLightsBtn.classList.toggle('on');
    this.switherLightsBtn.classList.toggle('on');
    if (this.toggleLightsBtn.classList.contains('on')) {
      this.lights.createLights();
    } else {
      const lightItems = document.querySelectorAll('.light');
      lightItems.forEach((item) => item.className = 'light');
    }
  }

  private handleColorLigtsBtns(e: Event): void {
    if (!this.toggleLightsBtn.classList.contains('on')) {
      this.toggleLightsBtn.classList.toggle('on');
      this.switherLightsBtn.classList.toggle('on');
      this.lights.createLights();
    }
    const lightColor = (e.target as HTMLButtonElement).dataset.color;
    const lightItems = document.querySelectorAll('.light');
    lightItems.forEach((item) => item.className = `light ${lightColor}`);
  }

  public createSnowFlake(): void {
    const snowFlake = document.createElement('i');
    snowFlake.classList.add('snowflake');
    snowFlake.style.left = `${Math.random() * window.innerWidth}px`;
    snowFlake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowFlake.style.opacity = Math.random().toString();
    snowFlake.style.width = snowFlake.style.height = `${Math.random() * 10 + 10}px`;

    this.snowContainer.append(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }

  private handleResetSettingsBtnClick(): void {
    const defaultTreeImgSrc = './assets/tree/1.png';
    const defaultTreeBgUrl = 'url("./assets/bg/1.jpg")';
    this.localStorage.setItem(LocalStorageItems.MUSIC, 'false');
    this.localStorage.setItem(LocalStorageItems.SNOW, 'false');
    this.localStorage.setItem(LocalStorageItems.TREE, defaultTreeImgSrc);
    this.localStorage.setItem(LocalStorageItems.TREE_BG, defaultTreeBgUrl);
  }
}
