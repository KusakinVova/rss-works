export function popup(className) {

  console.log("+10 = дизайн, оформление");

  let popup__under = document.createElement('div');
  popup__under.classList.add(className.substr(1) + '__under');

  let popup__close = document.querySelector(className + '__close');
  let popup__open = document.querySelector(className + '__open');
  let popup = document.querySelector(className);

  popup__under.addEventListener('click', function () {
    popupClose(popup);
    popup__under.parentNode.removeChild(popup__under);
  });

  popup__close.addEventListener('click', function () {
    popupClose(popup);
    popup__under.parentNode.removeChild(popup__under);
  });

  popup__open.addEventListener('click', function () {
    popup.parentNode.insertBefore(popup__under, popup.nextSibling)
    popupOpen(popup);
  });

  function popupClose(el) {
    fadeOut(el, 0.1);
  }

  function popupOpen(el) {
    fadeIn(el, 0.1);
  }


  function fadeOut(el, speed) {
    let step = 5 / speed;
    const el_width = -parseInt(getCssProperty(className, 'width'));
    let interval = setInterval(function() {
        let left_val = parseInt(getCssProperty(className, 'left'));
        if (left_val < el_width){
            clearInterval(interval);
        }
        left_val = left_val - step;
        el.style.left = left_val + 'px';
    }, speed / 10);
  }

  function fadeIn(el, speed) {
    let step = 5 / speed;
    const clientWidth = document.documentElement.clientWidth;
    const el_width = parseInt(getCssProperty(className, 'width'));
    const el_left_max = parseInt(clientWidth/2 - el_width/2);
    let interval = setInterval(function() {
        let left_val = parseInt(getCssProperty(className, 'left'));
        if (left_val >= el_left_max){
          clearInterval(interval);
        }
        left_val = left_val + step;
        if(left_val > el_left_max) left_val = el_left_max;
        el.style.left = left_val + 'px';
    }, speed / 10);
  }

  function getCssProperty(element, property){
    let elem = document.querySelector(element);
    return window.getComputedStyle(elem,null).getPropertyValue(property);
  }

}
