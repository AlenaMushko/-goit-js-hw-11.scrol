export default function cardTemplates({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
  return `
   <div class="photo-card">
   <a href="${largeImageURL}">
   <img src="${webformatURL}" alt="${tags}"  />
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes<span>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views<span>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments<span>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads<span>${downloads}</span></b>
    </p>
  </div>
</div>
  `;
}

