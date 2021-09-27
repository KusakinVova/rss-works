export function galleryMix() {
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

  setTimeout(getGalleryCoordinats, 1000);

}
