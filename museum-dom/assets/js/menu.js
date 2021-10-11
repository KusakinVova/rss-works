export function menu(classMenu, classButton, classBlockHide) {
  const button = document.querySelector(classButton);
  const menu = document.querySelector(classMenu);
  const hide = document.querySelector(classBlockHide);

  button.addEventListener('click', mobileMenu);

  function mobileMenu() {
    button.classList.toggle('active');
    menu.classList.toggle('active');
    hide.classList.toggle('hide');
  }
}
