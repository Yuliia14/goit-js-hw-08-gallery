import images from './gallery-items.js';

const listContainer = document.querySelector('.js-gallery');
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
    document.querySelector('.lightbox.js-lightbox').classList.add('is-open');
  
    const lightboxButtonEl = document.querySelector(".lightbox__button");

    const lightboxImageEl = document.querySelector(".lightbox__image");
    lightboxImageEl.src = evt.target.dataset.source;
    lightboxImageEl.alt = evt.target.alt;

    lightboxButtonEl.addEventListener('click', modalCloseEl)
  }
  stopDefAction(evt);
  console.log(evt.target.dataset.source);
}
function modalCloseEl() {
  document.querySelector(".lightbox.js-lightbox").classList.remove("is-open");
  lightboxImageEl.src = '';
}

function modalCloseBackdropEl() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('is-open');
}

function modalCloseEscEl(event) {
  if (event.currentTarget === event.target) {
    console.log('Кликнули именно в бекдроп!!!!');
    modalCloseEl();
  }
}
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    modalCloseBackdropEl();
  }
}

// function stopDefAction(evt) {
//   evt.preventDefault();
// }

// function onGalleryContainerClick(evt) {
//   if (evt.target.nodeName !== 'IMG') {
//     return;
//   } 
//   else {
//     const lightBoxContentEl = document.querySelector('.js-lightbox');
//     lightBoxContentEl.classlist('.is-open');
//   } 
//   stopDefAction(evt);
// }




// import images from './gallery-items.js';

// const listContainer = document.querySelector('.js-gallery');

// listContainer.insertAdjacentHTML('beforeend', imagesGalleryCreator());
// listContainer.addEventListener('click', onGalleryContainerClick);

// function imagesGalleryCreator() {
//     return images.map(({ preview, original, description }) => {
//     `<li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}"
//   >
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li>`;
//     })
//     .join('');
// }