// import axios from 'axios';

// export function cardFetchAxios({inputValue, page}){
//   const API_KAY = '31999317-3d5c3cea8ef86e3c7a76bbcc7';
//   const URL = 'https://pixabay.com/api/';
//   const filter = `?key=${API_KAY}&p=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

//   axios.get(`${URL}${filter}`)
//   .then(response => {
//    response.data;
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // виконується завжди
//   });
// }

export function cardFetch({inputValue, page}) {
  const API_KAY = '31999317-3d5c3cea8ef86e3c7a76bbcc7';
  const URL = 'https://pixabay.com/api/'

  return fetch(`${URL}?key=${API_KAY}&p=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
  .then(response => {
  
    if (!response.ok) {
      throw new Error('Упс щось пішло не так');
    }
    return response.json();
  }); 
}
