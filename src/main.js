import { refs } from './js/refs';
import { getImage } from './js/pixabay-api';
import { galleryTemplate } from './js/render-functions';
import { showError } from './js/additional-functions';
import { updateBtnStatus } from './js/additional-functions';
import { hideLoader } from './js/additional-functions';
import { hideBtnLoadMore } from './js/additional-functions';
import { showLoader } from './js/additional-functions';
import { skipOldElement } from './js/additional-functions';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// ================================================================================
let value = '';
export let currentPage = 1;
export let maxPage = 1;
const perPages = 15;
// ===============================================================================
refs.formElem.addEventListener('submit', async e => {
  e.preventDefault();
  value = e.target.elements.search.value.trim();
  if (!value) {
    showError(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }
  currentPage = 1;
  showLoader();
  try {
    const data = await getImage(value, currentPage);
    maxPage = Math.ceil(data.totalHits / perPages);
    if (data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      refs.inputElem.value = '';
      return;
    }
    const markup = await galleryTemplate(data.hits);
    refs.listElems.innerHTML = markup;
    new simpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    }).refresh();
  } catch (error) {
    showError(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
  updateBtnStatus();
  hideLoader();
  refs.formElem.elements.search.value = '';
});
// ==============================================================================
refs.btnElement.addEventListener('click', async e => {
  currentPage++;
  hideBtnLoadMore();
  try {
    const data = await getImage(value, currentPage);
    const markup = await galleryTemplate(data.hits);
    refs.listElems.insertAdjacentHTML('beforeend', markup);
    new simpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    }).refresh();
    skipOldElement();
  } catch (error) {
    showError(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }

  updateBtnStatus();
});
