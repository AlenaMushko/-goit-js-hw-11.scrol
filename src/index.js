// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import  cardTemplates  from "./templates";
import  cardFetch  from "./fetch";
// import { cardFetchAxios } from "./fetch";

const refs = {
  formEl : document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form input'),
  btnLoadMoreEl: document.querySelector('.load-more'),
  galleryEl: document.querySelector('.gallery'),
}

let pageNumber = 1;
let inputValue = '';
let totalHits = 0;
  // підключаємо бібліотеку SimpleLightbox
  // const lightbox = new SimpleLightbox(".photo-card a", {
  //   captions: true,
  //     captionsData: "alt",
  //     captionsDelay: 250,
  //   })

refs.formEl.addEventListener('submit', onFormElSubmit);
refs.btnLoadMoreEl.addEventListener('click', onBtnLoadMoreElClick);

function onFormElSubmit(e) {
  e.preventDefault();
  inputValue = e.currentTarget.elements.searchQuery.value;
// У разі пошуку за новим ключовим словом, значення page повернути до початкового
  pageNumber = 1;

  if (inputValue === ''){
    return
  }

 cardFetch(inputValue, pageNumber)
     .then(results => cardCreate(results))
     .then(pageNumber += 1)
  .catch(error => console.log(error));


  // showCreateCard(inputValue, pageNumber);
  // console.log(inputValue);
  
  // totalHits = response.data.totalHits;


};


function onBtnLoadMoreElClick(e){
  
  showCreateCard(inputValue, pageNumber);
}


function showCreateCard(value, page) {
  cardFetch
    .then(cardCreate)
    .then(pageNumber += 1)
    .catch(error => {
      console.log(error);
      return error;
});
console.log(pageNumber);
}

function cardCreate(hits) {
  let imgs = Object.values(hits)[2];
  console.log(imgs);
  const markup = imgs.map(img =>  cardTemplates(img)).join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);

}
// Notify.failure("Sorry, there are no images matching your search query. Please try again.");
// Notify.success(`Hooray! We found ${totalHits images}.`);
// Notify.info('We're sorry, but you've reached the end of search results.');



