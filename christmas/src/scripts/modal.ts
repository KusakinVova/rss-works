export class Modal {
  constructor(private text: string, private button: string) {}

  public createModal(): void {
    const modal = this.createElement('div', 'modal');
    const modalBody = this.createElement('div', 'modal__body');
    const modalText = this.createElement('p', 'modal__text');
    const modalButton = this.createElement('button', 'button modal__button');
    modalText.textContent = this.text;
    modalButton.textContent = this.button;
    modalButton.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => { modal.remove();}, 1000);
    });

    modal.append(modalBody);
    modalBody.append(modalText, modalButton);
    document.body.append(modal);

    setTimeout(() => {
      modal.classList.add('show');
    });
  }

  private createElement(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
  }
}
