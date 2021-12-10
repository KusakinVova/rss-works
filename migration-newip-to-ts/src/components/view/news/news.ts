import './news.css';
import { Article } from '../../controller/types';

class News {
  draw(data: Article | never[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

    news.forEach((item, idx) => {
      const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

      if (idx % 2) (<HTMLElement>newsClone.querySelector('.news__item')).classList.add('alt');

      (<HTMLElement>newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${
        item.urlToImage || 'img/news_placeholder.jpg'
      })`;
      (<HTMLElement>newsClone.querySelector('.news__meta-author')).textContent = item.author || item.source.name;
      (<HTMLElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      (<HTMLElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
      (<HTMLElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
      (<HTMLElement>newsClone.querySelector('.news__description-content')).textContent = item.description;
      (<HTMLElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    (<HTMLElement>document.querySelector('.news')).innerHTML = '';
    (<HTMLElement>document.querySelector('.news')).appendChild(fragment);
  }
}

export default News;
