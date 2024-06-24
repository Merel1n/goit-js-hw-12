import axios from 'axios';
import { showError } from './additional-functions';
// =====================================================================
const articlesAPI = axios.create({
  baseURL: 'https://pixabay.com',
});
// =====================================================================
export async function getImage(query, currentPage) {
  try {
    const params = {
      key: '44483599-b54948657c32ff6f545b82f23',
      q: query,
      image_type: 'photo',
      pretty: true,
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 15,
    };

    const result = await articlesAPI.get('/api/', { params });
    return result.data;
  } catch (error) {
    showError('Warning! Enter a word for the query, please.');
  }
}
