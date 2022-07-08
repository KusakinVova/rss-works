import AppLoader from './appLoader';
import { ICallback, INews, ISources } from './interfaces';

class AppController extends AppLoader {
  getSources(callback: ICallback<ISources>) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: Event, callback: ICallback<INews>) {
    let target = <HTMLElement>e.target;
    const newsContainer = <HTMLElement>e.currentTarget;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = <string>target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = <HTMLElement>target.parentNode;
    }
  }
}

export default AppController;
