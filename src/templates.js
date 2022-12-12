export function cardTemplates({webformatURL, tags, likes, views, comments, downloads,}) {
  return `
   <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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

// export function largeImageTemplates() {
//   return `
//  < div class="photo-large" >
//     <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
//    </> 
//   `;
// }
// <div class="gallery">
//     <a href="images/image1.jpg"><img src="images/thumbs/thumb1.jpg" alt="" title=""/></a>
//     <a href="images/image2.jpg"><img src="images/thumbs/thumb2.jpg" alt="" title="Beautiful Image"/></a>
// </div>