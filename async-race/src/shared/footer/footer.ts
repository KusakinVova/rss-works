import './footer.scss';
import { BaseComponent } from '../baseComponent';
import logoRS from '../../assets/rs_school_js_w.svg';

export class Footer extends BaseComponent {
  private author = new BaseComponent(this.element, 'p', ['footer-item']);

  private year = new BaseComponent(this.element, 'p', ['footer-item']);

  private rsschool = new BaseComponent(this.element, 'p', ['footer-item']);

  constructor(node: HTMLElement) {
    super(node, 'footer', ['footer']);
    this.author.element.innerHTML = '<a class="footer-link" href="https://github.com/KusakinVova" target="_blank">Vladimir K.</a>';
    this.year.element.textContent = '2022';
    this.rsschool.element.innerHTML = `
      <a class='footer-link' href='https://rs.school/js/' target='_blank'>${logoRS}</a>
    `;
  }
}
