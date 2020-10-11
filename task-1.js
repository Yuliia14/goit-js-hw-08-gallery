import images from './gallery-items.js';

const listContainer = document.querySelector('.js-gallery');
const lightboxButtonEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxImageEl = document.querySelector(".lightbox__image");
const backdropEl = document.querySelector('.lightbox__overlay');

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
  if (evt.target.nodeName !== 'IMG') {
    return;
  } else {
    document.querySelector('.js-lightbox').classList.add('is-open');

    lightboxButtonEl.addEventListener('click', modalCloseEl)
    window.addEventListener('keydown', onKeyPress);
    backdropEl.addEventListener('click', onBackdropClick)

    lightboxImageEl.src = evt.target.dataset.source;
    lightboxImageEl.alt = evt.target.alt;
  }
  stopDefAction(evt);
}
function modalCloseEl() {
  document.querySelector(".js-lightbox").classList.remove("is-open");
  lightboxImageEl.src = ' ';
}

function onKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  
  const isEscKey = evt.code === ESC_KEY_CODE;
  
  if (isEscKey) {
    modalCloseEl();
  }
}

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    modalCloseEl();
  }
}