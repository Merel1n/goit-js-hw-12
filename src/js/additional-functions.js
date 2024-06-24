import { refs } from './refs';
import { currentPage } from '../main';
import { maxPage } from '../main';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// =====================================================================
export function showLoader() {
  refs.spanElem.classList.remove('hidden');
}
// =====================================================================
export function hideLoader() {
  refs.spanElem.classList.add('hidden');
}
// =====================================================================
export function showBtnLoadMore() {
  refs.btnElement.classList.remove('hidden');
}
// =====================================================================
export function hideBtnLoadMore() {
  refs.btnElement.classList.add('hidden');
}
// =====================================================================
export function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideBtnLoadMore();
    if (maxPage) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
        displayMode: 'once',
        maxWidth: 500,
        imageWidth: 600,
      });
    }
  } else {
    showBtnLoadMore();
  }
}
// =====================================================================
export function showError(message) {
  hideLoader();
  refs.listElems.innerHTML = ' ';
  iziToast.show({
    message: message,
    position: 'center',
    displayMode: 'once',
    maxWidth: 500,
    imageWidth: 600,
  });
}
// =====================================================================
export function skipOldElement() {
  const liElem = refs.listElems.children[0];
  const height = liElem.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
