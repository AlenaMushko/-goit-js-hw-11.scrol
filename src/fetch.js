import axios from 'axios';

export default async function cardFetchAxios(inputValue, page){
  const API_KAY = '31999317-3d5c3cea8ef86e3c7a76bbcc7';
  const URL = 'https://pixabay.com/api/';
  const filter = `?key=${API_KAY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios.get(`${URL}${filter}`)
    .then(response => {
      return response.data;

   })
  .catch(function (error) {
    console.log(error);
  });
}
