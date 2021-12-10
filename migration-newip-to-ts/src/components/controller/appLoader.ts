import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'e6b5df2b8a6d4c8db96b5b1a54d48747', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
