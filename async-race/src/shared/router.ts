import { App } from '../app';

export const app = new App(document.body);

function router(location: string) {
  switch (location) {
    case '#/garage':
      app.togoGarage();
      break;
    case '#/winners':
      app.togoWinners();
      break;
    default:
      throw new Error(`there is no such route as ${location}!`);
  }
}

window.addEventListener('hashchange', () => {
  router(window.location.hash);
});
