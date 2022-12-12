import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { cardTemplates, largeImageTemplates } from "./templates";
import { fetchCard } from "./fetch";

const refs = {
  formEl : document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form input'),
  btnEl: document.querySelector('.search-form button'),
  galleryEl: document.querySelector('.gallery'),
}

refs.formEl.addEventListener('submit', onFormElSubmit);
refs.inputEl.addEventListener('input', onInputElInput);

function onFormElSubmit(e) {
  e.preventDefault();
  onInputElInput();
  
};

function onInputElInput(e) {
let inputValue = e.currentTarget.value;
 console.log(inputValue);
}



//   // підключаємо бібліотеку SimpleLightbox
//  const lightbox = new SimpleLightbox(".gallery a", {
//   captions: true,
//     captionsData: "alt",
//     captionsDelay: 250,
//   })



// Notify.success('Sol lucet omnibus');

// Notify.failure('Qui timide rogat docet negare');

// Notify.warning('Memento te hominem esse');

// Notify.info('Cogito ergo sum');