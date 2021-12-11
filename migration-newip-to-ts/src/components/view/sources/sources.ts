import './sources.css';
import { Source } from '../../controller/types';

class Sources {
  draw(data: Source | never[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');
    let arrAlphabet: string[] = [];

    data.forEach((item) => {
      arrAlphabet.push(item.name[0].toLowerCase());
      const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

      (<HTMLElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
      (<HTMLElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);
      (<HTMLElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-char', item.name[0].toLowerCase());

      fragment.append(sourceClone);
    });

    (<HTMLElement>document.querySelector('.sources.buttons')).append(fragment);

    arrAlphabet = [...new Set(arrAlphabet)];
    console.log(arrAlphabet);
    const fragAlp = <DocumentFragment>document.createDocumentFragment();
    arrAlphabet.forEach((char) => {
      const alphabetChar = <HTMLElement>document.createElement('li');
      alphabetChar.classList.add('alphabet__item');
      alphabetChar.setAttribute('data-alphabet-char', char);
      alphabetChar.textContent = char;
      fragAlp.append(alphabetChar);
    });
    (<HTMLElement>document.querySelector('.alphabet')).append(fragAlp);

    const listAlphabet = document.querySelectorAll('.alphabet__item');
    const listButtons = document.querySelectorAll('.source__item');
    listAlphabet.forEach((char) => {
      char.addEventListener('click', () => {
        const charLetter = char.getAttribute('data-alphabet-char');
        listButtons.forEach((button) => {
          if(button.getAttribute('data-source-char') !== charLetter) button.classList.add('source__item_hide');
          else button.classList.remove('source__item_hide');
        });
        
      });
    });
  }
}

export default Sources;
