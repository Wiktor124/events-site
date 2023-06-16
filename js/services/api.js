import { ConnectionError } from '../utils/Errors.js'
const API_URL = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/';

/**
 * This function is used to fetch data from an api.
 * Only accepts next categories (music, sports, business, food and art)
 * 
 * @param {fetchData} String
 * @returns array
 */
const fetchData = async (category) => {
  try {
    return await fetch(`${API_URL}/${category}`).then(response => response.json());
  } catch {
    throw new ConnectionError('Something went wrong with fetching data!')
  }
}

export default fetchData;