export class BaseComponent<T extends HTMLElement = HTMLElement> {
  readonly element: T;

  constructor(node: HTMLElement, tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = <T>document.createElement(tag);
    this.element.classList.add(...styles);
    node.appendChild(this.element);
  }
}
