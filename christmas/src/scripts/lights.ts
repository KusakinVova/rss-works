export class Lights {
  public createLights(): void {
    const lightsContainer = document.querySelector('.lights');
    lightsContainer.innerHTML = '';
    for (let i = 1; i <= 7; i++) {
      const chain = document.createElement('ul');
      chain.className = 'chain';
      lightsContainer.append(chain);
      while (chain.children.length < (i * 5)) {
        const light = document.createElement('li');
        light.className = 'light color';
        chain.append(light);
      }
    }
  }
}
