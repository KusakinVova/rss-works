export function gallery() {
  const elemGalleryBlock = document.querySelector('.gallery__listinner');
  const arImgNumb = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  function mixing(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  mixing(arImgNumb);


  arImgNumb.map((e) => {
    let img = document.createElement('img');
    img.classList.add('gallery__item')
    img.src = `./assets/img/galery/galery${e}.jpg`;
    img.alt = `art galery ${e}`;
    elemGalleryBlock.append(img);
  })

  function getGalleryCoordinats() {
    const arImages = document.querySelectorAll('.gallery__item');
    const galleryPos = elemGalleryBlock.getBoundingClientRect()
    arImages.forEach((e) => {
      let elemRect = e.getBoundingClientRect()
      if (elemRect.y === galleryPos.y) {
        if (elemRect.right === galleryPos.right || elemRect.left === galleryPos.left) {
          e.classList.add('gallery__item_margintop')
        }
      }
    })
  }
  getGalleryCoordinats();
  setTimeout(getGalleryCoordinats, 3000);

  //---------------------------------
  const animItems = document.querySelectorAll(".gallery__item");

  if(animItems.length > 0 ){
    window.addEventListener('scroll', animScroll);
    function animScroll(argument) {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 10;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if( animItemHeight > window.innerHeight){
          animItemPoint = window.innerHeight - window.innerHeight / animStart
        }

        if( (scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight) ){
          animItem.classList.add('show');
        }
        else{
          animItem.classList.remove('show');
        }

      }
    }

    function offset(el){
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }
    animScroll();
  }

  //---------------------------------

}
