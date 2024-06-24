export function galleryTemplate(images) {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
	<a class="gallery-link" href="${largeImageURL}">
		<img 
			class="gallery-image" 
			src="${webformatURL}" 
			alt="${tags}"
            
			/>
      <ul class="list-img">
      <li class="item-img"><p class="title-img">Likes</p><p class="text-img">${likes}</p></li> 
      <li class="item-img"><p class="title-img">Views</p><p class="text-img">${views}</p></li> 
      <li class="item-img"><p class="title-img">Comments</p><p class="text-img">${comments}</p></li> 
      <li class="item-img"><p class="title-img">Downloads</p><p class="text-img">${downloads}</p></li>     
      </ul>
	</a>
</li>`;
      }
    )
    .join('');
}
