import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { cardTemplates } from "./templates";
import { cardFetch} from "./fetch";

const refs = {
  formEl : document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form input'),
  btnLoadMoreEl: document.querySelector('.load-more'),
  galleryEl: document.querySelector('.gallery'),
}

let page = 1;
let inputValue = '';
let totalHits = 0;
  // підключаємо бібліотеку SimpleLightbox
  const lightbox = new SimpleLightbox(".photo-card a", {
    captions: true,
      captionsData: "alt",
      captionsDelay: 250,
    })

refs.formEl.addEventListener('submit', onFormElSubmit);
// refs.inputEl.addEventListener('input', onInputElInput);
// refs.btnLoadMoreEl.addEventListener('click', onBtnLoadMoreElClick);

function onFormElSubmit(e) {
  e.preventDefault();
  inputValue = refs.formEl.elements.searchQuery.value;
// У разі пошуку за новим ключовим словом, значення page повернути до початкового
  page = 1;

  if (inputValue === ''){
    return
  }

  cardFetch(inputValue, page).then(cardCreate)
  .catch(error => console.log(error));
  // totalHits = response.data.totalHits;


};

function onBtnLoadMoreElClick(e){
  page +=1;
  cardCreate();

}

function cardCreate(imgs){
  const markup = imgs.map(img =>  cardTemplates(img)).join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}




// Notify.failure("Sorry, there are no images matching your search query. Please try again.");
// Notify.success(`Hooray! We found ${totalHits images}.`);
// Notify.info('We're sorry, but you've reached the end of search results.');



