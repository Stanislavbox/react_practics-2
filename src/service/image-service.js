import axios from 'axios';

const API_KEY = 'DgFwwyD2COF7YWtHK7dYpNoi88KX9NyClpcg45itJazOHW8BHBOHjRqF';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const result = await axios.get(`search?query=${query}&page=${page}`);
  return result.data;
};
