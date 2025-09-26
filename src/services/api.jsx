import axios from 'axios';

const fallbackRestaurants = [
  {
    id: 1,
    name: 'Songlim Restaurant',
    category: 'Korean food',
    location: 'Gyeonggi-do Suwon-si Yeongtong-gu World Cup-ro 193beon-gil 21 (Namcheon-dong)',
    priceRange: 'KRW 7,000-13,000',
    rating: 4.99,
    description: 'Beloved spot for comforting Korean dishes near campus.',
    recommendedMenu: [
      'Soft tofu stew',
      'Kimchi stew',
      'Bulgogi',
      'Spicy pork stir-fry'
    ],
    likes: 0,
    image: 'https://mblogthumb-phinf.pstatic.net/MjAyMjA2MTJfODEg/MDAxNjU0OTYzNTM3MjE1.1BfmrmOsz_B6DBHAnhQSs6qfNIDnssofR-DrzMfigIIg.JHHDheG6ifJjtfKUqLss_mLXWFE9fNJ5BmepNUVXSOog.PNG.cary63/image.png?type=w966'
  },
  {
    id: 2,
    name: 'Special Tteokbokki',
    category: 'Snacks',
    location: '42 Gwanak-ro, Yeongtong-gu, Suwon-si',
    priceRange: 'KRW 7,000-10,000',
    rating: 4.92,
    description: 'Crispy fritters and spicy tteokbokki that locals love.',
    recommendedMenu: [
      'Tteokbokki',
      'Fried seaweed roll',
      'Fish cake soup',
      'Fried dumplings'
    ],
    likes: 0,
    image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTJfMjcg%2FMDAxNzU0OTQ5ODk1Mjg0.GR6i3mNpJJXyqQrozGEJ65InCDBGlEmxc0aCeVHncJgg.sduDPX67J8hhoGxq4vLohpS4dXk1w-706dQLPfVs1iwg.JPEG%2Foutput%25A3%25DF1564208956.jpg'
  },
  {
    id: 3,
    name: 'SOGO',
    category: 'Japanese food',
    location: '7 World Cup-ro 193beon-gil, Yeongtong-gu, Suwon-si',
    priceRange: 'KRW 10,000-16,000',
    rating: 4.89,
    description: 'Casual Japanese restaurant with generous portions.',
    recommendedMenu: [
      'Cold soba set',
      'Kimchi pork cutlet rice bowl',
      'Cordon bleu'
    ],
    likes: 0,
    image: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190707_63%2F1562462598960nPDMy_JPEG%2FW7iKQEhTMzCF3flC1t0pzgzF.jpeg.jpg'
  }
];

const DEFAULT_BASE_URL = 'https://pwd-week4-<username>.onrender.com';
const rawBaseUrl = import.meta.env?.VITE_API_BASE_URL || DEFAULT_BASE_URL;
const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log('API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export const restaurantAPI = {
  getRestaurants: async () => {
    try {
      const response = await api.get('/api/restaurants');
      return response.data;
    } catch (error) {
      console.warn('Using local fallback restaurant list', error);
      return { data: fallbackRestaurants };
    }
  },

  getRestaurantById: async (id) => {
    try {
      const response = await api.get(`/api/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Using local fallback for restaurant ${id}`, error);
      const restaurant = fallbackRestaurants.find(
        (item) => item.id === Number(id)
      );
      return { data: restaurant ?? null };
    }
  },

  getPopularRestaurants: async () => {
    try {
      const response = await api.get('/api/restaurants/popular');
      return response.data;
    } catch (error) {
      console.warn('Using local fallback popular restaurants', error);
      const popular = [...fallbackRestaurants]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
      return { data: popular };
    }
  },
};

export default api;