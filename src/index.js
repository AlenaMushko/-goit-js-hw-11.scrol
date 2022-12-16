import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import cardTemplates from './templates';
// import cardFetch from './fetch';
import cardFetchAxios from "./fetch";

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form input'),
  btnLoadMoreEl: document.querySelector('.load-more'),
  galleryEl: document.querySelector('.gallery'),
};

let pageNumber = 1;
let inputValue = '';
let totalHits = 0;
let inputSpace = '';

refs.formEl.addEventListener('submit', onFormElSubmit);
// refs.btnLoadMoreEl.addEventListener('click', onBtnLoadMoreElClick);
// // window.addEventListener('scroll', onWindowScrol);
refs.formEl.addEventListener('keydown', (e) => {
  inputSpace = e.code;
});

function onFormElSubmit(e) {
  e.preventDefault();
  inputValue = e.currentTarget.elements.searchQuery.value;
  // У разі пошуку за новим ключовим словом, значення page повернути до початкового
  pageNumber = 1;
  refs.galleryEl.innerHTML = '';

  if (inputValue === '' || inputSpace === "Space") {
    return;
  };

   cardFetchAxios(inputValue, pageNumber)
    .then(results => {
      console.log(results);
      cardCreate(results);
    if (Number(totalHits) === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    };
    if (Number(totalHits) >= 1) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      refs.btnLoadMoreEl.classList.remove('is-hidden');
      loadingLazy();
    }; })
    .then((pageNumber += 1))
    .catch(error => console.log(error));
}

function onBtnLoadMoreElClick(e) {
  cardFetchAxios(inputValue, pageNumber)
    .then(results => {
      cardCreate(results);  
      if (Number(totalHits) <= 1) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      refs.btnLoadMoreEl.classList.add('is-hidden');
    };})
    .then((pageNumber += 1))
    .catch(error => console.log(error)); 
};

// function onWindowScrol() {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   if ( documentRect.bottom < document.documentElement.clientHeight +150){
//     cardFetchAxios(inputValue, pageNumber)
//     .then(results => {
//       cardCreate(results);  
//       if (Number(totalHits) <= 1) {
//       Notify.info(`We're sorry, but you've reached the end of search results.`);
//       refs.btnLoadMoreEl.classList.add('is-hidden');
//     };})
//     .then((pageNumber += 1))
//     .catch(error => console.log(error)); 
//   };
// }

function cardCreate(imgs) {
  const markup = imgs.map(img => cardTemplates(img)).join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
  
  // підключаємо бібліотеку SimpleLightbox
  const lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsDelay: 250,
  });

  lightbox.refresh(); 
};

function loadingLazy(){
 const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();
  // Метод getBoundingClientRect()повертає розмір елемента та його положення відносно вікна перегляду
window.scrollBy({
  top: cardHeight * -1,
  behavior: "smooth",
  // прокручування анімується плавно 
}); 
}
