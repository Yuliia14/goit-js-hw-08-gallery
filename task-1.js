import images from './gallery-items.js';

const listContainer = document.querySelector('.js-gallery');
const lightboxButtonEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxImageEl = document.querySelector(".lightbox__image");
const backdropEl = document.querySelector('.lightbox__overlay');
const lightBoxEl = document.querySelector('.js-lightbox');

const cardImagesGallery = createImagesGallery(images);

listContainer.insertAdjacentHTML('beforeend', cardImagesGallery);
listContainer.addEventListener('click', onGalleryContainerClick);

function createImagesGallery() {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function stopDefAction(evt) {
  evt.preventDefault();
}

function onGalleryContainerClick(evt) {
  stopDefAction(evt);
  if (evt.target.nodeName !== 'IMG') {
    return;
  } else {
    lightBoxEl.classList.add('is-open');

    lightboxButtonEl.addEventListener('click', modalCloseEl)
    window.addEventListener('keydown', onKeyPress);
    backdropEl.addEventListener('click', modalCloseEl)

    lightboxImageEl.src = evt.target.dataset.source;
    lightboxImageEl.alt = evt.target.alt;
  }
}
function modalCloseEl() {
  lightBoxEl.classList.remove("is-open");
  lightboxImageEl.src = ' ';
}

const originalUrls = images.map(({ original }) => original);

function goToPreviousImage(array, url) {

  for (let i = 0; i < array.length; i++) {
    if (url === array[i] && i > 0) {
      console.log([i]);
      lightboxImageEl.src = array[i-1];
      console.log(lightboxImageEl.src);
    }
  }
}
function goToNextImage(array, url) {

  for (let i = 0; i < array.length; i++) {
    if (url === array[i] && i < array.length-1) {
      console.log([i]);
      lightboxImageEl.src = array[i+1];
      console.log(lightboxImageEl.src);}
  }
}

function onKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const LEFT_KEY_CODE = 'ArrowLeft';
  const RIGHT_KEY_CODE = 'ArrowRight';
  
  const isEscKey = evt.code === ESC_KEY_CODE;
  const isLeftKey = evt.code === LEFT_KEY_CODE;
  const isRightKey = evt.code === RIGHT_KEY_CODE;
  
  if (isEscKey) {
    modalCloseEl();
  } else if (isLeftKey) {
    goToPreviousImage(originalUrls, lightboxImageEl.src);
  } else if (isRightKey) {
    goToNextImage(originalUrls, lightboxImageEl.src);
  }
}