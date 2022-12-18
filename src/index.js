import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import cardTemplates from './templates';
import cardFetchAxios from './fetch';
import easyScroll from 'easy-scroll';

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form input'),
  btnLoadMoreEl: document.querySelector('.load-more'),
  galleryEl: document.querySelector('.gallery'),
  infoTextEl: document.querySelector('.info-text'),
  goHomeBtnEl: document.querySelector('.go-home'),
  scrollEl: document.querySelector('.scroll'),
};

let pageNumber = 1;
let inputValue = '';
let totalHits = 0;
let inputSpace = '';

refs.formEl.addEventListener('submit', onFormElSubmit);

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
  }

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

function backToTop() {
  let button = $('.back-to-home');
  $(window).on('scroll', () => {
    if ($(this).scrollTop() >= 50) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });
  button.on('click', e => {
    e.preventDefault();
    $('html').animate({ scrollTop: 0 }, 1000);
  });
}
backToTop();

easyScroll({
  scrollableDomEle: window,
  direction: 'bottom',
  duration: 2000,
  easingPreset: 'easeInQuad',
  scrollAmount: 1000,
});

const options = {
  rootMargin: '100px',
  threshold: 0.5,
};

function onWindowScrole(entries) {
  entries.forEach(async entry => {
    // анимируем, если элемент целиком попадает в отслеживаемую область
    if (
      entry.isIntersecting &&
      entry.intersectionRatio == 1
      // entry.isIntersecting &&
      // pixabayAPIService.query !== '' &&
      // pixabayAPIService.lengthArrayPhotos >= pixabayAPIService.perPage
    ) {
      refs.btnLoadMoreEl.classList.add('is-hidden');
      try {
        cardCreate(results.hits);
        pageNumber += 1;
      } catch (error) {
        console.log(error);
      }
      let remainder = results.totalHits - 40 * (pageNumber - 2);
      if (remainder < 40) {
        refs.infoTextEl.classList.remove('is-hidden');
      } else {
        refs.infoTextEl.classList.add('is-hidden');
      }
    }
  });
}

const observer = new IntersectionObserver(onWindowScrole, options);
observer.observe(refs.scrollEl);
// boxes.forEach((window) => {
//   observer.observe(window);
// });


// ===>
// window.addEventListener('scroll', onWindowScrol);
// function onWindowScrol(e) {
//   if (window.scrollY + window.innerHeight + 100 >= document.documentElement.scrollHeight) {

//     refs.btnLoadMoreEl.classList.add('is-hidden');
//   //  let isLoading = true;
//     cardFetchAxios(inputValue, pageNumber)
//       .then(results => {
//         cardCreate(results.hits);
//         pageNumber += 1;
//         let remainder = results.totalHits - 40 * (pageNumber - 2);
//         if (remainder < 40) {
//           refs.infoTextEl.classList.remove('is-hidden');
//           // isLoading = false;
//           // e.preventDefault()
//         } else {
//           refs.infoTextEl.classList.add('is-hidden');
//         };

//       })
//       .catch(error => console.log(error))

//   }
// };
