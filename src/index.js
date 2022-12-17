import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import cardTemplates from './templates';
import cardFetchAxios from './fetch';

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form input'),
  btnLoadMoreEl: document.querySelector('.load-more'),
  galleryEl: document.querySelector('.gallery'),
  infoTextEl: document.querySelector('.info-text')
};

let pageNumber = 1;
let inputValue = '';
let totalHits = 0;
let inputSpace = '';

refs.formEl.addEventListener('submit', onFormElSubmit);
// refs.btnLoadMoreEl.addEventListener('click', onBtnLoadMoreElClick);

refs.formEl.addEventListener('keydown', e => {
  inputSpace = e.code;
});

async function onFormElSubmit(e) {
  e.preventDefault();
  inputValue = e.currentTarget.searchQuery.value;
  // У разі пошуку за новим ключовим словом, значення page повернути до початкового
  pageNumber = 1;
  refs.galleryEl.innerHTML = '';

  if (inputValue === '' || inputSpace === 'Space') {
    return;
  }

  const results = await cardFetchAxios(inputValue, pageNumber);
  totalHits = results.totalHits;
  if (results.totalHits < 40) {
    refs.btnLoadMoreEl.classList.add('is-hidden');
    refs.infoTextEl.classList.remove('is-hidden');
  } else {
    refs.btnLoadMoreEl.classList.remove('is-hidden');
     refs.infoTextEl.classList.add('is-hidden');
  };

  try {
    cardCreate(results.hits);

    if (totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (totalHits >= 1) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      loadingLazy();
    }
    pageNumber += 1;
  } catch (error) {
    console.log(error);
  }
}

// async function onBtnLoadMoreElClick(e) {
//  const results = await cardFetchAxios(inputValue, pageNumber);
// if (results.totalHits < 40) {
//     refs.btnLoadMoreEl.classList.add('is-hidden');
//   } else {
//     refs.btnLoadMoreEl.classList.remove('is-hidden');
//   };
//   try {
//     cardCreate(results.hits);
//     pageNumber += 1;
//   } catch (error) {
//     console.log(error);
//   }
// }

window.addEventListener('scroll', onWindowScrol);

async function onWindowScrol() {
  const documentRect = document.documentElement.getBoundingClientRect();
  if ( documentRect.bottom < document.documentElement.clientHeight + 300){
   
     refs.btnLoadMoreEl.classList.add('is-hidden');
    const results = await cardFetchAxios(inputValue, pageNumber);
    cardCreate(results.hits);
    pageNumber += 1;
if (results.totalHits < 40) {
    refs.infoTextEl.classList.remove('is-hidden');
  } else {
     refs.infoTextEl.classList.add('is-hidden');
  };
  };
}

function cardCreate(imgs) {
  const markup = imgs.map(img => cardTemplates(img)).join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);

  // підключаємо бібліотеку SimpleLightbox
  const lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsDelay: 250,
  });

  lightbox.refresh();
}

function loadingLazy() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  // Метод getBoundingClientRect()повертає розмір елемента та його положення відносно вікна перегляду
  window.scrollBy({
    top: cardHeight * -1,
    behavior: 'smooth',
    // прокручування анімується плавно
  });
}

